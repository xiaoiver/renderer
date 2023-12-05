import { Vec2 } from './Vec2';

/// A rectangle defined by two opposite corners.
///
/// The rectangle is axis aligned, and defined by its minimum and maximum coordinates,
/// stored in `Rect::min` and `Rect::max`, respectively. The minimum/maximum invariant
/// must be upheld by the user when directly assigning the fields, otherwise some methods
/// produce invalid results. It is generally recommended to use one of the constructor
/// methods instead, which will ensure this invariant is met, unless you already have
/// the minimum and maximum corners.
export class Rect {
  /**
   * Create a new rectangle from two corner points.
   *
   * The two points do not need to be the minimum and/or maximum corners.
   * They only need to be two opposite corners.
   */
  static from_corners(p0: Vec2, p1: Vec2) {
    const min = p0.min(p1);
    const max = p0.max(p1);
    return new Rect(min.x, min.y, max.x, max.y);
  }

  /**
   * Create a new rectangle from its center and size.
   *
   * @example
   * const r = Rect.from_center_size(Vec2.ZERO, Vec2.ONE);
   */
  static from_center_size(origin: Vec2, size: Vec2) {
    const half_size = size.mul(0.5);
    return Rect.from_center_half_size(origin, half_size);
  }

  /**
   * Create a new rectangle from its center and half-size.
   */
  static from_center_half_size(origin: Vec2, half_size: Vec2) {
    return Rect.from_corners(origin.sub(half_size), origin.add(half_size));
  }

  /**
   * The minimum corner point of the rect.
   */
  min: Vec2;

  /**
   * The maximum corner point of the rect.
   */
  max: Vec2;

  constructor(x0: number, y0: number, x1: number, y1: number) {
    this.min = new Vec2(x0, y0);
    this.max = new Vec2(x1, y1);
  }

  /**
   * Check if the rectangle is empty.
   *
   * @example
   * const r = Rect.from_corners(Vec2.ZERO, Vec2.new(0., 1.)); // w=0 h=1
   * assert!(r.is_empty());
   */
  is_empty() {
    return this.min.cmpge(this.max).any();
  }

  /**
   * Rectangle width (max.x - min.x).
   */
  width() {
    return this.max.x - this.min.x;
  }

  /**
   * Rectangle height (max.y - min.y).
   */
  height() {
    return this.max.y - this.min.y;
  }

  /**
   * Rectangle size.
   */
  size() {
    return this.max.sub(this.min);
  }

  /**
   * Rectangle half-size.
   */
  half_size() {
    return this.size().mul(0.5);
  }

  /**
   * The center point of the rectangle.
   */
  center() {
    return this.min.add(this.max).mul(0.5);
  }

  /**
   * Check if a point lies within this rectangle, inclusive of its edges.
   */
  contains(point: Vec2) {
    return point.cmpge(this.min).bitand_assign(point.cmple(this.max)).all();
  }

  /**
   * Build a new rectangle formed of the union of this rectangle and another rectangle.
   * The union is the smallest rectangle enclosing both rectangles.
   *
   * @example
   * const r1 = new Rect(0., 0., 5., 1.); // w=5 h=1
   * const r2 = new Rect(1., -1., 3., 3.); // w=2 h=4
   * const r = r1.union(r2);
   */
  union(other: Rect) {
    return Rect.from_corners(this.min.min(other.min), this.max.max(other.max));
  }

  /**
   * Build a new rectangle formed of the union of this rectangle and a point.
   *
   * The union is the smallest rectangle enclosing both the rectangle and the point. If the
   * point is already inside the rectangle, this method returns a copy of the rectangle.
   *
   * @example
   * const r = new Rect(0., 0., 5., 1.); // w=5 h=1
   * const u = r.union_point(new Vec2(3., 6.));
   */
  union_point(other: Vec2) {
    return Rect.from_corners(this.min.min(other), this.max.max(other));
  }

  /**
   * Build a new rectangle formed of the intersection of this rectangle and another rectangle.
   *
   * The intersection is the largest rectangle enclosed in both rectangles. If the intersection
   * is empty, this method returns an empty rectangle ([`Rect::is_empty()`] returns `true`), but
   * the actual values of [`Rect::min`] and [`Rect::max`] are implementation-dependent.
   */
  intersection(other: Rect) {
    const r = Rect.from_corners(
      this.min.max(other.min),
      this.max.min(other.max),
    );

    // Collapse min over max to enforce invariants and ensure e.g. width() or height() never return a negative value.
    r.min = r.min.min(r.max);
    return r;
  }

  /**
   * Create a new rectangle with a constant inset.
   *
   * The inset is the extra border on all sides. A positive inset produces a larger rectangle,
   * while a negative inset is allowed and produces a smaller rectangle. If the inset is negative
   * and its absolute value is larger than the rectangle half-size, the created rectangle is empty.
   */
  inset(inset: number) {
    const r = Rect.from_corners(this.min.sub(inset), this.max.add(inset));

    // Collapse min over max to enforce invariants and ensure e.g. width() or height() never return a negative value.
    r.min = r.min.min(r.max);
    return r;
  }

  /**
   * Build a new rectangle from this one with its coordinates expressed
   * relative to `other` in a normalized ([0..1] x [0..1]) coordinate system.
   */
  normalize(other: Rect) {
    const outer_size = other.size();
    return Rect.from_corners(
      this.min.sub(other.min).div_assign(outer_size),
      this.max.sub(other.min).div_assign(outer_size),
    );
  }
}
