import { system, Entity, System } from '@lastolivegames/becsy';
import {
  AppConfig,
  Camera,
  Cascade,
  CascadeShadowConfig,
  Cascades,
  DirectionalLight,
  DirectionalLightShadowMap,
  GlobalTransform,
  Orthographic,
  Perspective,
} from '../../components';
import { Mat4, Vec3, Vec4 } from '../../math';
import { ClearDirectionalLightCascades } from './ClearDirectionalLightCascades';

/**
 * build_directional_light_cascades
 */
@system((s) => s.after(ClearDirectionalLightCascades))
export class BuildDirectionalLightCascades extends System {
  private appConfig = this.singleton.read(AppConfig);

  views = this.query((q) => q.with(Camera, GlobalTransform).current);

  lights = this.query(
    (q) =>
      q.with(DirectionalLight, Cascades, CascadeShadowConfig, GlobalTransform)
        .current,
  );

  constructor() {
    super();
    this.query((q) => q.using(Perspective, Orthographic).read);
    this.query((q) => q.using(Cascades).read);
  }

  execute(): void {
    const directional_light_shadow_map = this.appConfig.resources.get(
      DirectionalLightShadowMap,
    ) as DirectionalLightShadowMap;

    const views: [Entity, Orthographic | Perspective, Mat4][] =
      this.views.current.map((entity) => {
        const camera = entity.read(Camera);
        const transform = entity.read(GlobalTransform);
        let projection: Orthographic | Perspective;
        if (entity.has(Orthographic)) {
          projection = entity.read(Orthographic);
        } else if (entity.has(Perspective)) {
          projection = entity.read(Perspective);
        }
        if (camera.is_active) {
          return [entity, projection, Mat4.copy(transform.compute_matrix())];
        }
        return [undefined, undefined, undefined];
      });

    this.lights.current.forEach((entity) => {
      const directional_light = entity.read(DirectionalLight);
      if (!directional_light.shadows_enabled) {
        return;
      }

      const transform = GlobalTransform.copy(entity.read(GlobalTransform));

      // It is very important to the numerical and thus visual stability of shadows that
      // light_to_world has orthogonal upper-left 3x3 and zero translation.
      // Even though only the direction (i.e. rotation) of the light matters, we don't constrain
      // users to not change any other aspects of the transform - there's no guarantee
      // `transform.compute_matrix()` will give us a matrix with our desired properties.
      // Instead, we directly create a good matrix from just the rotation.
      const light_to_world = Mat4.from_quat(
        transform.compute_transform().rotation,
      );
      const light_to_world_inverse = light_to_world.inverse();

      views.forEach(([view_entity, projection, view_to_world]) => {
        const camera_to_light_view = light_to_world_inverse.mul(view_to_world);
        const cascades_config = entity.read(CascadeShadowConfig);
        const view_cascades = cascades_config.bounds.map((far_bound, idx) => {
          // Negate bounds as -z is camera forward direction.
          const z_near =
            idx > 0
              ? (1.0 - cascades_config.overlap_proportion) *
                -cascades_config.bounds[idx - 1]
              : -cascades_config.minimum_distance;
          const z_far = -far_bound;

          const corners = projection.get_frustum_corners(z_near, z_far);

          return calculate_cascade(
            corners,
            directional_light_shadow_map.size,
            light_to_world,
            camera_to_light_view,
          );
        });

        const cascades = entity.read(Cascades);
        cascades.cascades.set(view_entity, view_cascades);
      });
    });
  }
}

/// Returns a [`Cascade`] for the frustum defined by `frustum_corners`.
/// The corner vertices should be specified in the following order:
/// first the bottom right, top right, top left, bottom left for the near plane, then similar for the far plane.
function calculate_cascade(
  frustum_corners: Readonly<[Vec3, Vec3, Vec3, Vec3, Vec3, Vec3, Vec3, Vec3]>,
  cascade_texture_size: number,
  light_to_world: Mat4,
  camera_to_light: Mat4,
): Cascade {
  let min = Vec3.splat(Number.MAX_VALUE);
  let max = Vec3.splat(Number.MIN_VALUE);
  for (const corner_camera_view of frustum_corners) {
    const corner_light_view =
      camera_to_light.transform_point3(corner_camera_view);
    min = min.min(corner_light_view);
    max = max.max(corner_light_view);
  }

  // NOTE: Use the larger of the frustum slice far plane diagonal and body diagonal lengths as this
  //       will be the maximum possible projection size. Use the ceiling to get an integer which is
  //       very important for floating point stability later. It is also important that these are
  //       calculated using the original camera space corner positions for floating point precision
  //       as even though the lengths using corner_light_view above should be the same, precision can
  //       introduce small but significant differences.
  // NOTE: The size remains the same unless the view frustum or cascade configuration is modified.
  const cascade_diameter = Math.ceil(
    Math.max(
      frustum_corners[0].sub(frustum_corners[6])._length(),
      frustum_corners[4].sub(frustum_corners[6])._length(),
    ),
  );

  // NOTE: If we ensure that cascade_texture_size is a power of 2, then as we made cascade_diameter an
  //       integer, cascade_texel_size is then an integer multiple of a power of 2 and can be
  //       exactly represented in a floating point value.
  const cascade_texel_size = cascade_diameter / cascade_texture_size;
  // NOTE: For shadow stability it is very important that the near_plane_center is at integer
  //       multiples of the texel size to be exactly representable in a floating point value.
  const near_plane_center = new Vec3(
    Math.floor((0.5 * (min.x + max.x)) / cascade_texel_size) *
      cascade_texel_size,
    Math.floor((0.5 * (min.y + max.y)) / cascade_texel_size) *
      cascade_texel_size,
    // NOTE: max.z is the near plane for right-handed y-up
    max.z,
  );

  // It is critical for `world_to_cascade` to be stable. So rather than forming `cascade_to_world`
  // and inverting it, which risks instability due to numerical precision, we directly form
  // `world_to_cascde` as the reference material suggests.
  const light_to_world_transpose = light_to_world.transpose();
  const world_to_cascade = Mat4.from_cols(
    light_to_world_transpose.x_axis,
    light_to_world_transpose.y_axis,
    light_to_world_transpose.z_axis,
    near_plane_center.extend(1.0).neg(),
  );

  // Right-handed orthographic projection, centered at `near_plane_center`.
  // NOTE: This is different from the reference material, as we use reverse Z.
  const r = 1 / (max.z - min.z);
  const cascade_projection = Mat4.from_cols(
    new Vec4(2.0 / cascade_diameter, 0.0, 0.0, 0.0),
    new Vec4(0.0, 2.0 / cascade_diameter, 0.0, 0.0),
    new Vec4(0.0, 0.0, r, 0.0),
    new Vec4(0.0, 0.0, 1.0, 1.0),
  );

  const cascade_view_projection = cascade_projection.mul(world_to_cascade);
  return new Cascade({
    view_transform: world_to_cascade.inverse(),
    projection: cascade_projection,
    view_projection: cascade_view_projection,
    texel_size: cascade_texel_size,
  });
}
