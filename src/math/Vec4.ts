import { Type } from '@lastolivegames/becsy';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';

/**
 * A 4-dimensional vector.
 */
export class Vec4 {
  /**
   * All zeroes.
   */
  static ZERO = Vec4.splat(0);

  /**
   * All ones.
   */
  static ONE = Vec4.splat(1);

  /**
   * A unit vector pointing along the positive X axis.
   */
  static X = new Vec4(1, 0, 0, 0);

  /**
   * A unit vector pointing along the positive Y axis.
   */
  static Y = new Vec4(0, 1, 0, 0);

  /**
   * A unit vector pointing along the positive Z axis.
   */
  static Z = new Vec4(0, 0, 1, 0);

  /**
   * A unit vector pointing along the positive W axis.
   */
  static W = new Vec4(0, 0, 0, 1);

  static splat(v: number) {
    return new Vec4(v, v, v, v);
  }

  static from(q: Quat) {
    return new Vec4(q.x, q.y, q.z, q.w);
  }

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number,
  ) {}

  /**
   * `[x, y, z, w]`
   */
  to_array() {
    return [this.x, this.y, this.z, this.w];
  }

  add(rhs: Vec4) {
    return new Vec4(
      this.x + rhs.x,
      this.y + rhs.y,
      this.z + rhs.z,
      this.w + rhs.w,
    );
  }
  add_assign(rhs: Vec4) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    this.w += rhs.w;
    return this;
  }

  sub(rhs: Vec4) {
    return new Vec4(
      this.x - rhs.x,
      this.y - rhs.y,
      this.z - rhs.z,
      this.w - rhs.w,
    );
  }
  sub_assign(rhs: Vec4) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    this.w -= rhs.w;
    return this;
  }

  mul(rhs: number | Vec4) {
    if (typeof rhs === 'number') {
      return new Vec4(this.x * rhs, this.y * rhs, this.z * rhs, this.w * rhs);
    }
    return new Vec4(
      this.x * rhs.x,
      this.y * rhs.y,
      this.z * rhs.z,
      this.w * rhs.w,
    );
  }
  mul_assign(rhs: number | Vec4) {
    if (typeof rhs === 'number') {
      this.x *= rhs;
      this.y *= rhs;
      this.z *= rhs;
      this.w *= rhs;
    } else {
      this.x *= rhs.x;
      this.y *= rhs.y;
      this.z *= rhs.z;
      this.w *= rhs.w;
    }
    return this;
  }

  div(rhs: number | Vec4) {
    if (typeof rhs === 'number') {
      return new Vec4(this.x / rhs, this.y / rhs, this.z / rhs, this.w / rhs);
    }
    return new Vec4(
      this.x / rhs.x,
      this.y / rhs.y,
      this.z / rhs.z,
      this.w / rhs.w,
    );
  }
  div_assign(rhs: number | Vec4) {
    if (typeof rhs === 'number') {
      this.x /= rhs;
      this.y /= rhs;
      this.z /= rhs;
      this.w /= rhs;
    } else {
      this.x /= rhs.x;
      this.y /= rhs.y;
      this.z /= rhs.z;
      this.w /= rhs.w;
    }
    return this;
  }

  /**
   * Returns a vector containing the reciprocal `1.0/n` of each element of `self`.
   */
  recip() {
    return new Vec4(1 / this.x, 1 / this.y, 1 / this.z, 1 / this.w);
  }

  /**
   * Computes the dot product of `self` and `rhs`.
   */
  dot(rhs: this) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w;
  }

  /**
   * Creates a 3D vector from the `x`, `y` and `z` elements of `self`, discarding `w`.
   */
  truncate() {
    return new Vec3(this.x, this.y, this.z);
  }

  /**
   * Computes the length of `self`.
   */
  _length() {
    return Math.sqrt(this.dot(this));
  }

  neg() {
    return this.mul(-1);
  }

  /**
   * Returns `self` normalized to length 1.0.
   *
   * For valid results, `self` must _not_ be of length zero, nor very close to zero.
   */
  normalize() {
    return this.mul(1 / this._length());
  }

  eq(rhs: Vec4) {
    return (
      this.x === rhs.x &&
      this.y === rhs.y &&
      this.z === rhs.z &&
      this.w === rhs.w
    );
  }

  xyz() {
    return new Vec3(this.x, this.y, this.z);
  }

  wwww() {
    return new Vec4(this.w, this.w, this.w, this.w);
  }
}

// @ts-ignore
export const v4Type = Type.vector(Type.float32, ['x', 'y', 'z', 'w'], Vec4);
