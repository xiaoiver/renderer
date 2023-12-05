import { Type } from '@lastolivegames/becsy';
import { Vec2 } from './Vec2';

export class Mat2 {
  x_axis: Vec2;
  y_axis: Vec2;

  /**
   * A 2x2 matrix with all elements set to `0.0`.
   */
  static ZERO = Mat2.from_cols(Vec2.ZERO, Vec2.ZERO);

  /**
   * A 2x2 identity matrix, where all diagonal elements are `1`, and all off-diagonal elements are `0`.
   */
  static IDENTITY = Mat2.from_cols(Vec2.X, Vec2.Y);

  static from_cols(x_axis: Vec2, y_axis: Vec2) {
    return new Mat2(x_axis.x, x_axis.y, y_axis.x, y_axis.y);
  }

  constructor(m00: number, m01: number, m10: number, m11: number) {
    this.x_axis = new Vec2(m00, m01);
    this.y_axis = new Vec2(m10, m11);
  }

  /**
   * Multiplies a 2x2 matrix by a scalar.
   */
  mul_scalar(rhs: number) {
    return Mat2.from_cols(this.x_axis.mul(rhs), this.y_axis.mul(rhs));
  }

  /**
   * Transforms a 2D vector.
   */
  mul_vec2(rhs: Vec2) {
    return new Vec2(
      this.x_axis.x * rhs.x + this.y_axis.x * rhs.y,
      this.x_axis.y * rhs.x + this.y_axis.y * rhs.y,
    );
  }

  /**
   * Multiplies two 2x2 matrices.
   */
  mul_mat2(rhs: Mat2) {
    return Mat2.from_cols(this.mul_vec2(rhs.x_axis), this.mul_vec2(rhs.y_axis));
  }

  mul(rhs: number | Vec2 | Mat2) {
    if (typeof rhs === 'number') {
      return this.mul_scalar(rhs);
    } else if (rhs instanceof Vec2) {
      return this.mul_vec2(rhs);
    } else {
      return Mat2.from_cols(this.mul(rhs.x_axis), this.mul(rhs.y_axis));
    }
  }
}

export const m2Type = Type.vector(
  Type.float32,
  ['m00', 'm01', 'm10', 'm11'],
  // @ts-ignore
  Mat2,
);
