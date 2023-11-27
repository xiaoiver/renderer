import { Mat3 } from './Mat3';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';

/**
 * A 3D affine transform, which can represent translation, rotation, scaling and shear.
 */
export class Affine3 {
  /**
   * The degenerate zero transform.
   *
   * This transforms any finite vector and point to zero.
   * The zero transform is non-invertible.
   */
  static ZERO = new Affine3(Mat3.ZERO, Vec3.ZERO);

  /**
   * The identity transform.
   *
   * Multiplying a vector with this returns the same vector.
   */
  static IDENTITY = new Affine3(Mat3.IDENTITY, Vec3.ZERO);

  /**
   * Creates an affine transform that changes scale.
   */
  static from_scale(scale: Vec3) {
    return new Affine3(Mat3.from_diagonal(scale), Vec3.ZERO);
  }

  /**
   * Creates an affine transform from the given `rotation` quaternion.
   */
  static from_quat(rotation: Quat) {
    return new Affine3(Mat3.from_quat(rotation), Vec3.ZERO);
  }

  /**
   * Creates an affine transform containing a 3D rotation around a normalized
   * rotation `axis` of `angle` (in radians).
   */
  static from_axis_angle(axis: Vec3, angle: number) {
    return new Affine3(Mat3.from_axis_angle(axis, angle), Vec3.ZERO);
  }

  /**
   * Creates an affine transform containing a 3D rotation around the x axis of `angle` (in radians).
   */
  static from_rotation_x(angle: number) {
    return new Affine3(Mat3.from_rotation_x(angle), Vec3.ZERO);
  }

  static from_rotation_y(angle: number) {
    return new Affine3(Mat3.from_rotation_y(angle), Vec3.ZERO);
  }

  static from_rotation_z(angle: number) {
    return new Affine3(Mat3.from_rotation_z(angle), Vec3.ZERO);
  }

  /**
   * Creates an affine transform from the given 3D `scale`, `rotation` and `translation`.
   *
   * Equivalent to `Affine3A::from_translation(translation) *
   * Affine3A::from_quat(rotation) * Affine3A::from_scale(scale)`
   */
  static from_scale_rotation_translation(
    scale: Vec3,
    rotation: Quat,
    translation: Vec3,
  ) {
    const r = Mat3.from_quat(rotation);
    const matrix3 = Mat3.from_cols(
      r.x_axis.mul(scale.x),
      r.y_axis.mul(scale.y),
      r.z_axis.mul(scale.z),
    );
    return new Affine3(matrix3, translation);
  }

  constructor(
    public matrix3: Mat3 = Mat3.IDENTITY,
    public translation: Vec3 = Vec3.ZERO,
  ) {}
}
