import { Type } from '@lastolivegames/becsy';
import { Mat2 } from './Mat2';
import { Quat } from './Quat';
import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';

/**
 * A 3x3 column major matrix.
 *
 * This 3x3 matrix type features convenience methods for creating and using linear and
 * affine transformations.
 * If you are primarily dealing with 2D affine transformations
 * the [`Affine2`](crate::Affine2) type is much faster and more space efficient than using a 3x3 matrix.
 */
export class Mat3 {
  x_axis: Vec3;
  y_axis: Vec3;
  z_axis: Vec3;

  /**
   * A 3x3 matrix with all elements set to `0.0`.
   */
  static ZERO = Mat3.from_cols(Vec3.ZERO, Vec3.ZERO, Vec3.ZERO);

  /**
   * A 3x3 identity matrix, where all diagonal elements are `1`, and all off-diagonal elements are `0`.
   */
  static IDENTITY = Mat3.from_cols(Vec3.X, Vec3.Y, Vec3.Z);

  static copy(m: Mat3) {
    const { m00, m01, m02, m10, m11, m12, m20, m21, m22 } = m;
    return new Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
  }

  /**
   * Creates a 3x3 matrix from three column vectors.
   */
  static from_cols(x_axis: Vec3, y_axis: Vec3, z_axis: Vec3) {
    return new Mat3(
      x_axis.x,
      x_axis.y,
      x_axis.z,
      y_axis.x,
      y_axis.y,
      y_axis.z,
      z_axis.x,
      z_axis.y,
      z_axis.z,
    );
  }

  /**
   * Creates a 3x3 matrix from a `[f32; 9]` array stored in column major order.
   * If your data is stored in row major you will need to `transpose` the returned matrix.
   */
  static from_cols_array(m: number[]) {
    return new Mat3(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
  }

  /**
   * Creates a `[f32; 9]` array storing data in column major order.
   * If you require data in row major order `transpose` the matrix first.
   */
  static to_cols_array(m: Mat3) {
    return [
      m.x_axis.x,
      m.x_axis.y,
      m.x_axis.z,
      m.y_axis.x,
      m.y_axis.y,
      m.y_axis.z,
      m.z_axis.x,
      m.z_axis.y,
      m.z_axis.z,
    ];
  }

  /**
   * Creates a 3x3 matrix with its diagonal set to `diagonal` and all other entries set to 0.
   */
  static from_diagonal(diagonal: Vec3) {
    return new Mat3(
      diagonal.x,
      0.0,
      0.0,
      0.0,
      diagonal.y,
      0.0,
      0.0,
      0.0,
      diagonal.z,
    );
  }

  /**
   * Creates a 3D rotation matrix from the given quaternion.
   */
  static from_quat(rotation: Quat) {
    let x2 = rotation.x + rotation.x;
    let y2 = rotation.y + rotation.y;
    let z2 = rotation.z + rotation.z;
    let xx = rotation.x * x2;
    let xy = rotation.x * y2;
    let xz = rotation.x * z2;
    let yy = rotation.y * y2;
    let yz = rotation.y * z2;
    let zz = rotation.z * z2;
    let wx = rotation.w * x2;
    let wy = rotation.w * y2;
    let wz = rotation.w * z2;

    return Mat3.from_cols(
      new Vec3(1.0 - (yy + zz), xy + wz, xz - wy),
      new Vec3(xy - wz, 1.0 - (xx + zz), yz + wx),
      new Vec3(xz + wy, yz - wx, 1.0 - (xx + yy)),
    );
  }

  /**
   * Creates a 3D rotation matrix from a normalized rotation `axis` and `angle` (in radians).
   */
  static from_axis_angle(axis: Vec3, angle: number) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    let { x: xsin, y: ysin, z: zsin } = axis.mul(sin);
    let { x, y, z } = axis;
    let { x: x2, y: y2, z: z2 } = axis.mul(axis);
    let omc = 1.0 - cos;
    let xyomc = x * y * omc;
    let xzomc = x * z * omc;
    let yzomc = y * z * omc;
    return Mat3.from_cols(
      new Vec3(x2 * omc + cos, xyomc + zsin, xzomc - ysin),
      new Vec3(xyomc - zsin, y2 * omc + cos, yzomc + xsin),
      new Vec3(xzomc + ysin, yzomc - xsin, z2 * omc + cos),
    );
  }

  static from_rotation_x(angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return Mat3.from_cols(
      new Vec3(1.0, 0.0, 0.0),
      new Vec3(0.0, c, s),
      new Vec3(0.0, -s, c),
    );
  }

  static from_rotation_y(angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return Mat3.from_cols(
      new Vec3(c, 0.0, -s),
      new Vec3(0.0, 1.0, 0.0),
      new Vec3(s, 0.0, c),
    );
  }

  static from_rotation_z(angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return Mat3.from_cols(
      new Vec3(c, s, 0.0),
      new Vec3(-s, c, 0.0),
      new Vec3(0.0, 0.0, 1.0),
    );
  }

  /**
   * Creates an affine transformation matrix from the given 2D `translation`.
   */
  static from_translation(translation: Vec2) {
    return Mat3.from_cols(
      Vec3.X,
      Vec3.Y,
      new Vec3(translation.x, translation.y, 1.0),
    );
  }

  /**
   * Creates an affine transformation matrix from the given 2D rotation `angle` (in radians).
   */
  static from_angle(angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return Mat3.from_cols(new Vec3(c, s, 0.0), new Vec3(-s, c, 0.0), Vec3.Z);
  }

