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

  static from(m: Affine3) {
    return Mat4.from_cols(
      m.matrix3.x_axis.extend(0),
      m.matrix3.y_axis.extend(0),
      m.matrix3.z_axis.extend(0),
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

  constructor(
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
  ) {
    this.x_axis = new Vec4(m00, m01, m02, m03);
    this.y_axis = new Vec4(m10, m11, m12, m13);
    this.z_axis = new Vec4(m20, m21, m22, m23);
    this.w_axis = new Vec4(m30, m31, m32, m33);
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
      this.mul(rhs.x_axis) as Vec4,
      this.mul(rhs.y_axis) as Vec4,
      this.mul(rhs.z_axis) as Vec4,
      this.mul(rhs.w_axis) as Vec4,
    );
  }

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
    let { x: m00, y: m01, z: m02, w: m03 } = this.x_axis;
    let { x: m10, y: m11, z: m12, w: m13 } = this.y_axis;
    let { x: m20, y: m21, z: m22, w: m23 } = this.z_axis;
    let { x: m30, y: m31, z: m32, w: m33 } = this.w_axis;

    let coef00 = m22 * m33 - m32 * m23;
    let coef02 = m12 * m33 - m32 * m13;
    let coef03 = m12 * m23 - m22 * m13;

    let coef04 = m21 * m33 - m31 * m23;
    let coef06 = m11 * m33 - m31 * m13;
    let coef07 = m11 * m23 - m21 * m13;

    let coef08 = m21 * m32 - m31 * m22;
    let coef10 = m11 * m32 - m31 * m12;
    let coef11 = m11 * m22 - m21 * m12;

    let coef12 = m20 * m33 - m30 * m23;
    let coef14 = m10 * m33 - m30 * m13;
    let coef15 = m10 * m23 - m20 * m13;

    let coef16 = m20 * m32 - m30 * m22;
    let coef18 = m10 * m32 - m30 * m12;
    let coef19 = m10 * m22 - m20 * m12;

    let coef20 = m20 * m31 - m30 * m21;
    let coef22 = m10 * m31 - m30 * m11;
    let coef23 = m10 * m21 - m20 * m11;

    let fac0 = new Vec4(coef00, coef00, coef02, coef03);
    let fac1 = new Vec4(coef04, coef04, coef06, coef07);
    let fac2 = new Vec4(coef08, coef08, coef10, coef11);
    let fac3 = new Vec4(coef12, coef12, coef14, coef15);
    let fac4 = new Vec4(coef16, coef16, coef18, coef19);
    let fac5 = new Vec4(coef20, coef20, coef22, coef23);

    let vec0 = new Vec4(m10, m00, m00, m00);
    let vec1 = new Vec4(m11, m01, m01, m01);
    let vec2 = new Vec4(m12, m02, m02, m02);
    let vec3 = new Vec4(m13, m03, m03, m03);

    let inv0 = vec1.mul(fac0).sub(vec2.mul(fac1)).add(vec3.mul(fac2));
    let inv1 = vec0.mul(fac0).sub(vec2.mul(fac3)).add(vec3.mul(fac4));
    let inv2 = vec0.mul(fac1).sub(vec1.mul(fac3)).add(vec3.mul(fac5));
    let inv3 = vec0.mul(fac2).sub(vec1.mul(fac4)).add(vec2.mul(fac5));

    let sign_a = new Vec4(1.0, -1.0, 1.0, -1.0);
    let sign_b = new Vec4(-1.0, 1.0, -1.0, 1.0);

    let inverse = Mat4.from_cols(
      inv0.mul(sign_a),
      inv1.mul(sign_b),
      inv2.mul(sign_a),
      inv3.mul(sign_b),
    );

    let col0 = new Vec4(
      inverse.x_axis.x,
      inverse.y_axis.x,
      inverse.z_axis.x,
      inverse.w_axis.x,
    );

    let dot0 = this.x_axis.mul(col0);
    let dot1 = dot0.x + dot0.y + dot0.z + dot0.w;

    let rcp_det = 1.0 / dot1;
    return inverse.mul(rcp_det) as Mat4;
  }

  determinant() {
    let { x: m00, y: m01, z: m02, w: m03 } = this.x_axis;
    let { x: m10, y: m11, z: m12, w: m13 } = this.y_axis;
    let { x: m20, y: m21, z: m22, w: m23 } = this.z_axis;
    let { x: m30, y: m31, z: m32, w: m33 } = this.w_axis;

    let a2323 = m22 * m33 - m23 * m32;
    let a1323 = m21 * m33 - m23 * m31;
    let a1223 = m21 * m32 - m22 * m31;
    let a0323 = m20 * m33 - m23 * m30;
    let a0223 = m20 * m32 - m22 * m30;
    let a0123 = m20 * m31 - m21 * m30;

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
    let det = this.determinant();
    // glam_assert!(det != 0.0);

    let scale = new Vec3(
      this.x_axis._length() * Math.sign(det),
      this.y_axis._length(),
      this.z_axis._length(),
    );

    // glam_assert!(scale.cmpne(Vec3::ZERO).all());

    let inv_scale = Vec3.ONE.div(scale);

    let rotation = Quat.from_rotation_axes(
      this.x_axis.mul(inv_scale.x).xyz(),
      this.y_axis.mul(inv_scale.y).xyz(),
      this.z_axis.mul(inv_scale.z).xyz(),
    );

    let translation = this.w_axis.xyz();

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
}
