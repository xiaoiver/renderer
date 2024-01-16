import { Entity, System, system } from '@lastolivegames/becsy';
import {
  Aabb,
  Cascades,
  CascadesFrusta,
  CascadesVisibleEntities,
  DirectionalLight,
  Frustum,
  GlobalTransform,
  InheritedVisibility,
  RenderLayers,
  ViewVisibility,
  VisibleEntities,
} from '../../components';

/**
 * check_light_mesh_visibility
 */
@system((s) => s.afterWritersOf(ViewVisibility))
export class CheckLightMeshVisibility extends System {
  directional_lights = this.query((q) =>
    q.current.with(
      DirectionalLight,
      CascadesFrusta,
      CascadesVisibleEntities,
      ViewVisibility,
    ),
  );

  visible_entity_query = this.query((q) =>
    q.current
      .with(InheritedVisibility, ViewVisibility)
      .without(DirectionalLight),
  );
  // (Without<NotShadowCaster>, Without<DirectionalLight>),

  constructor() {
    super();
    this.query((q) => q.using(RenderLayers, Aabb, GlobalTransform).read);
    this.query((q) => q.using(ViewVisibility).write);
  }

  execute(): void {
    this.directional_lights.current.forEach((entity) => {
      const directional_light = entity.read(DirectionalLight);
      const frusta = entity.read(CascadesFrusta);
      const visible_entities = entity.read(CascadesVisibleEntities);
      const light_view_visibility = entity.read(ViewVisibility);

      // Re-use already allocated entries where possible.
      const views_to_remove = [];
      visible_entities.entities.forEach((cascade_view_entities, view) => {
        const view_frusta = frusta.frusta.get(view);

        if (view_frusta) {
          cascade_view_entities.length = view_frusta.length;
          cascade_view_entities.forEach((x) => (x.entities = []));
        } else {
          views_to_remove.push(view);
        }
      });
      frusta.frusta.forEach((frusta, view) => {
        if (!visible_entities.entities.has(view)) {
          visible_entities.entities.set(
            view,
            new Array(frusta.length).fill(new VisibleEntities()),
          );
        }
      });
      views_to_remove.forEach((v) => visible_entities.entities.delete(v));

      // NOTE: If shadow mapping is disabled for the light then it must have no visible entities
      if (
        !directional_light.shadows_enabled ||
        !light_view_visibility.visible
      ) {
        return;
      }

      let view_mask: RenderLayers;
      if (entity.has(RenderLayers)) {
        view_mask = entity.read(RenderLayers);
      }

      this.visible_entity_query.current.forEach((entity) => {
        const inherited_visibility = entity.read(InheritedVisibility);

        if (!inherited_visibility.visible) {
          return;
        }

        let entity_mask: RenderLayers;
        if (view_mask && entity.has(RenderLayers)) {
          entity_mask = entity.read(RenderLayers);
          if (!view_mask.intersects(entity_mask)) {
            return;
          }
        }

        let maybe_aabb: Aabb;
        if (entity.has(Aabb)) {
          maybe_aabb = entity.read(Aabb);
        }
        let maybe_transform: GlobalTransform;
        if (entity.has(GlobalTransform)) {
          maybe_transform = GlobalTransform.copy(entity.read(GlobalTransform));
        }
        const view_visibility = entity.write(ViewVisibility);
        if (maybe_aabb && maybe_transform) {
          frusta.frusta.forEach((view_frusta, view) => {
            const view_visible_entities = visible_entities.entities.get(view);

            view_frusta.forEach((frustum, i) => {
              const frustum_visible_entities = view_visible_entities[i];
              // Disable near-plane culling, as a shadow caster could lie before the near plane.
              if (
                !frustum.intersects_obb(
                  maybe_aabb,
                  maybe_transform.affine(),
                  false,
                  true,
                )
              ) {
                return;
              }

              view_visibility.visible = true;
              frustum_visible_entities.entities.push(entity);
            });
          });
        } else {
          view_visibility.visible = true;
          frusta.frusta.forEach((_, view) => {
            const view_visible_entities = visible_entities.entities.get(view);
            for (const frustum_visible_entities of view_visible_entities) {
              frustum_visible_entities.entities.push(entity);
            }
          });
        }
      });

      // visible_entities.entities.forEach((cascade_view_entities) => {
      //   cascade_view_entities.forEach(shrink_entities);
      // });
    });
  }
}
