import { Type } from '@lastolivegames/becsy';
import { Affine3 } from './Affine3';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';

export class Mat4 {
  x_axis: Vec4;
  y_axis: Vec4;
  z_axis: Vec4;
  w_axis: Vec4;

  /**
   * A 4x4 matrix with all elements set to `0.0`.
   */
  static ZERO = Mat4.from_cols(Vec4.ZERO, Vec4.ZERO, Vec4.ZERO, Vec4.ZERO);

  /**
   * A 4x4 identity matrix, where all diagonal elements are `1`, and all off-diagonal elements are `0`.
   */
  static IDENTITY = Mat4.from_cols(Vec4.X, Vec4.Y, Vec4.Z, Vec4.W);

  static copy(m: Mat4) {
    const {
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33,
    } = m;
    return new Mat4(
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33,
    );
  }

  static from(m: Affine3) {
    const { m00, m01, m02, m10, m11, m12, m20, m21, m22 } = m.matrix3;
    return Mat4.from_cols(
      new Vec3(m00, m01, m02).extend(0),
      new Vec3(m10, m11, m12).extend(0),
      new Vec3(m20, m21, m22).extend(0),
      m.translation.extend(1),
    );
  }

  static from_cols(x_axis: Vec4, y_axis: Vec4, z_axis: Vec4, w_axis: Vec4) {
    return new Mat4(
      x_axis.x,
      x_axis.y,
      x_axis.z,
      x_axis.w,
      y_axis.x,
      y_axis.y,
      y_axis.z,
      y_axis.w,
      z_axis.x,
      z_axis.y,
      z_axis.z,
      z_axis.w,
      w_axis.x,
      w_axis.y,
      w_axis.z,
      w_axis.w,
    );
  }

  static from_affine3(m: Affine3) {
    return Mat4.from_cols(
      m.matrix3.x_axis.extend(0),
      m.matrix3.y_axis.extend(0),
      m.matrix3.z_axis.extend(0),
      m.translation.extend(1),
    );
  }

  /**
   * Creates an affine transformation matrix from the given 3D `translation`.
   * The resulting matrix can be used to transform 3D points and vectors.
   */
  static from_translation(translation: Vec3) {
    return Mat4.from_cols(
      Vec4.X,
      Vec4.Y,
      Vec4.Z,
      new Vec4(translation.x, translation.y, translation.z, 1.0),
    );
  }

  /**
   * Creates an affine transformation matrix from the given `rotation` quaternion.
   */
  static from_quat(rotation: Quat) {
    let [x_axis, y_axis, z_axis] = Mat4.quat_to_axes(rotation);
    return Mat4.from_cols(x_axis, y_axis, z_axis, Vec4.W);
  }

  /**
   * Creates an affine transformation matrix containing a 3D rotation around the x axis of `angle` (in radians).
   */
  static from_rotation_x(angle: number) {
    const sina = Math.sin(angle);
    const cosa = Math.cos(angle);
    return Mat4.from_cols(
      Vec4.X,
      new Vec4(0.0, cosa, sina, 0.0),
      new Vec4(0.0, -sina, cosa, 0.0),
      Vec4.W,
    );
  }

  /**
   * Creates an affine transformation matrix containing a 3D rotation around the y axis of `angle` (in radians).
   */
  static from_rotation_y(angle: number) {
    const sina = Math.sin(angle);
    const cosa = Math.cos(angle);
    return Mat4.from_cols(
      new Vec4(cosa, 0.0, -sina, 0.0),
      Vec4.Y,
      new Vec4(sina, 0.0, cosa, 0.0),
      Vec4.W,
    );
  }

  /**
   * Creates an affine transformation matrix containing a 3D rotation around the z axis of `angle` (in radians).
   */
  static from_rotation_z(angle: number) {
    const sina = Math.sin(angle);
    const cosa = Math.cos(angle);
    return Mat4.from_cols(
      new Vec4(cosa, sina, 0.0, 0.0),
      new Vec4(-sina, cosa, 0.0, 0.0),
      Vec4.Z,
      Vec4.W,
    );
  }

  static quat_to_axes(rotation: Quat): [Vec4, Vec4, Vec4] {
    // glam_assert!(rotation.is_normalized());

    let { x, y, z, w } = rotation;
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    let x_axis = new Vec4(1.0 - (yy + zz), xy + wz, xz - wy, 0.0);
    let y_axis = new Vec4(xy - wz, 1.0 - (xx + zz), yz + wx, 0.0);
    let z_axis = new Vec4(xz + wy, yz - wx, 1.0 - (xx + yy), 0.0);
    return [x_axis, y_axis, z_axis];
  }

