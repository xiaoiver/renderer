import { Type } from '@lastolivegames/becsy';

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
  }
}

// @ts-ignore
export const v2Type = Type.vector(Type.float64, ['x', 'y'], Vec2);
