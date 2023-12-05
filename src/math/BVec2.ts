/**
 * A 2-dimensional `bool` vector mask.
 */
export class BVec2 {
  /**
   * All false.
   */
  static FALSE = BVec2.splat(false);

  /**
   * All true.
   */
  static TRUE = BVec2.splat(true);

  static splat(v: boolean) {
    return new BVec2(v, v);
  }

  constructor(public x: boolean, public y: boolean) {}

  /**
   * Returns true if any of the elements are true, false otherwise.
   */
  any() {
    return this.x || this.y;
  }

  /**
   * Returns true if all the elements are true, false otherwise.
   */
  all() {
    return this.x && this.y;
  }

  bitand(rhs: BVec2) {
    return new BVec2(this.x && rhs.x, this.y && rhs.y);
  }

  bitand_assign(rhs: BVec2) {
    this.x &&= rhs.x;
    this.y &&= rhs.y;
    return this;
  }

  bitor(rhs: BVec2) {
    return new BVec2(this.x || rhs.x, this.y || rhs.y);
  }

  bitor_assign(rhs: BVec2) {
    this.x ||= rhs.x;
    this.y ||= rhs.y;
    return this;
  }
}
