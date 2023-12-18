import { field } from '@lastolivegames/becsy';
import { Affine3, Mat4, Vec3 } from '../../math';
import { Aabb } from './Aabb';
import { HalfSpace } from './HalfSpace';
import { Sphere } from './Sphere';

/**
 * A region of 3D space defined by the intersection of 6 [`HalfSpace`]s.
 *
 * Frustums are typically an apex-truncated square pyramid (a pyramid without the top) or a cuboid.
 *
 * Half spaces are ordered left, right, top, bottom, near, far. The normal vectors
 * of the half-spaces point towards the interior of the frustum.
 *
 * A frustum component is used on an entity with a [`Camera`] component to
 * determine which entities will be considered for rendering by this camera.
 * All entities with an [`Aabb`] component that are not contained by (or crossing
 * the boundary of) the frustum will not be rendered, and not be used in rendering computations.
 *
 * This process is called frustum culling, and entities can opt out of it using
 * the [`NoFrustumCulling`] component.
 *
 * The frustum component is typically added from a bundle, either the `Camera2dBundle`
 * or the `Camera3dBundle`.
 * It is usually updated automatically by [`update_frusta`] from the
 * [`CameraProjection`] component and [`GlobalTransform`] of the camera entity.
 */
export class Frustum {
  @field.object declare half_spaces: [
    HalfSpace,
    HalfSpace,
    HalfSpace,
    HalfSpace,
    HalfSpace,
    HalfSpace,
  ];

  constructor(
    half_spaces?: [
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
    ],
  ) {
    this.half_spaces = half_spaces || [
      new HalfSpace(),
      new HalfSpace(),
      new HalfSpace(),
      new HalfSpace(),
      new HalfSpace(),
      new HalfSpace(),
    ];
  }

  /**
   * Returns a frustum derived from `view_projection`.
   */
  static from_view_projection(view_projection: Mat4) {
    const frustum = this.from_view_projection_no_far(view_projection);
    frustum.half_spaces[5] = new HalfSpace(view_projection.row(2));
    return frustum;
  }

  /**
   * Returns a frustum derived from `view_projection`, but with a custom far plane.
   */
  static from_view_projection_custom_far(
    view_projection: Mat4,
    view_translation: Vec3,
    view_backward: Vec3,
    far: number,
  ) {
    const frustum = this.from_view_projection_no_far(view_projection);
    const far_center = view_translation.sub(view_backward.mul(far));
    frustum.half_spaces[5] = new HalfSpace(
      view_backward.extend(-view_backward.dot(far_center)),
    );
    return frustum;
  }

  /**
   * This approach of extracting the frustum half-space from the view
   * projection matrix is from Foundations of Game Engine Development 2
   * Rendering by Lengyel.
   * Returns a frustum derived from `view_projection`, without a far plane.
   */
  static from_view_projection_no_far(view_projection: Mat4) {
    const row3 = view_projection.row(3);
    const half_spaces = new Array<HalfSpace>(6).fill(new HalfSpace()) as [
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
      HalfSpace,
    ];
    for (let i = 0; i < 5; i++) {
      let row = view_projection.row(i / 2);
      half_spaces[i] = new HalfSpace(
        (i & 1) == 0 && i != 4 ? row3.add(row) : row3.sub(row),
      );
    }
    return new Frustum(half_spaces);
  }

  /**
   * Checks if a sphere intersects the frustum.
   */
  intersects_sphere(sphere: Sphere, intersect_far: boolean) {
    let sphere_center = sphere.center.extend(1.0);
    let max = intersect_far ? 6 : 5;
    for (const half_space of this.half_spaces.slice(0, max)) {
      if (half_space.normal_d.dot(sphere_center) + sphere.radius <= 0.0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if an Oriented Bounding Box (obb) intersects the frustum.
   */
  intersects_obb(
    aabb: Aabb,
    model_to_world: Affine3,
    intersect_near: boolean,
    intersect_far: boolean,
  ) {
    const aabb_center_world = model_to_world
      .transform_point3(aabb.center)
      .extend(1.0);
    for (let idx = 0; idx < this.half_spaces.length; idx++) {
      const half_space = this.half_spaces[idx];
      if (idx == 4 && !intersect_near) {
        continue;
      }
      if (idx == 5 && !intersect_far) {
        continue;
      }
      const p_normal = half_space.normal();
      const relative_radius = aabb.relative_radius(
        p_normal,
        model_to_world.matrix3,
      );
      if (half_space.normal_d.dot(aabb_center_world) + relative_radius <= 0.0) {
        return false;
      }
    }
    return true;
  }
}
