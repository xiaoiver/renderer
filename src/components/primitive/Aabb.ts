import { field } from '@lastolivegames/becsy';
import { Mat3, Vec3, v3Type } from '../../math';
import { Sphere } from './Sphere';

/**
 * An axis-aligned bounding box, defined by:
 * - a center,
 * - the distances from the center to each faces along the axis,
 * the faces are orthogonal to the axis.
 *
 * It is typically used as a component on an entity to represent the local space
 * occupied by this entity, with faces orthogonal to its local axis.
 *
 * This component is notably used during "frustum culling", a process to determine
 * if an entity should be rendered by a [`Camera`] if its bounding box intersects
 * with the camera's [`Frustum`].
 *
 * It will be added automatically by the systems in [`CalculateBounds`] to entities that:
 * - could be subject to frustum culling, for example with a [`Handle<Mesh>`]
 * or `Sprite` component,
 * - don't have the [`NoFrustumCulling`] component.
 *
 * It won't be updated automatically if the space occupied by the entity changes,
 * for example if the vertex positions of a [`Mesh`] inside a `Handle<Mesh>` are
 * updated.
 */
export class Aabb {
  @field(v3Type) declare center: Vec3;

  @field(v3Type) declare half_extents: Vec3;

  constructor(center: Vec3 = Vec3.ZERO, half_extents: Vec3 = Vec3.ZERO) {
    this.center = center;
    this.half_extents = half_extents;
  }

  static from(sphere: Sphere) {
    return new Aabb(sphere.center, Vec3.splat(sphere.radius));
  }

  static from_min_max(minimum: Vec3, maximum: Vec3) {
    const center = maximum.add(minimum).mul(0.5);
    const half_extents = maximum.sub(minimum).mul(0.5);
    return new Aabb(center, half_extents);
  }

  /**
   * Returns a bounding box enclosing the specified set of points.
   *
   * @example
   * ```ts
   * const bb = Aabb.enclosing([Vec3.X, Vec3.Z * 2.0, Vec3.Y * -0.5]);
   * assert_eq!(bb.min(), new Vec3(0.0, -0.5, 0.0));
   * assert_eq!(bb.max(), new Vec3(1.0, 0.0, 2.0));
   * ```
   */
  static enclosing(positions: [number, number, number][]) {
    let min = Vec3.MAX;
    let max = Vec3.MIN;
    positions.forEach((p) => {
      min = min.min(Vec3.from_array(p));
      max = max.max(Vec3.from_array(p));
    });
    return Aabb.from_min_max(min, max);
  }

  /**
   * Calculate the relative radius of the AABB with respect to a plane
   */
  relative_radius(p_normal: Vec3, model: Mat3) {
    let half_extents = this.half_extents;
    return new Vec3(
      p_normal.dot(model.x_axis),
      p_normal.dot(model.y_axis),
      p_normal.dot(model.z_axis),
    )
      .abs()
      .dot(half_extents);
  }
}
