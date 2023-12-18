import { Type } from '@lastolivegames/becsy';
import { Vec4 } from './Vec4';
import { Vec3 } from './Vec3';
import { EulerRot } from './EulerRot';
import { Affine3 } from './Affine3';
import { Mat3 } from './Mat3';

/**
 * A quaternion representing an orientation.
 */
export class Quat {
  /**
   * All zeros.
   */
  static ZERO = Quat.from_xyzw(0, 0, 0, 0);

  /**
   * The identity quaternion. Corresponds to no rotation.
   */
  static IDENTITY = Quat.from_xyzw(0.0, 0.0, 0.0, 1.0);

  /**
   * Creates a new rotation quaternion.
   *
   * This should generally not be called manually unless you know what you are doing.
   * Use one of the other constructors instead such as `identity` or `from_axis_angle`.
   */
  static from_xyzw(x: number, y: number, z: number, w: number) {
    return new Quat(x, y, z, w);
  }

  /**
   * Creates a quaternion from a 3x3 rotation matrix.
   */
  static from_mat3(mat: Mat3) {
    return Quat.from_rotation_axes(mat.x_axis, mat.y_axis, mat.z_axis);
  }

  /**
   * Creates a new rotation quaternion from a 4D vector.
   */
  static from_vec4(v: Vec4) {
    return Quat.from_xyzw(v.x, v.y, v.z, v.w);
  }

  /**
   * Creates a rotation quaternion from an array.
   */
  static from_array(a: number[]) {
    return Quat.from_xyzw(a[0], a[1], a[2], a[3]);
  }

  /**
   * Create a quaternion for a normalized rotation `axis` and `angle` (in radians).
   * The axis must be a unit vector.
   */
  static from_axis_angle(axis: Vec3, angle: number) {
    // axis.is_normalized()
    const s = Math.sin(angle * 0.5);
    const c = Math.cos(angle * 0.5);
    const v = axis.mul(new Vec3(s, s, s));
    return Quat.from_xyzw(v.x, v.y, v.z, c);
  }

  /**
   * Create a quaternion that rotates `v.length()` radians around `v.normalize()`.
   */
  static from_scaled_axis(v: Vec3) {
    let length = v._length();
    if (length === 0) {
      return Quat.IDENTITY;
    } else {
      return Quat.from_axis_angle(
        new Vec3(v.x / length, v.y / length, v.z / length),
        length,
      );
    }
  }

  /**
   * Creates a quaternion from the `angle` (in radians) around the x axis.
   */
  static from_rotation_x(angle: number) {
    const s = Math.sin(angle * 0.5);
    const c = Math.cos(angle * 0.5);
    return Quat.from_xyzw(s, 0.0, 0.0, c);
  }

  /**
   * Creates a quaternion from the `angle` (in radians) around the y axis.
   */
  static from_rotation_y(angle: number) {
    const s = Math.sin(angle * 0.5);
    const c = Math.cos(angle * 0.5);
    return Quat.from_xyzw(0.0, s, 0.0, c);
  }

  /**
   * Creates a quaternion from the `angle` (in radians) around the z axis.
   */
  static from_rotation_z(angle: number) {
    const s = Math.sin(angle * 0.5);
    const c = Math.cos(angle * 0.5);
    return Quat.from_xyzw(0.0, 0.0, s, c);
  }

  /**
   * From the columns of a 3x3 rotation matrix.
   */
  static from_rotation_axes(x_axis: Vec3, y_axis: Vec3, z_axis: Vec3) {
    // Based on https://github.com/microsoft/DirectXMath `XM$quaternionRotationMatrix`
    const { x: m00, y: m01, z: m02 } = x_axis;
    const { x: m10, y: m11, z: m12 } = y_axis;
    const { x: m20, y: m21, z: m22 } = z_axis;
    if (m22 <= 0.0) {
      // x^2 + y^2 >= z^2 + w^2
      const dif10 = m11 - m00;
      const omm22 = 1.0 - m22;
      if (dif10 <= 0.0) {
        // x^2 >= y^2
        const four_xsq = omm22 - dif10;
        const inv4x = 0.5 / Math.sqrt(four_xsq);
        return Quat.from_xyzw(
          four_xsq * inv4x,
          (m01 + m10) * inv4x,
          (m02 + m20) * inv4x,
          (m12 - m21) * inv4x,
        );
      } else {
        // y^2 >= x^2
        const four_ysq = omm22 + dif10;
        const inv4y = 0.5 / Math.sqrt(four_ysq);
        return Quat.from_xyzw(
          (m01 + m10) * inv4y,
          four_ysq * inv4y,
          (m12 + m21) * inv4y,
          (m20 - m02) * inv4y,
        );
      }
    } else {
      // z^2 + w^2 >= x^2 + y^2
      const sum10 = m11 + m00;
      const opm22 = 1.0 + m22;
      if (sum10 <= 0.0) {
        // z^2 >= w^2
        const four_zsq = opm22 - sum10;
        const inv4z = 0.5 / Math.sqrt(four_zsq);
        return Quat.from_xyzw(
          (m02 + m20) * inv4z,
          (m12 + m21) * inv4z,
          four_zsq * inv4z,
          (m01 - m10) * inv4z,
        );
      } else {
        // w^2 >= z^2
        const four_wsq = opm22 + sum10;
        const inv4w = 0.5 / Math.sqrt(four_wsq);
        return Quat.from_xyzw(
          (m12 - m21) * inv4w,
          (m20 - m02) * inv4w,
          (m01 - m10) * inv4w,
          four_wsq * inv4w,
        );
      }
    }
  }

