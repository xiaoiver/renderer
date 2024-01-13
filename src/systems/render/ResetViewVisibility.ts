import { System } from '@lastolivegames/becsy';
import { ViewVisibility } from '../../components';

/**
 * reset_view_visibility
 *
 * Resets the view visibility of every entity.
 * Entities that are visible will be marked as such later this frame
 * by a [`VisibilitySystems::CheckVisibility`] system.
 */
export class ResetViewVisibility extends System {
  q = this.query((q) => q.current.with(ViewVisibility));

  constructor() {
    super();
    this.query((q) => q.using(ViewVisibility).write);
  }

  execute(): void {
    this.q.current.forEach((entity) => {
      const view_visibility = entity.write(ViewVisibility);
      view_visibility.visible = ViewVisibility.HIDDEN.visible;
    });
  }
}