  static perspective_infinite_rh(
    fov_y_radians: number,
    aspect_ratio: number,
    z_near: number,
  ) {
    const f = 1.0 / Math.tan(0.5 * fov_y_radians);
    return Mat4.from_cols(
      new Vec4(f / aspect_ratio, 0.0, 0.0, 0.0),
      new Vec4(0.0, f, 0.0, 0.0),
      new Vec4(0.0, 0.0, -1.0, -1.0),
      new Vec4(0.0, 0.0, -z_near, 0.0),
    );
  }

  /**
   * Creates an infinite reverse right-handed perspective projection matrix
   * with `[0,1]` depth range.
   */
  static perspective_infinite_reverse_rh(
    fov_y_radians: number,
    aspect_ratio: number,
    z_near: number,
  ) {
    const f = 1.0 / Math.tan(0.5 * fov_y_radians);
    return Mat4.from_cols(
      new Vec4(f / aspect_ratio, 0.0, 0.0, 0.0),
      new Vec4(0.0, f, 0.0, 0.0),
      new Vec4(0.0, 0.0, 0.0, -1.0),
      new Vec4(0.0, 0.0, z_near, 0.0),
    );
  }

  /**
   * Creates a right-handed orthographic projection matrix with `[0,1]` depth range.
   */
  static orthographic_rh(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
  ) {
    const rcp_width = 1.0 / (right - left);
    const rcp_height = 1.0 / (top - bottom);
    const r = 1.0 / (near - far);
    return Mat4.from_cols(
      new Vec4(rcp_width + rcp_width, 0.0, 0.0, 0.0),
      new Vec4(0.0, rcp_height + rcp_height, 0.0, 0.0),
      new Vec4(0.0, 0.0, r, 0.0),
      new Vec4(
        -(left + right) * rcp_width,
        -(top + bottom) * rcp_height,
        r * near,
        1.0,
      ),
    );
  }

  constructor(
    public m00: number,
    public m01: number,
    public m02: number,
    public m03: number,
    public m10: number,
    public m11: number,
    public m12: number,
    public m13: number,
    public m20: number,
    public m21: number,
    public m22: number,
    public m23: number,
    public m30: number,
    public m31: number,
    public m32: number,
    public m33: number,
  ) {
    this.x_axis = new Vec4(m00, m01, m02, m03);
    this.y_axis = new Vec4(m10, m11, m12, m13);
    this.z_axis = new Vec4(m20, m21, m22, m23);
    this.w_axis = new Vec4(m30, m31, m32, m33);
  }

  /**
   * Creates a `[[number; 4]; 4]` 4D array storing data in column major order.
   * If you require data in row major order `transpose` the matrix first.
   */
  to_cols_array_2d() {
    return [
      ...this.x_axis.to_array(),
      ...this.y_axis.to_array(),
      ...this.z_axis.to_array(),
      ...this.w_axis.to_array(),
    ];
  }

  /**
   * Returns the matrix row for the given `index`.
   */
  row(index: number) {
    if (index === 0) {
      return new Vec4(
        this.x_axis.x,
        this.y_axis.x,
        this.z_axis.x,
        this.w_axis.x,
      );
    } else if (index === 1) {
      return new Vec4(
        this.x_axis.y,
        this.y_axis.y,
        this.z_axis.y,
        this.w_axis.y,
      );
    } else if (index === 2) {
      return new Vec4(
        this.x_axis.z,
        this.y_axis.z,
        this.z_axis.z,
        this.w_axis.z,
      );
    } else {
      return new Vec4(
        this.x_axis.w,
        this.y_axis.w,
        this.z_axis.w,
        this.w_axis.w,
      );
    }
  }

  /**
   * Multiplies a 4x4 matrix by a scalar.
   */
  mul_scalar(rhs: number) {
    return Mat4.from_cols(
      this.x_axis.mul(rhs),
      this.y_axis.mul(rhs),
      this.z_axis.mul(rhs),
      this.w_axis.mul(rhs),
    );
  }

  /**
   * Transforms a 4D vector.
   */
  mul_vec4(rhs: Vec4) {
    const res = this.x_axis.mul(rhs.x);
    res.add_assign(this.y_axis.mul(rhs.y));
    res.add_assign(this.z_axis.mul(rhs.z));
    res.add_assign(this.w_axis.mul(rhs.w));
    return res;
  }

