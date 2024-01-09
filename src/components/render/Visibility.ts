import { Entity, field } from '@lastolivegames/becsy';

/// User indication of whether an entity is visible. Propagates down the entity hierarchy.
///
/// If an entity is hidden in this way, all [`Children`] (and all of their children and so on) who
/// are set to [`Inherited`](Self::Inherited) will also be hidden.
///
/// This is done by the `visibility_propagate_system` which uses the entity hierarchy and
/// `Visibility` to set the values of each entity's [`InheritedVisibility`] component.
export class Visibility {}

/**
 * Algorithmically-computed indication or whether an entity is visible and should be extracted for rendering.
 *
 * Each frame, this will be reset to `false` during [`VisibilityPropagate`] systems in [`PostUpdate`].
 * Later in the frame, systems in [`CheckVisibility`] will mark any visible entities using [`ViewVisibility::set`].
 * Because of this, values of this type will be marked as changed every frame, even when they do not change.
 *
 * If you wish to add custom visibility system that sets this value, make sure you add it to the [`CheckVisibility`] set.
 *
 * [`VisibilityPropagate`]: VisibilitySystems::VisibilityPropagate
 * [`CheckVisibility`]: VisibilitySystems::CheckVisibility
 */
export class ViewVisibility {
  /**
   * An entity that cannot be seen from any views.
   */
  static HIDDEN = new ViewVisibility(false);

  /**
   * Sets the visibility to `true`.
   * This should not be considered reversible for a given frame,
   * as this component tracks whether or not the entity visible in _any_ view.
   *
   * This will be automatically reset to `false` every frame in [`VisibilityPropagate`] and then set
   * to the proper value in [`CheckVisibility`].
   *
   * You should only manually set this if you are defining a custom visibility system,
   * in which case the system should be placed in the [`CheckVisibility`] set.
   * For normal user-defined entity visibility, see [`Visibility`].
   */
  @field.boolean declare visible: boolean;

  constructor(visible: boolean = true) {
    this.visible = visible;
  }
}
