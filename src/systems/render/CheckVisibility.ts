import { System } from '@lastolivegames/becsy';
import {
  Camera,
  Frustum,
  GlobalTransform,
  InheritedVisibility,
  RenderLayers,
  ViewVisibility,
  VisibleEntities,
} from '../../components';

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
    this.query((q) => q.using(VisibleEntities).write);
  }

  execute(): void {
    this.view_query.current.forEach((entity) => {
      const visible_entities = entity.write(VisibleEntities);
      const frustum = entity.read(Frustum);
      const maybe_view_mask = entity.read(RenderLayers);
      const camera = entity.read(Camera);

      if (!camera.is_active) {
        return;
      }

      const view_mask = maybe_view_mask;
      visible_entities.entities = [];

      this.visible_aabb_query.current.forEach((entity) => {});
    });
  }
}