  /**
   * Multiplies two 4x4 matrices.
   */
  mul_mat4(rhs: Mat4) {
    return Mat4.from_cols(
      this.mul(rhs.x_axis),
      this.mul(rhs.y_axis),
      this.mul(rhs.z_axis),
      this.mul(rhs.w_axis),
    );
  }

  mul(rhs: number): Mat4;
  mul(rhs: Vec4): Vec4;
  mul(rhs: Mat4): Mat4;
  mul(rhs: number | Vec4 | Mat4): Vec4 | Mat4 {
    if (typeof rhs === 'number') {
      return this.mul_scalar(rhs);
    } else if (rhs instanceof Vec4) {
      return this.mul_vec4(rhs);
    } else {
      return this.mul_mat4(rhs);
    }
  }

  mul_assign(rhs: number | Vec4 | Mat4) {
    if (typeof rhs === 'number') {
      this.x_axis.mul_assign(rhs);
      this.y_axis.mul_assign(rhs);
      this.z_axis.mul_assign(rhs);
      this.w_axis.mul_assign(rhs);
    } else if (rhs instanceof Vec4) {
      this.x_axis.mul_assign(rhs.x);
      this.y_axis.mul_assign(rhs.y);
      this.z_axis.mul_assign(rhs.z);
      this.w_axis.mul_assign(rhs.w);
    } else {
      this.x_axis = this.mul(rhs.x_axis) as Vec4;
      this.y_axis = this.mul(rhs.y_axis) as Vec4;
      this.z_axis = this.mul(rhs.z_axis) as Vec4;
      this.w_axis = this.mul(rhs.w_axis) as Vec4;
    }
    return this;
  }

  /**
   * Returns the inverse of `self`.
   *
   * If the matrix is not invertible the returned matrix will be invalid.
   */
  inverse(): Mat4 {
    const { x: m00, y: m01, z: m02, w: m03 } = this.x_axis;
    const { x: m10, y: m11, z: m12, w: m13 } = this.y_axis;
    const { x: m20, y: m21, z: m22, w: m23 } = this.z_axis;
    const { x: m30, y: m31, z: m32, w: m33 } = this.w_axis;

    const coef00 = m22 * m33 - m32 * m23;
    const coef02 = m12 * m33 - m32 * m13;
    const coef03 = m12 * m23 - m22 * m13;

    const coef04 = m21 * m33 - m31 * m23;
    const coef06 = m11 * m33 - m31 * m13;
    const coef07 = m11 * m23 - m21 * m13;

    const coef08 = m21 * m32 - m31 * m22;
    const coef10 = m11 * m32 - m31 * m12;
    const coef11 = m11 * m22 - m21 * m12;

    const coef12 = m20 * m33 - m30 * m23;
    const coef14 = m10 * m33 - m30 * m13;
    const coef15 = m10 * m23 - m20 * m13;

    const coef16 = m20 * m32 - m30 * m22;
    const coef18 = m10 * m32 - m30 * m12;
    const coef19 = m10 * m22 - m20 * m12;

    const coef20 = m20 * m31 - m30 * m21;
    const coef22 = m10 * m31 - m30 * m11;
    const coef23 = m10 * m21 - m20 * m11;

    const fac0 = new Vec4(coef00, coef00, coef02, coef03);
    const fac1 = new Vec4(coef04, coef04, coef06, coef07);
    const fac2 = new Vec4(coef08, coef08, coef10, coef11);
    const fac3 = new Vec4(coef12, coef12, coef14, coef15);
    const fac4 = new Vec4(coef16, coef16, coef18, coef19);
    const fac5 = new Vec4(coef20, coef20, coef22, coef23);

    const vec0 = new Vec4(m10, m00, m00, m00);
    const vec1 = new Vec4(m11, m01, m01, m01);
    const vec2 = new Vec4(m12, m02, m02, m02);
    const vec3 = new Vec4(m13, m03, m03, m03);

    const inv0 = vec1.mul(fac0).sub(vec2.mul(fac1)).add(vec3.mul(fac2));
    const inv1 = vec0.mul(fac0).sub(vec2.mul(fac3)).add(vec3.mul(fac4));
    const inv2 = vec0.mul(fac1).sub(vec1.mul(fac3)).add(vec3.mul(fac5));
    const inv3 = vec0.mul(fac2).sub(vec1.mul(fac4)).add(vec2.mul(fac5));

    const sign_a = new Vec4(1.0, -1.0, 1.0, -1.0);
    const sign_b = new Vec4(-1.0, 1.0, -1.0, 1.0);

    const inverse = Mat4.from_cols(
      inv0.mul(sign_a),
      inv1.mul(sign_b),
      inv2.mul(sign_a),
      inv3.mul(sign_b),
    );

    const col0 = new Vec4(
      inverse.x_axis.x,
      inverse.y_axis.x,
      inverse.z_axis.x,
      inverse.w_axis.x,
    );

    const dot0 = this.x_axis.mul(col0);
    const dot1 = dot0.x + dot0.y + dot0.z + dot0.w;

    if (dot1 === 0.0) {
      throw new Error('The determinant is 0.');
    }

    const rcp_det = 1.0 / dot1;
    return inverse.mul(rcp_det) as Mat4;
  }

