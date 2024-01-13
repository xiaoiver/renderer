export function loadFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  /* loads a file as an ArrayBuffer (i.e. a binary blob) */
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target || !event.target.result) {
        reject('Failed to load file');
        return;
      }
      if (typeof event.target.result === 'string') {
        reject('Got a text file instead of a binary one');
        return;
      }
      resolve(event.target.result);
    };

    reader.onerror = (event) => {
      if (!event.target) {
        reject('Failed to load file');
        return;
      }
      reject(event.target.error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export class PackedGaussians {
  /* A class that
      1) reads the binary blob from a .ply file
      2) converts internally into a structured representation
      3) packs the structured representation into a flat array of bytes as expected by the shaders
  */
  numGaussians: number;
  sphericalHarmonicsDegree: number;

  gaussianLayout: PackingType;
  public gaussianArrayLayout: PackingType;
  positionsLayout: PackingType;
  public positionsArrayLayout: PackingType;

  gaussiansBuffer: ArrayBuffer;
  positionsBuffer: ArrayBuffer;

  private static decodeHeader(
    plyArrayBuffer: ArrayBuffer,
  ): [number, Record<string, string>, DataView] {
    /* decodes the .ply file header and returns a tuple of:
     * - vertexCount: number of vertices in the point cloud
     * - propertyTypes: a map from property names to their types
     * - vertexData: a DataView of the vertex data
     */

    const decoder = new TextDecoder();
    let headerOffset = 0;
    let headerText = '';

    while (true) {
      const headerChunk = new Uint8Array(plyArrayBuffer, headerOffset, 50);
      headerText += decoder.decode(headerChunk);
      headerOffset += 50;

      if (headerText.includes('end_header')) {
        break;
      }
    }

    const headerLines = headerText.split('\n');

    let vertexCount = 0;
    let propertyTypes: Record<string, string> = {};

    for (let i = 0; i < headerLines.length; i++) {
      const line = headerLines[i].trim();
      if (line.startsWith('element vertex')) {
        const vertexCountMatch = line.match(/\d+/);
        if (vertexCountMatch) {
          vertexCount = parseInt(vertexCountMatch[0]);
        }
      } else if (line.startsWith('property')) {
        const propertyMatch = line.match(/(\w+)\s+(\w+)\s+(\w+)/);
        if (propertyMatch) {
          const propertyType = propertyMatch[2];
          const propertyName = propertyMatch[3];
          propertyTypes[propertyName] = propertyType;
        }
      } else if (line === 'end_header') {
        break;
      }
    }

    const vertexByteOffset =
      headerText.indexOf('end_header') + 'end_header'.length + 1;
    const vertexData = new DataView(plyArrayBuffer, vertexByteOffset);

    return [vertexCount, propertyTypes, vertexData];
  }

  private readRawVertex(
    offset: number,
    vertexData: DataView,
    propertyTypes: Record<string, string>,
  ): [number, Record<string, number>] {
    /* reads a single vertex from the vertexData DataView and returns a tuple of:
     * - offset: the offset of the next vertex in the vertexData DataView
     * - rawVertex: a map from property names to their values
     */
    let rawVertex: Record<string, number> = {};

    for (const property in propertyTypes) {
      const propertyType = propertyTypes[property];
      if (propertyType === 'float') {
        rawVertex[property] = vertexData.getFloat32(offset, true);
        offset += Float32Array.BYTES_PER_ELEMENT;
      } else if (propertyType === 'uchar') {
        rawVertex[property] = vertexData.getUint8(offset) / 255.0;
        offset += Uint8Array.BYTES_PER_ELEMENT;
      }
    }

    return [offset, rawVertex];
  }

  public get nShCoeffs(): number {
    /* returns the expected number of spherical harmonics coefficients */
    if (this.sphericalHarmonicsDegree === 0) {
      return 1;
    } else if (this.sphericalHarmonicsDegree === 1) {
      return 4;
    } else if (this.sphericalHarmonicsDegree === 2) {
      return 9;
    } else if (this.sphericalHarmonicsDegree === 3) {
      return 16;
    } else {
      throw new Error(
        `Unsupported SH degree: ${this.sphericalHarmonicsDegree}`,
      );
    }
  }

  private arrangeVertex(
    rawVertex: Record<string, number>,
    shFeatureOrder: string[],
  ): Record<string, any> {
    /* arranges a raw vertex into a vertex that can be packed by the gaussianLayout utility */
    const shCoeffs = [];
    for (let i = 0; i < this.nShCoeffs; ++i) {
      const coeff = [];
      for (let j = 0; j < 3; ++j) {
        const coeffName = shFeatureOrder[i * 3 + j];
        coeff.push(rawVertex[coeffName]);
      }
      shCoeffs.push(coeff);
    }

    const arrangedVertex: Record<string, any> = {
      position: [rawVertex.x, rawVertex.y, rawVertex.z],
      logScale: [rawVertex.scale_0, rawVertex.scale_1, rawVertex.scale_2],
      rotQuat: [
        rawVertex.rot_0,
        rawVertex.rot_1,
        rawVertex.rot_2,
        rawVertex.rot_3,
      ],
      opacityLogit: rawVertex.opacity,
      shCoeffs: shCoeffs,
    };
    return arrangedVertex;
  }

  constructor(arrayBuffer: ArrayBuffer) {
    // decode the header
    const [vertexCount, propertyTypes, vertexData] =
      PackedGaussians.decodeHeader(arrayBuffer);
    this.numGaussians = vertexCount;

    // figure out the SH degree from the number of coefficients
    var nRestCoeffs = 0;
    for (const propertyName in propertyTypes) {
      if (propertyName.startsWith('f_rest_')) {
        nRestCoeffs += 1;
      }
    }
    const nCoeffsPerColor = nRestCoeffs / 3;
    this.sphericalHarmonicsDegree = Math.sqrt(nCoeffsPerColor + 1) - 1;
    console.log(
      'Detected degree',
      this.sphericalHarmonicsDegree,
      'with ',
      nCoeffsPerColor,
      'coefficients per color',
    );

    // figure out the order in which spherical harmonics should be read
    const shFeatureOrder = [];
    for (let rgb = 0; rgb < 3; ++rgb) {
      shFeatureOrder.push(`f_dc_${rgb}`);
    }
    for (let i = 0; i < nCoeffsPerColor; ++i) {
      for (let rgb = 0; rgb < 3; ++rgb) {
        shFeatureOrder.push(`f_rest_${rgb * nCoeffsPerColor + i}`);
      }
    }

    // define the layout of a single point
    this.gaussianLayout = new Struct([
      ['position', new vec3(f32)],
      ['logScale', new vec3(f32)],
      ['rotQuat', new vec4(f32)],
      ['opacityLogit', f32],
      ['shCoeffs', new StaticArray(new vec3(f32), this.nShCoeffs)],
    ]);
    // define the layout of the entire point cloud
    this.gaussianArrayLayout = new StaticArray(
      this.gaussianLayout,
      vertexCount,
    );

    this.positionsLayout = new vec3(f32);
    this.positionsArrayLayout = new StaticArray(
      this.positionsLayout,
      vertexCount,
    );

    // pack the points
    this.gaussiansBuffer = new ArrayBuffer(this.gaussianArrayLayout.size);
    const gaussianWriteView = new DataView(this.gaussiansBuffer);

    this.positionsBuffer = new ArrayBuffer(this.positionsArrayLayout.size);
    const positionsWriteView = new DataView(this.positionsBuffer);

    var readOffset = 0;
    var gaussianWriteOffset = 0;
    var positionWriteOffset = 0;
    for (let i = 0; i < vertexCount; i++) {
      const [newReadOffset, rawVertex] = this.readRawVertex(
        readOffset,
        vertexData,
        propertyTypes,
      );
      readOffset = newReadOffset;
      gaussianWriteOffset = this.gaussianLayout.pack(
        gaussianWriteOffset,
        this.arrangeVertex(rawVertex, shFeatureOrder),
        gaussianWriteView,
      );

      positionWriteOffset = this.positionsLayout.pack(
        positionWriteOffset,
        [rawVertex.x, rawVertex.y, rawVertex.z],
        positionsWriteView,
      );
    }
  }
}

// This file contains the code for packing and unpacking data into webGPU buffers.
// WebGPU buffers have rules about datatype layouts, padding etc, so it's much easier
// to define a code which automatically generates the correct packing methods.
// It is weakly typed and relies on runtime check, a proper solution would be with
// extensive generics, but that's outside my comfort zone.

// I wished to define it as
// export type NestedData = number | NestedData[] | Record<string, NestedData>;
// but it complains about circular references.
export type NestedData = any;

function roundUp(n: number, multiple: number): number {
  return Math.ceil(n / multiple) * multiple;
}

class PackingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PackingError';
  }
}

