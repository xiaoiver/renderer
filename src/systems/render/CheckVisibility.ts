import { System } from '@lastolivegames/becsy';
import {
  Aabb,
  Camera,
  Frustum,
  GlobalTransform,
  InheritedVisibility,
  NoFrustumCulling,
  RenderLayers,
  ViewVisibility,
  VisibleEntities,
} from '../../components';
import { Sphere } from '../../components/primitive/Sphere';

/**
 * System updating the visibility of entities each frame.
 *
 * The system is part of the [`VisibilitySystems::CheckVisibility`] set.
 * Each frame, it updates the [`ViewVisibility`] of all entities,
 * and for each view also compute the [`VisibleEntities`] for that view.
 */
export class CheckVisibility extends System {
  view_query = this.query((q) =>
    q.current.with(VisibleEntities, Frustum, Camera),
  );

  visible_aabb_query = this.query((q) =>
    q.current.with(InheritedVisibility, ViewVisibility, GlobalTransform),
  );

  constructor() {
    super();
    this.query((q) => q.using(VisibleEntities, ViewVisibility).write);
    this.query((q) => q.using(RenderLayers, NoFrustumCulling, Aabb).read);
  }

  execute(): void {
    this.view_query.current.forEach((entity) => {
      const visible_entities = entity.write(VisibleEntities);
      const frustum = entity.read(Frustum);
      const camera = entity.read(Camera);

      if (!camera.is_active) {
        return;
      }

      let maybe_view_mask: RenderLayers;
      if (entity.has(RenderLayers)) {
        maybe_view_mask = entity.read(RenderLayers);
      }

      visible_entities.entities = [];

      this.visible_aabb_query.current.forEach((entity) => {
        const inherited_visibility = entity.read(InheritedVisibility);
        const view_visibility = entity.write(ViewVisibility);
        const transform = GlobalTransform.copy(entity.read(GlobalTransform));

        // Skip computing visibility for entities that are configured to be hidden.
        // ViewVisibility has already been reset in `reset_view_visibility`.
        if (!inherited_visibility.visible) {
          return;
        }

        if (entity.has(RenderLayers)) {
          const view_mask = maybe_view_mask;
          const maybe_entity_mask = entity.read(RenderLayers);
          if (!view_mask.intersects(maybe_entity_mask)) {
            return;
          }
        }

        const no_frustum_culling = entity.has(NoFrustumCulling);
        // If we have an aabb, do frustum culling
        if (!no_frustum_culling) {
          if (entity.has(Aabb)) {
            const model_aabb = entity.read(Aabb);
            const model = transform.affine();

            const model_sphere = new Sphere(
              model.transform_point3(model_aabb.center),
              transform.radius_vec3(model_aabb.half_extents),
            );

            // Do quick sphere-based frustum culling
            if (!frustum.intersects_sphere(model_sphere, false)) {
              return;
            }
            // Do aabb-based frustum culling
            if (!frustum.intersects_obb(model_aabb, model, true, false)) {
              return;
            }
          }
        }

        view_visibility.visible = true;
        visible_entities.entities.push(entity);
      });
    });
  }
}
