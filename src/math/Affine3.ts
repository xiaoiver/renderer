import { field } from '@lastolivegames/becsy';
import { Mat3, m3Type } from './Mat3';
import { Quat } from './Quat';
import { Vec3, v3Type } from './Vec3';
import { Vec4 } from './Vec4';

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

  static from(a: Affine3) {
    return new Affine3(a.matrix3, a.translation);
  }

  /**
   * Creates an affine transformation from the given 3D `translation`.
   */
  static from_translation(translation: Vec3) {
    return new Affine3(Mat3.IDENTITY, translation);
  }

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

  @field(m3Type) declare matrix3: Mat3;
  @field(v3Type) declare translation: Vec3;

  constructor(matrix3: Mat3 = Mat3.IDENTITY, translation: Vec3 = Vec3.ZERO) {
    this.matrix3 = matrix3;
    this.translation = translation;
  }

  transform_point3(rhs: Vec3) {
    return this.matrix3.mul_vec3(rhs).add(this.translation);
  }

  /**
   * Return the inverse of this transform.
   * Note that if the transform is not invertible the result will be invalid.
   */
  inverse() {
    const matrix3 = this.matrix3.inverse();
    // transform negative translation by the matrix inverse:
    const translation = matrix3.mul_vec3(this.translation).neg();

    return new Affine3(matrix3, translation);
  }

  /**
   * Calculates the inverse transpose of the 3x3 matrix and formats it for packing into GPU buffers
   */
  inverse_transpose_3x3(): [
    [number, number, number, number, number, number, number, number],
    number,
  ] {
    const inverse_transpose_3x3 = Affine3.from(this)
      .inverse()
      .matrix3.transpose();
    const { x_axis, y_axis, z_axis } = inverse_transpose_3x3;
    return [
      [...x_axis.to_array(), y_axis.x, y_axis.y, y_axis.z, z_axis.x, z_axis.y],
      inverse_transpose_3x3.z_axis.z,
    ];
  }

  /**
   * Calculates the inverse transpose of the 3x3 matrix and formats it for packing into GPU buffers
   */
  to_transpose(): [Vec4, Vec4, Vec4] {
    const transpose_3x3 = this.matrix3.transpose();
    return [
      transpose_3x3.x_axis.extend(this.translation.x),
      transpose_3x3.y_axis.extend(this.translation.y),
      transpose_3x3.z_axis.extend(this.translation.z),
    ];
  }

  /**
   * Creates a `[[f32; 3]; 4]` 3D array storing data in
   * column major order.
   * If you require data in row major order `transpose` the matrix first.
   */
  to_cols_array_2d() {
    return [
      ...this.matrix3.x_axis.to_array(),
      ...this.matrix3.y_axis.to_array(),
      ...this.matrix3.z_axis.to_array(),
      ...this.translation.to_array(),
    ];
  }

  /**
   * Extracts `scale`, `rotation` and `translation` from `self`.
   * The transform is expected to be non-degenerate and without shearing, or the output will be invalid.
   */
  to_scale_rotation_translation(): {
    scale: Vec3;
    rotation: Quat;
    translation: Vec3;
  } | null {
    const det = this.matrix3.determinant();
    if (det === 0) {
      return null;
    }

    const scale = new Vec3(
      this.matrix3.x_axis._length() * Math.sign(det),
      this.matrix3.y_axis._length(),
      this.matrix3.z_axis._length(),
    );
    if (!scale.cmpne(Vec3.ZERO).all()) {
      return null;
    }

    const inv_scale = scale.recip();
    const rotation = Quat.from_mat3(
      Mat3.from_cols(
        this.matrix3.x_axis.mul(inv_scale.x),
        this.matrix3.y_axis.mul(inv_scale.y),
        this.matrix3.z_axis.mul(inv_scale.z),
      ),
    );

    return { scale, rotation, translation: this.translation };
  }
}
