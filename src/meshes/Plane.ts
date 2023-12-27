import { PrimitiveTopology } from '@antv/g-device-api';
import { Vec3 } from '../math';
import { Mesh, ToMesh } from './Mesh';

/**
 * A square on the `XZ` plane centered at the origin.
 */
export class Plane implements ToMesh {
  /**
   * The total side length of the square.
   */
  size: number;
  /**
   * The number of subdivisions in the mesh.
   *
   * 0 - is the original plane geometry, the 4 points in the XZ plane.
   *
   * 1 - is split by 1 line in the middle of the plane on both the X axis and the Z axis, resulting in a plane with 4 quads / 8 triangles.
   *
   * 2 - is a plane split by 2 lines on both the X and Z axes, subdividing the plane into 3 equal sections along each axis, resulting in a plane with 9 quads / 18 triangles.
   *
   * and so on...
   */
  subdivisions: number;
  static from_size(size: number) {
    return new Plane(size, 0);
  }

  constructor(size: number = 1, subdivisions = 0) {
    this.size = size;
    this.subdivisions = subdivisions;
  }

  toMesh(): Mesh {
    // here this is split in the z and x directions if one ever needs asymmetrical subdivision
    // two Plane struct fields would need to be added instead of the single subdivisions field
    const z_vertex_count = this.subdivisions + 2;
    const x_vertex_count = this.subdivisions + 2;
    // const num_vertices = z_vertex_count * x_vertex_count;
    // const num_indices = (z_vertex_count - 1) * (x_vertex_count - 1) * 6;
    const up = Vec3.Y.to_array();

    const positions: [number, number, number][] = [];
    const normals: [number, number, number][] = [];
    const uvs: [number, number][] = [];
    const indices: number[] = [];

    for (let z = 0; z < z_vertex_count; z++) {
      for (let x = 0; x < x_vertex_count; x++) {
        const tx = x / (x_vertex_count - 1);
        const tz = z / (z_vertex_count - 1);
        positions.push([(-0.5 + tx) * this.size, 0.0, (-0.5 + tz) * this.size]);
        normals.push(up);
        uvs.push([tx, tz]);
      }
    }

    for (let y = 0; y < z_vertex_count - 1; y++) {
      for (let x = 0; x < x_vertex_count - 1; x++) {
        const quad = y * x_vertex_count + x;
        indices.push(quad + x_vertex_count + 1);
        indices.push(quad + 1);
        indices.push(quad + x_vertex_count);
        indices.push(quad);
        indices.push(quad + x_vertex_count);
        indices.push(quad + 1);
      }
    }

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_indices(indices)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs);
  }
}
