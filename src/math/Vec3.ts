import { Type } from '@lastolivegames/becsy';
import { Vec2 } from './Vec2';
import { Vec4 } from './Vec4';

/**
 * A 3-dimensional vector.
 */
export class Vec3 {
  static ZERO = Vec3.splat(0);
  static ONE = Vec3.splat(1);
  static X = new Vec3(1, 0, 0);
  static Y = new Vec3(0, 1, 0);
  static Z = new Vec3(0, 0, 1);

  static splat(v: number) {
    return new Vec3(v, v, v);
  }

  constructor(public x: number, public y: number, public z: number) {}

  /**
   * Computes the length of `self`.
   */
  _length() {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Computes the dot product of `self` and `rhs`.
   */
  dot(rhs: Vec3) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
  }

  /**
   * Computes the cross product of `self` and `rhs`.
   */
  cross(rhs: Vec3) {
    return new Vec3(
      this.y * rhs.z - this.z * rhs.y,
      this.z * rhs.x - this.x * rhs.z,
      this.x * rhs.y - this.y * rhs.x,
    );
  }

  /**
   * Returns a vector containing the minimum values for each element of `self` and `rhs`.
   */
  min(rhs: Vec3) {
    return new Vec3(
      Math.min(this.x, rhs.x),
      Math.min(this.y, rhs.y),
      Math.min(this.z, rhs.z),
    );
  }

  /**
   * Returns a vector containing the maximum values for each element of `self` and `rhs`.
   */
  max(rhs: Vec3) {
    return new Vec3(
      Math.max(this.x, rhs.x),
      Math.max(this.y, rhs.y),
      Math.max(this.z, rhs.z),
    );
  }

  add(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      return new Vec3(this.x + rhs, this.y + rhs, this.z + rhs);
    }
    return new Vec3(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z);
  }

  add_assign(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      this.x += rhs;
      this.y += rhs;
      this.z += rhs;
    } else {
      this.x += rhs.x;
      this.y += rhs.y;
      this.z += rhs.z;
    }
    return this;
  }

  sub(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      return new Vec3(this.x - rhs, this.y - rhs, this.z - rhs);
    }
    return new Vec3(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z);
  }

  sub_assign(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      this.x -= rhs;
      this.y -= rhs;
      this.z -= rhs;
    } else {
      this.x -= rhs.x;
      this.y -= rhs.y;
      this.z -= rhs.z;
    }
    return this;
  }

  mul(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      return new Vec3(this.x * rhs, this.y * rhs, this.z * rhs);
    }
    return new Vec3(this.x * rhs.x, this.y * rhs.y, this.z * rhs.z);
  }

  mul_assign(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      this.x *= rhs;
      this.y *= rhs;
      this.z *= rhs;
    } else {
      this.x *= rhs.x;
      this.y *= rhs.y;
      this.z *= rhs.z;
    }
    return this;
  }

  div(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      return new Vec3(this.x / rhs, this.y / rhs, this.z / rhs);
    }
    return new Vec3(this.x / rhs.x, this.y / rhs.y, this.z / rhs.z);
  }

  div_assign(rhs: number | Vec3) {
    if (typeof rhs === 'number') {
      this.x /= rhs;
      this.y /= rhs;
      this.z /= rhs;
    } else {
      this.x /= rhs.x;
      this.y /= rhs.y;
      this.z /= rhs.z;
    }
    return this;
  }

  /**
   * Creates a 2D vector from the `x` and `y` elements of `self`, discarding `z`.
   */
  truncate() {
    return new Vec2(this.x, this.y);
  }

  /**
   * Creates a 4D vector from `self` and the given `w` value.
   */
  extend(w: number) {
    return new Vec4(this.x, this.y, this.z, w);
  }
}

// @ts-ignore
export const v3Type = Type.vector(Type.float64, ['x', 'y', 'z'], Vec3);