export abstract class PackingType {
  public size: number;
  public alignment: number;

  constructor(size: number, alignment: number) {
    this.size = size;
    this.alignment = alignment;
  }

  abstract pack(offset: number, value: NestedData, view: DataView): number;
  abstract unpack(offset: number, view: DataView): [number, NestedData];
}

class i32Type extends PackingType {
  constructor() {
    super(4, 4);
  }
  pack(offset: number, value: number, view: DataView): number {
    if (typeof value !== 'number') {
      throw new PackingError(`Expected number, got ${value}`);
    }
    view.setInt32(offset, value, true);
    return offset + this.size;
  }

  unpack(offset: number, view: DataView): [number, number] {
    const content = view.getInt32(offset, true);
    return [offset + this.size, content];
  }
}

class u32Type extends PackingType {
  constructor() {
    super(4, 4);
  }
  pack(offset: number, value: number, view: DataView): number {
    if (typeof value !== 'number') {
      throw new PackingError(`Expected number, got ${value}`);
    }
    view.setUint32(offset, value, true);
    return offset + this.size;
  }

  unpack(offset: number, view: DataView): [number, number] {
    const content = view.getUint32(offset, true);
    return [offset + this.size, content];
  }
}

class f32Type extends PackingType {
  constructor() {
    super(4, 4);
  }
  pack(offset: number, value: number, view: DataView): number {
    if (typeof value !== 'number') {
      throw new PackingError(`Expected number, got ${value}`);
    }
    view.setFloat32(offset, value, true);
    return offset + this.size;
  }

