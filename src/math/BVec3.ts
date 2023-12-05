/**
 * A 3-dimensional `bool` vector mask.
 */
export class BVec3 {
  /**
   * All false.
   */
  static FALSE = BVec3.splat(false);

  /**
   * All true.
   */
  static TRUE = BVec3.splat(true);

  static splat(v: boolean) {
    return new BVec3(v, v, v);
  }

  constructor(public x: boolean, public y: boolean, public z: boolean) {}

  /**
   * Returns true if any of the elements are true, false otherwise.
   */
  any() {
    return this.x || this.y || this.z;
  }

  /**
   * Returns true if all the elements are true, false otherwise.
   */
  all() {
    return this.x && this.y && this.z;
  }

  bitand(rhs: BVec3) {
    return new BVec3(this.x && rhs.x, this.y && rhs.y, this.z && rhs.z);
  }

  bitand_assign(rhs: BVec3) {
    this.x &&= rhs.x;
    this.y &&= rhs.y;
    this.z &&= rhs.z;
    return this;
  }

  bitor(rhs: BVec3) {
    return new BVec3(this.x || rhs.x, this.y || rhs.y, this.z || rhs.z);
  }

  bitor_assign(rhs: BVec3) {
    this.x ||= rhs.x;
    this.y ||= rhs.y;
    this.z ||= rhs.z;
    return this;
  }
}
