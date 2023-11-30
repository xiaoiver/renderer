import { Vec3 } from '../math';

/**
 * An axis-aligned box defined by its minimum and maximum point.
 */
export class Box {
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
  constructor(x_length: number, y_length: number, z_length: number) {
    this.max_x = x_length / 2.0;
    this.min_x = -x_length / 2.0;
    this.max_y = y_length / 2.0;
    this.min_y = -y_length / 2.0;
    this.max_z = z_length / 2.0;
    this.min_z = -z_length / 2.0;
  }
}