  determinant() {
    const { x: m00, y: m01, z: m02, w: m03 } = this.x_axis;
    const { x: m10, y: m11, z: m12, w: m13 } = this.y_axis;
    const { x: m20, y: m21, z: m22, w: m23 } = this.z_axis;
    const { x: m30, y: m31, z: m32, w: m33 } = this.w_axis;

    const a2323 = m22 * m33 - m23 * m32;
    const a1323 = m21 * m33 - m23 * m31;
    const a1223 = m21 * m32 - m22 * m31;
    const a0323 = m20 * m33 - m23 * m30;
    const a0223 = m20 * m32 - m22 * m30;
    const a0123 = m20 * m31 - m21 * m30;

    return (
      m00 * (m11 * a2323 - m12 * a1323 + m13 * a1223) -
      m01 * (m10 * a2323 - m12 * a0323 + m13 * a0223) +
      m02 * (m10 * a1323 - m11 * a0323 + m13 * a0123) -
      m03 * (m10 * a1223 - m11 * a0223 + m12 * a0123)
    );
  }

  /**
   * Extracts `scale`, `rotation` and `translation` from `self`.
   * The input matrix is expected to be a 3D affine transformation matrix otherwise the output will be invalid.
   */
  to_scale_rotation_translation() {
    const det = this.determinant();

    if (det === 0.0) {
      throw new Error('The determinant is 0.');
    }

    const scale = new Vec3(
      this.x_axis._length() * Math.sign(det),
      this.y_axis._length(),
      this.z_axis._length(),
    );

    // glam_assert!(scale.cmpne(Vec3::ZERO).all());

    const inv_scale = Vec3.ONE.div(scale);

    const rotation = Quat.from_rotation_axes(
      this.x_axis.mul(inv_scale.x).xyz(),
      this.y_axis.mul(inv_scale.y).xyz(),
      this.z_axis.mul(inv_scale.z).xyz(),
    );

    const translation = this.w_axis.xyz();

    return {
      scale,
      translation,
      rotation,
    };
  }

  /**
   * Transforms the given 3D vector as a point, applying perspective correction.
   *
   * This is the equivalent of multiplying the 3D vector as a 4D vector where `w` is `1.0`.
   * The perspective divide is performed meaning the resulting 3D vector is divided by `w`.
   *
   * This method assumes that `self` contains a projective transform.
   */
  project_point3(rhs: Vec3) {
    const self = this;
    let res = self.x_axis.mul(rhs.x);
    res = self.y_axis.mul(rhs.y).add(res);
    res = self.z_axis.mul(rhs.z).add(res);
    res = self.w_axis.add(res);
    res = res.mul(res.wwww().recip());
    return res.xyz();
  }

  /**
   * Transforms the given 3D vector as a point.
   *
   * This is the equivalent of multiplying the 3D vector as a 4D vector where `w` is `1.0`.
   */
  transform_point3(rhs: Vec3) {
    const self = this;
    let res = self.x_axis.mul(rhs.x);
    res = self.y_axis.mul(rhs.y).add(res);
    res = self.z_axis.mul(rhs.z).add(res);
    res = self.w_axis.add(res);
    return res.xyz();
  }

  transpose() {
    return Mat4.from_cols(
      new Vec4(this.x_axis.x, this.y_axis.x, this.z_axis.x, this.w_axis.x),
      new Vec4(this.x_axis.y, this.y_axis.y, this.z_axis.y, this.w_axis.y),
      new Vec4(this.x_axis.z, this.y_axis.z, this.z_axis.z, this.w_axis.z),
      new Vec4(this.x_axis.w, this.y_axis.w, this.z_axis.w, this.w_axis.w),
    );
  }
}

export const m4Type = Type.vector(
  Type.float32,
  [
    'm00',
    'm01',
    'm02',
    'm03',
    'm10',
    'm11',
    'm12',
    'm13',
    'm20',
    'm21',
    'm22',
    'm23',
    'm30',
    'm31',
    'm32',
    'm33',
  ],
  // @ts-ignore
  Mat4,
);
