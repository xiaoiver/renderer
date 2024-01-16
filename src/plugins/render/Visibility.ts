import { System } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  CalculateBounds,
  CheckVisibility,
  Last,
  PostUpdate,
  ResetViewVisibility,
  UpdateFrusta,
  VisibilityPropagate,
} from '../../systems';
import { TransformSystem } from '../Transform';

export namespace VisibilitySystems {
  /// Label for the [`calculate_bounds`] and `calculate_bounds_2d` systems,
  /// calculating and inserting an [`Aabb`] to relevant entities.
  export const CalculateBounds = System.group();
  /// Label for the [`apply_deferred`] call after [`VisibilitySystems::CalculateBounds`]
  export const CalculateBoundsFlush = System.group();
  /// Label for the [`update_frusta<OrthographicProjection>`] system.
  // UpdateOrthographicFrusta: System.group(),
  /// Label for the [`update_frusta<PerspectiveProjection>`] system.
  // UpdatePerspectiveFrusta: System.group(),
  /// Label for the [`update_frusta<Projection>`] system.
  export const UpdateProjectionFrusta = System.group();
  /// Label for the system propagating the [`InheritedVisibility`] in a
  /// [`hierarchy`](bevy_hierarchy).
  export const VisibilityPropagate = System.group();
  /// Label for the [`check_visibility`] system updating [`ViewVisibility`]
  /// of each entity and the [`VisibleEntities`] of each view.
  export const CheckVisibility = System.group();
}
VisibilitySystems.CalculateBounds.schedule((s) =>
  s
    .before(VisibilitySystems.CalculateBoundsFlush)
    .after(PostUpdate)
    .before(Last),
);
VisibilitySystems.CalculateBoundsFlush.schedule((s) =>
  s.before(VisibilitySystems.UpdateProjectionFrusta),
);
VisibilitySystems.UpdateProjectionFrusta.schedule((s) =>
  s.before(VisibilitySystems.VisibilityPropagate),
);
VisibilitySystems.VisibilityPropagate.schedule((s) =>
  s.before(VisibilitySystems.CheckVisibility),
);
// VisibilitySystems.CheckVisibility.schedule((s) =>
//   s.after(TransformSystems.TransformPropagate),
// );

export class VisibilityPlugin implements Plugin {
  async build(app: App) {
    app.add_systems(VisibilitySystems.CalculateBounds, CalculateBounds);
    app.add_systems(
      VisibilitySystems.CalculateBoundsFlush,
      class CalculateBoundsFlushPlaceHolder extends System {},
    );
    app.add_systems(VisibilitySystems.UpdateProjectionFrusta, UpdateFrusta);
    app.add_systems(
      VisibilitySystems.VisibilityPropagate,
      VisibilityPropagate,
      ResetViewVisibility,
    );
    app.add_systems(VisibilitySystems.CheckVisibility, CheckVisibility);
  }
}