  unpack(offset: number, view: DataView): [number, number] {
    const content = view.getFloat32(offset, true);
    return [offset + this.size, content];
  }
}

export const i32 = new i32Type();
export const u32 = new u32Type();
export const f32 = new f32Type();

class VectorType extends PackingType {
  public baseType: PackingType;
  public nValues: number;

  constructor(baseType: PackingType, nValues: number, alignment: number) {
    super(baseType.size * nValues, alignment);
    this.baseType = baseType;
    this.nValues = nValues;
  }

  pack(offset: number, values: number[], view: DataView) {
    if (!Array.isArray(values)) {
      throw new PackingError(`Expected array, got ${values}`);
    }

    if (values.length !== this.nValues) {
      throw new PackingError(
        `Expected ${this.nValues} values, got ${values.length}`,
      );
    }

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (let i = 0; i < values.length; i++) {
      try {
        offset = this.baseType.pack(offset, values[i], view);
      } catch (e) {
        if (e instanceof PackingError) {
          throw new PackingError(`Error packing value ${i}: ${e.message}`);
        } else {
          throw e;
        }
      }
    }
    return offset;
  }

  unpack(offset: number, view: DataView): [number, number[]] {
    const values: number[] = [];

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (let i = 0; i < this.nValues; i++) {
      let [newOffset, value] = this.baseType.unpack(offset, view);
      offset = newOffset;
      values.push(value);
    }
    return [offset, values];
  }
}

export class vec2 extends VectorType {
  constructor(baseType: PackingType) {
    super(baseType, 2, 8);
  }
}

export class vec3 extends VectorType {
  constructor(baseType: PackingType) {
    super(baseType, 3, 16);
  }
}

export class vec4 extends VectorType {
  constructor(baseType: PackingType) {
    super(baseType, 4, 16);
  }
}

export class Struct extends PackingType {
  public members: [string, PackingType][];

  constructor(members: [string, PackingType][]) {
    const alignment = Math.max(
      ...members.map(([_name, type]) => type.alignment),
    );

    let offset = 0;
    for (const [_, type] of members) {
      while (offset % type.alignment !== 0) {
        offset++;
      }

      offset += type.size;
    }

    // SizeOf(S) = roundUp(AlignOf(S), justPastLastMember)
    // where justPastLastMember = OffsetOfMember(S,N) + SizeOfMember(S,N)
    const size = roundUp(offset, alignment);
    super(size, alignment);
    this.members = members;
  }

  pack(offset: number, values: Record<string, NestedData>, view: DataView) {
    const expectedKeys = this.members.map(([name, _type]) => name);
    const actualKeys = Object.keys(values);

    if (expectedKeys.length !== actualKeys.length) {
      throw new PackingError(
        `Expected values for ${expectedKeys}, got ${actualKeys}`,
      );
    }
    if (!expectedKeys.every((key) => actualKeys.includes(key))) {
      throw new PackingError(
        `Expected values for ${expectedKeys}, got ${actualKeys}`,
      );
    }

    const startingOffset = offset;

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (const [name, type] of this.members) {
      const value = values[name as keyof typeof values];
      try {
        offset = type.pack(offset, value, view);
      } catch (e) {
        // error packing the thing inside
        if (e instanceof PackingError) {
          throw new PackingError(`Error packing value ${name}: ${e.message}`);
        } else {
          throw e;
        }
      }
    }

    offset += this.size - (offset - startingOffset);

    return offset;
  }

