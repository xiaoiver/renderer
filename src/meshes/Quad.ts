import { PrimitiveTopology } from '@antv/g-device-api';
import { Vec2 } from '../math';
import { Mesh, ToMesh } from './Mesh';

/**
 * A rectangle on the `XY` plane centered at the origin.
 */
export class Quad implements ToMesh {
  /**
   * Full width and height of the rectangle.
   */
  size: Vec2;
  /**
   * Horizontally-flip the texture coordinates of the resulting mesh.
   */
  flip: boolean;

  static flipped(size: Vec2) {
    return new Quad(size, true);
  }

  constructor(size: Vec2, flip = false) {
    this.size = size;
    this.flip = flip;
  }

  toMesh(): Mesh {
    const extent_x = this.size.x / 2.0;
    const extent_y = this.size.y / 2.0;

    const [u_left, u_right] = this.flip ? [1.0, 0.0] : [0.0, 1.0];
    let vertices = [
      [
        [-extent_x, -extent_y, 0.0],
        [0.0, 0.0, 1.0],
        [u_left, 1.0],
      ],
      [
        [-extent_x, extent_y, 0.0],
        [0.0, 0.0, 1.0],
        [u_left, 0.0],
      ],
      [
        [extent_x, extent_y, 0.0],
        [0.0, 0.0, 1.0],
        [u_right, 0.0],
      ],
      [
        [extent_x, -extent_y, 0.0],
        [0.0, 0.0, 1.0],
        [u_right, 1.0],
      ],
    ];

    const indices = [0, 2, 1, 0, 3, 2];

    const positions = vertices.map(([p, n, uv]) => p);
    const normals = vertices.map(([p, n, uv]) => n);
    const uvs = vertices.map(([p, n, uv]) => uv);

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_indices(indices)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs);
  }
}
