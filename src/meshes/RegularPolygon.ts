import { PrimitiveTopology } from '@antv/g-device-api';
import { Box } from './Box';
import { Mesh, ToMesh } from './Mesh';

export class RegularPolygon implements ToMesh {
  constructor(
    /// Circumscribed radius in the `XY` plane.
    ///
    /// In other words, the vertices of this polygon will all touch a circle of this radius.
    public radius: number = 0.6,
    /// Number of sides.
    public sides: number = 6,
  ) {}

  toMesh(): Mesh {
    if (this.sides <= 2) {
      throw new Error('RegularPolygon requires at least 3 sides.');
    }

    const positions: [number, number, number][] = [];
    const normals: [number, number, number][] = [];
    const uvs: [number, number][] = [];

    const step = (Math.PI * 2) / this.sides;
    for (let i = 0; i < this.sides; i++) {
      let theta = Math.PI / 2 - i * step;
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);

      positions.push([cos * this.radius, sin * this.radius, 0.0]);
      normals.push([0.0, 0.0, 1.0]);
      uvs.push([0.5 * (cos + 1.0), 1.0 - 0.5 * (sin + 1.0)]);
    }

    const indices: number[] = [];
    for (let i = 1; i < this.sides - 1; i++) {
      indices.push(0, i + 1, i);
    }

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs)
      .with_indices(indices);
  }
}

/**
 * A circle in the `XY` plane
 */
export class Circle implements ToMesh {
  constructor(
    /// Inscribed radius in the `XY` plane.
    public radius: number = 0.5,
    /// The number of vertices used.
    public vertices: number = 64,
  ) {}

  toMesh(): Mesh {
    return new RegularPolygon(this.radius, this.vertices).toMesh();
  }
}
