import { Entity, field } from '@lastolivegames/becsy';
/**
 * Collection of entities visible from the current view.
 *
 * This component contains all entities which are visible from the currently
 * rendered view. The collection is updated automatically by the [`VisibilitySystems::CheckVisibility`]
 * system set, and renderers can use it to optimize rendering of a particular view, to
 * prevent drawing items not visible from that view.
 *
 * This component is intended to be attached to the same entity as the [`Camera`] and
 * the [`Frustum`] defining the view.
 */
export class VisibleEntities {
  @field.object declare entities: Entity[];
}