  /**
   * Creates an affine transformation matrix from the given 2D `scale`, rotation `angle` (in radians) and `translation`.
   */
  static from_scale_angle_translation(
    scale: Vec2,
    angle: number,
    translation: Vec2,
  ) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return Mat3.from_cols(
      new Vec3(scale.x * c, scale.x * s, 0.0),
      new Vec3(-scale.y * s, scale.y * c, 0.0),
      new Vec3(translation.x, translation.y, 1.0),
    );
  }

  /**
   * Creates an affine transformation matrix from the given non-uniform 2D `scale`.
   */
  static from_scale(scale: Vec2) {
    return Mat3.from_cols(
      new Vec3(scale.x, 0.0, 0.0),
      new Vec3(0.0, scale.y, 0.0),
      Vec3.Z,
    );
  }

  /**
   * Creates an affine transformation matrix from the given 2x2 matrix.
   */
  static from_mat2(m: Mat2) {
    return Mat3.from_cols(
      new Vec3(m.x_axis.x, m.x_axis.y, 0.0),
      new Vec3(m.y_axis.x, m.y_axis.y, 0.0),
      Vec3.Z,
    );
  }

  /**
   * Creates a 3x3 matrix from a 4x4 matrix, discarding the 4th row and column.
   */
  // static from_mat4(m: Mat4) {
  //   Mat3.from_cols()
  // }

  constructor(
    public m00: number,
    public m01: number,
    public m02: number,
    public m10: number,
    public m11: number,
    public m12: number,
    public m20: number,
    public m21: number,
    public m22: number,
  ) {
    this.x_axis = new Vec3(m00, m01, m02);
    this.y_axis = new Vec3(m10, m11, m12);
    this.z_axis = new Vec3(m20, m21, m22);
  }

  /**
   * Returns the matrix row for the given `index`.
   */
  row(index: number) {
    switch (index) {
      case 0:
        return new Vec3(this.x_axis.x, this.y_axis.x, this.z_axis.x);
      case 1:
        return new Vec3(this.x_axis.y, this.y_axis.y, this.z_axis.y);
      case 2:
        return new Vec3(this.x_axis.z, this.y_axis.z, this.z_axis.z);
      default:
        throw new Error('index out of bounds');
    }
  }

  /**
   * Returns the transpose of `self`.
   */
  transpose() {
    return Mat3.from_cols(
      new Vec3(this.x_axis.x, this.y_axis.x, this.z_axis.x),
      new Vec3(this.x_axis.y, this.y_axis.y, this.z_axis.y),
      new Vec3(this.x_axis.z, this.y_axis.z, this.z_axis.z),
    );
  }

  /**
   * Returns the determinant of `self`.
   */
  determinant() {
    return this.z_axis.dot(this.x_axis.cross(this.y_axis));
  }

  /**
   * Returns the inverse of `self`.
   * If the matrix is not invertible the returned matrix will be invalid.
   */
  inverse() {
    const self = this;
    let tmp0 = self.y_axis.cross(self.z_axis);
    let tmp1 = self.z_axis.cross(self.x_axis);
    let tmp2 = self.x_axis.cross(self.y_axis);
    let det = self.z_axis.dot(tmp2);

    if (det === 0.0) {
      throw Error('determinant is zero');
    }

    let inv_det = Vec3.splat(1 / det);
    return Mat3.from_cols(
      tmp0.mul(inv_det),
      tmp1.mul(inv_det),
      tmp2.mul(inv_det),
    ).transpose();
  }

  /**
   * Transforms the given 2D vector as a point.
   * This is the equivalent of multiplying `rhs` as a 3D vector where `z` is `1`.
   * This method assumes that `self` contains a valid affine transform.
   */
  transform_point2(rhs: Vec2) {
    return (
      Mat2.from_cols(this.x_axis.truncate(), this.y_axis.truncate()).mul(
        rhs,
      ) as Vec2
    ).add(this.z_axis.truncate());
  }

  /**
   * Multiplies a 3x3 matrix by a scalar.
   */
  mul_scalar(rhs: number) {
    return Mat3.from_cols(
      this.x_axis.mul(rhs),
      this.y_axis.mul(rhs),
      this.z_axis.mul(rhs),
    );
  }

  mul_vec3(rhs: Vec3) {
    let res = this.x_axis.mul(rhs.xxx());
    res = res.add(this.y_axis.mul(rhs.yyy()));
    res = res.add(this.z_axis.mul(rhs.zzz()));
    return res;
  }

  /**
   * Multiplies two 3x3 matrices.
   */
  mul_mat3(rhs: Mat3) {
    return Mat3.from_cols(
      this.mul_vec3(rhs.x_axis),
      this.mul_vec3(rhs.y_axis),
      this.mul_vec3(rhs.z_axis),
    );
  }

  /**
   * Adds two 3x3 matrices.
   */
  add_mat3(rhs: Mat3) {
    return Mat3.from_cols(
      this.x_axis.add(rhs.x_axis),
      this.y_axis.add(rhs.y_axis),
      this.z_axis.add(rhs.z_axis),
    );
  }

  /**
   * Subtracts two 3x3 matrices.
   */
  sub_mat3(rhs: Mat3) {
    return Mat3.from_cols(
      this.x_axis.sub(rhs.x_axis),
      this.y_axis.sub(rhs.y_axis),
      this.z_axis.sub(rhs.z_axis),
    );
  }
}

export const m3Type = Type.vector(
  Type.float32,
  ['m00', 'm01', 'm02', 'm10', 'm11', 'm12', 'm20', 'm21', 'm22'],
  // @ts-ignore
  Mat3,
);