  /**
   * Creates a quaternion from the given Euler rotation sequence and the angles (in radians).
   */
  static from_euler(euler: EulerRot, a: number, b: number, c: number) {
    euler.new_quat(a, b, c);
  }

  /**
   * Creates a quaternion from a 3x3 rotation matrix inside a 3D affine transform.
   */
  static from_affine3(a: Affine3) {
    return Quat.from_rotation_axes(
      a.matrix3.x_axis,
      a.matrix3.y_axis,
      a.matrix3.z_axis,
    );
  }

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number,
  ) {}

  /**
   * Adds two quaternions.
   *
   * The sum is not guaranteed to be normalized.
   * Note that addition is not the same as combining the rotations represented by the
   * two quaternions! That corresponds to multiplication.
   */
  add(rhs: Quat) {
    return Quat.from_vec4(Vec4.from(this).add(Vec4.from(rhs)));
  }

  /**
   * Subtracts the `rhs` quaternion from `self`.
   *
   * The difference is not guaranteed to be normalized.
   */
  sub(rhs: Quat) {
    return Quat.from_vec4(Vec4.from(this).sub(Vec4.from(rhs)));
  }

  /**
   * Multiplies a quaternion by a scalar value.
   * Multiplies two quaternions. If they each represent a rotation, the result will
   * represent the combined rotation.
   *
   * The product is not guaranteed to be normalized.
   */
  mul(rhs: Vec3): Vec3;
  mul(rhs: number): Quat;
  mul(rhs: Quat): Quat;
  mul(rhs: number | Quat | Vec3): Quat | Vec3 {
    if (typeof rhs === 'number') {
      return Quat.from_vec4(Vec4.from(this).mul(rhs));
    } else if (rhs instanceof Vec3) {
      return this.mul_vec3(rhs);
    } else {
      return this.mul_quat(rhs);
    }
  }
  mul_assign(rhs: Quat) {
    const r = this.mul_quat(rhs);
    this.x = r.x;
    this.y = r.y;
    this.z = r.z;
    this.w = r.w;
  }

  /**
   * Divides a quaternion by a scalar value.
   *
   * The quotient is not guaranteed to be normalized.
   */
  div(rhs: number) {
    return Quat.from_vec4(Vec4.from(this).div(rhs));
  }

  neg() {
    return this.mul(-1);
  }

  eq(rhs: Quat) {
    return Vec4.from(this).eq(Vec4.from(rhs));
  }

  /**
   * Returns `self` normalized to length 1.0.
   *
   * For valid results, `self` must _not_ be of length zero.
   */
  normalize() {
    return Quat.from_vec4(Vec4.from(this).normalize());
  }

  /**
   * Computes the length of `self`.
   */
  _length() {
    return Vec4.from(this)._length();
  }

  /**
   * Computes the dot product of `self` and `rhs`. The dot product is
   * equal to the cosine of the angle between two quaternion rotations.
   */
  dot(rhs: Quat) {
    return Vec4.from(this).dot(Vec4.from(rhs));
  }

  /**
   * Multiplies a quaternion and a 3D vector, returning the rotated vector.
   */
  mul_vec3(rhs: Vec3) {
    let w = this.w;
    let b = new Vec3(this.x, this.y, this.z);
    let b2 = b.dot(b);
    return rhs
      .mul(w * w - b2)
      .add(b.mul(rhs.dot(b) * 2.0))
      .add(b.cross(rhs).mul(w * 2.0));
  }

  /**
   * Multiplies two quaternions. If they each represent a rotation, the result will
   * represent the combined rotation.
   *
   * Note that due to floating point rounding the result may not be perfectly normalized.
   */
  mul_quat(rhs: Quat) {
    const { x: x0, y: y0, z: z0, w: w0 } = this;
    const { x: x1, y: y1, z: z1, w: w1 } = rhs;

    return Quat.from_xyzw(
      w0 * x1 + x0 * w1 + y0 * z1 - z0 * y1,
      w0 * y1 - x0 * z1 + y0 * w1 + z0 * x1,
      w0 * z1 + x0 * y1 - y0 * x1 + z0 * w1,
      w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1,
    );
  }

  /**
   * Performs a linear interpolation between `self` and `rhs` based on
   * the value `s`.
   *
   * When `s` is `0.0`, the result will be equal to `self`.  When `s`
   * is `1.0`, the result will be equal to `rhs`.
   */
  lerp(end: Quat, s: number) {
    const start = this;
    const dot = start.dot(end);
    const bias = dot >= 0.0 ? 1.0 : -1.0;
    const interpolated = start
      .add((end.mul(bias) as Quat).sub(start) as Quat)
      .mul(s) as Quat;
    return interpolated.normalize();
  }

  /**
   * Performs a spherical linear interpolation between `self` and `end`
   * based on the value `s`.
   */
  slerp(end: Quat, s: number) {
    const DOT_THRESHOLD = 0.9995;
    let dot = this.dot(end);
    if (dot < 0.0) {
      end = end.neg() as Quat;
      dot = -dot;
    }
    if (dot > DOT_THRESHOLD) {
      // assumes lerp returns a normalized quaternion
      return this.lerp(end, s);
    } else {
      let theta = Math.acos(dot);
      let scale1 = Math.sin(theta * (1.0 - s));
      let scale2 = Math.sin(theta * s);
      let theta_sin = Math.sin(theta);
      return (this.mul(scale1) as Quat)
        .add(end.mul(scale2) as Quat)
        .mul(1.0 / theta_sin) as Quat;
    }
  }
}

// @ts-ignore
export const quatType = Type.vector(Type.float64, ['x', 'y', 'z', 'w'], Quat);
