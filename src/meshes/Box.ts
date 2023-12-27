import { PrimitiveTopology } from '@antv/g-device-api';
import { Vec3 } from '../math';
import { Mesh, ToMesh } from './Mesh';

/**
 * An axis-aligned box defined by its minimum and maximum point.
 */
export class Box implements ToMesh {
  min_x: number;
  max_x: number;

  min_y: number;
  max_y: number;

  min_z: number;
  max_z: number;

  /**
   * Creates a new box given the coordinates of two opposing corners.
   */
  static from_corners(a: Vec3, b: Vec3) {
    const max = a.max(b);
    const min = a.min(b);
    const x_length = max.x - min.x;
    const y_length = max.y - min.y;
    const z_length = max.z - min.z;
    return new Box(x_length, y_length, z_length);
  }

  /**
   * Creates a new box centered at the origin with the supplied side lengths.
   */
  constructor(
    x_length: number = 2,
    y_length: number = 1,
    z_length: number = 1,
  ) {
    this.max_x = x_length / 2.0;
    this.min_x = -x_length / 2.0;
    this.max_y = y_length / 2.0;
    this.min_y = -y_length / 2.0;
    this.max_z = z_length / 2.0;
    this.min_z = -z_length / 2.0;
  }

  toMesh() {
    const sp = this;
    const vertices = [
      // Front
      [
        [sp.min_x, sp.min_y, sp.max_z],
        [0, 0, 1.0],
        [0, 0],
      ],
      [
        [sp.max_x, sp.min_y, sp.max_z],
        [0, 0, 1.0],
        [1.0, 0],
      ],
      [
        [sp.max_x, sp.max_y, sp.max_z],
        [0, 0, 1.0],
        [1.0, 1.0],
      ],
      [
        [sp.min_x, sp.max_y, sp.max_z],
        [0, 0, 1.0],
        [0, 1.0],
      ],
      // Back
      [
        [sp.min_x, sp.max_y, sp.min_z],
        [0, 0, -1.0],
        [1.0, 0],
      ],
      [
        [sp.max_x, sp.max_y, sp.min_z],
        [0, 0, -1.0],
        [0, 0],
      ],
      [
        [sp.max_x, sp.min_y, sp.min_z],
        [0, 0, -1.0],
        [0, 1.0],
      ],
      [
        [sp.min_x, sp.min_y, sp.min_z],
        [0, 0, -1.0],
        [1.0, 1.0],
      ],
      // Right
      [
        [sp.max_x, sp.min_y, sp.min_z],
        [1.0, 0, 0],
        [0, 0],
      ],
      [
        [sp.max_x, sp.max_y, sp.min_z],
        [1.0, 0, 0],
        [1.0, 0],
      ],
      [
        [sp.max_x, sp.max_y, sp.max_z],
        [1.0, 0, 0],
        [1.0, 1.0],
      ],
      [
        [sp.max_x, sp.min_y, sp.max_z],
        [1.0, 0, 0],
        [0, 1.0],
      ],
      // Left
      [
        [sp.min_x, sp.min_y, sp.max_z],
        [-1.0, 0, 0],
        [1.0, 0],
      ],
      [
        [sp.min_x, sp.max_y, sp.max_z],
        [-1.0, 0, 0],
        [0, 0],
      ],
      [
        [sp.min_x, sp.max_y, sp.min_z],
        [-1.0, 0, 0],
        [0, 1.0],
      ],
      [
        [sp.min_x, sp.min_y, sp.min_z],
        [-1.0, 0, 0],
        [1.0, 1.0],
      ],
      // Top
      [
        [sp.max_x, sp.max_y, sp.min_z],
        [0, 1.0, 0],
        [1.0, 0],
      ],
      [
        [sp.min_x, sp.max_y, sp.min_z],
        [0, 1.0, 0],
        [0, 0],
      ],
      [
        [sp.min_x, sp.max_y, sp.max_z],
        [0, 1.0, 0],
        [0, 1.0],
      ],
      [
        [sp.max_x, sp.max_y, sp.max_z],
        [0, 1.0, 0],
        [1.0, 1.0],
      ],
      // Bottom
      [
        [sp.max_x, sp.min_y, sp.max_z],
        [0, -1.0, 0],
        [0, 0],
      ],
      [
        [sp.min_x, sp.min_y, sp.max_z],
        [0, -1.0, 0],
        [1.0, 0],
      ],
      [
        [sp.min_x, sp.min_y, sp.min_z],
        [0, -1.0, 0],
        [1.0, 1.0],
      ],
      [
        [sp.max_x, sp.min_y, sp.min_z],
        [0, -1.0, 0],
        [0, 1.0],
      ],
    ];

    const positions = vertices.map(([position, n, uv]) => position);
    const normals = vertices.map(([position, n, uv]) => n);
    const uvs = vertices.map(([position, n, uv]) => uv);

    const indices = [
      0,
      1,
      2,
      2,
      3,
      0, // front
      4,
      5,
      6,
      6,
      7,
      4, // back
      8,
      9,
      10,
      10,
      11,
      8, // right
      12,
      13,
      14,
      14,
      15,
      12, // left
      16,
      17,
      18,
      18,
      19,
      16, // top
      20,
      21,
      22,
      22,
      23,
      20, // bottom
    ];

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs)
      .with_indices(indices);
  }
}