  unpack(offset: number, view: DataView): [number, Record<string, NestedData>] {
    const values: Record<string, NestedData> = {};

    const startingOffset = offset;

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (const [name, type] of this.members) {
      let [newOffset, value] = type.unpack(offset, view);
      offset = newOffset;
      values[name] = value;
    }

    offset += this.size - (offset - startingOffset);

    return [offset, values];
  }
}

export class StaticArray extends PackingType {
  public type: PackingType;
  public nElements: number;
  public stride: number;

  constructor(type: PackingType, nElements: number) {
    const alignment = type.alignment;
    const size = nElements * roundUp(type.size, type.alignment);
    super(size, alignment);
    this.type = type;
    this.nElements = nElements;
    this.stride = roundUp(type.size, type.alignment);
  }

  pack(offset: number, values: NestedData[], view: DataView) {
    if (!Array.isArray(values)) {
      throw new PackingError(`Expected array, got ${values}`);
    }

    if (values.length !== this.nElements) {
      throw new PackingError(
        `Expected ${this.nElements} values, got ${values.length}`,
      );
    }

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (let i = 0; i < values.length; i++) {
      try {
        offset = this.type.pack(offset, values[i], view);
      } catch (e) {
        if (e instanceof PackingError) {
          throw new PackingError(`Error packing value ${i}: ${e.message}`);
        } else {
          throw e;
        }
      }
      offset += this.stride - this.type.size;
    }

    return offset;
  }

  unpack(offset: number, view: DataView): [number, NestedData[]] {
    const values: NestedData[] = [];

    while (offset % this.alignment !== 0) {
      offset++;
    }

    for (let i = 0; i < this.nElements; i++) {
      let [newOffset, value] = this.type.unpack(offset, view);
      offset = newOffset;
      values.push(value);
      offset += this.stride - this.type.size;
    }
    return [offset, values];
  }
}

class MatrixType extends PackingType {
  public baseType: PackingType;
  public nRows: number;
  public nColumns: number;

  constructor(baseType: PackingType, nRows: number, nColumns: number) {
    var vecType: VectorType;
    if (nRows === 2) {
      vecType = new vec2(baseType);
    } else if (nRows === 3) {
      vecType = new vec3(baseType);
    } else if (nRows === 4) {
      vecType = new vec4(baseType);
    } else {
      throw new Error(`Invalid number of rows: ${nRows}`);
    }
    const arrayType = new StaticArray(vecType, nColumns);

    super(arrayType.size, vecType.alignment);
    this.baseType = baseType;
    this.nRows = nRows;
    this.nColumns = nColumns;
  }

  pack(offset: number, values: number[][], view: DataView): number {
    if (!Array.isArray(values)) {
      throw new PackingError(`Expected array, got ${values}`);
    }

    if (values.length !== this.nColumns) {
      throw new PackingError(
        `Expected ${this.nColumns} columns, got ${values.length}`,
      );
    }

    while (offset % this.alignment !== 0) {
      offset++;
    }

    const startOffset = offset;

    for (let i = 0; i < values.length; i++) {
      if (!Array.isArray(values[i])) {
        throw new PackingError(`Expected array, got ${values[i]}`);
      }

      for (let j = 0; j < values[i].length; j++) {
        try {
          offset = this.baseType.pack(offset, values[i][j], view);
        } catch (e) {
          if (e instanceof PackingError) {
            throw new PackingError(
              `Error packing value ${i},${j}: ${e.message}`,
            );
          } else {
            throw e;
          }
        }
      }
    }

    offset = startOffset + this.size;

    return offset;
  }

  unpack(offset: number, view: DataView): [number, number[][]] {
    while (offset % this.alignment !== 0) {
      offset++;
    }

    const startOffset = offset;

    const outerValues: number[][] = [];
    for (let i = 0; i < this.nColumns; i++) {
      const innerValues: number[] = [];
      for (let j = 0; j < this.nRows; j++) {
        let [newOffset, value] = this.baseType.unpack(offset, view);
        offset = newOffset;
        innerValues.push(value);
      }
      outerValues.push(innerValues);
    }

    offset += this.size - (offset - startOffset);

    return [offset, outerValues];
  }
}

export class mat4x4 extends MatrixType {
  constructor(baseType: PackingType) {
    super(baseType, 4, 4);
  }
}
