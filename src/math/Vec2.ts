import { Type } from '@lastolivegames/becsy';
import { BVec2 } from './BVec2';
import { Vec3 } from './Vec3';

/**
 * A 2-dimensional vector.
 */
export class Vec2 {
  static ZERO = Vec2.splat(0);
  static ONE = Vec2.splat(1);
  static X = new Vec2(1, 0);
  static Y = new Vec2(0, 1);

  static splat(v: number) {
    return new Vec2(v, v);
  }

  constructor(public x: number, public y: number) {}

  to_array() {
    return [this.x, this.y];
  }

  add(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      return new Vec2(this.x + rhs, this.y + rhs);
    } else {
      return new Vec2(this.x + rhs.x, this.y + rhs.y);
    }
  }
  add_assign(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      this.x += rhs;
      this.y += rhs;
    } else {
      this.x += rhs.x;
      this.y += rhs.y;
    }
    return this;
  }

  sub(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      return new Vec2(this.x - rhs, this.y - rhs);
    } else {
      return new Vec2(this.x - rhs.x, this.y - rhs.y);
    }
  }
  sub_assign(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      this.x -= rhs;
      this.y -= rhs;
    } else {
      this.x -= rhs.x;
      this.y -= rhs.y;
    }
    return this;
  }

  mul(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      return new Vec2(this.x * rhs, this.y * rhs);
    } else {
      return new Vec2(this.x * rhs.x, this.y * rhs.y);
    }
  }
  mul_assign(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      this.x *= rhs;
      this.y *= rhs;
    } else {
      this.x *= rhs.x;
      this.y *= rhs.y;
    }
    return this;
  }

  div(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      return new Vec2(this.x / rhs, this.y / rhs);
    } else {
      return new Vec2(this.x / rhs.x, this.y / rhs.y);
    }
  }
  div_assign(rhs: number | Vec2) {
    if (typeof rhs === 'number') {
      this.x /= rhs;
      this.y /= rhs;
    } else {
      this.x /= rhs.x;
      this.y /= rhs.y;
    }
    return this;
  }

  eq(rhs: Vec2) {
    return this.x === rhs.x && this.y === rhs.y;
  }

  min(rhs: Vec2) {
    return new Vec2(Math.min(this.x, rhs.x), Math.min(this.y, rhs.y));
  }

  max(rhs: Vec2) {
    return new Vec2(Math.max(this.x, rhs.x), Math.max(this.y, rhs.y));
  }

  ceil() {
    return new Vec2(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * Returns a vector mask containing the result of a `>=` comparison for each element of `self` and `rhs`.
   *
   * In other words this computes `[self.x >= rhs.x, self.y >= rhs.y, ..]` for all elements.
   */
  cmpge(rhs: Vec2) {
    return new BVec2(this.x >= rhs.x, this.y >= rhs.y);
  }

  /**
   * Returns a vector mask containing the result of a `<=` comparison for each element of `self` and `rhs`.
   * In other words this computes `[self.x <= rhs.x, self.y <= rhs.y, ..]` for all elements.
   */
  cmple(rhs: Vec2) {
    return new BVec2(this.x <= rhs.x, this.y <= rhs.y);
  }

  extend(z: number) {
    return new Vec3(this.x, this.y, z);
  }
}

// @ts-ignore
export const v2Type = Type.vector(Type.float32, ['x', 'y'], Vec2);
