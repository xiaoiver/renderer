import { field } from '@lastolivegames/becsy';
import { Bundle } from '../Bundle';

/// User indication of whether an entity is visible. Propagates down the entity hierarchy.
///
/// If an entity is hidden in this way, all [`Children`] (and all of their children and so on) who
/// are set to [`Inherited`](Self::Inherited) will also be hidden.
///
/// This is done by the `visibility_propagate_system` which uses the entity hierarchy and
/// `Visibility` to set the values of each entity's [`InheritedVisibility`] component.
export class Visibility {
  @field.uint8 declare mode: VisibilityMode;

  constructor(mode: VisibilityMode = VisibilityMode.Inherited) {
    this.mode = mode;
  }
}

export enum VisibilityMode {
  /**
   * An entity with `Visibility::Inherited` will inherit the Visibility of its [`Parent`].
   * A root-level entity that is set to `Inherited` will be visible.
   */
  Inherited,

  /**
   * An entity with `Visibility::Hidden` will be unconditionally hidden.
   */
  Hidden,

  /**
   * An entity with `Visibility::Visible` will be unconditionally visible.
   * Note that an entity with `Visibility::Visible` will be visible regardless of whether the [`Parent`] entity is hidden.
   */
  Visible,
}

/// Whether or not an entity is visible in the hierarchy.
/// This will not be accurate until [`VisibilityPropagate`] runs in the [`PostUpdate`] schedule.
///
/// If this is false, then [`ViewVisibility`] should also be false.
///
/// [`VisibilityPropagate`]: VisibilitySystems::VisibilityPropagate
export class InheritedVisibility {
  /**
   * An entity that is invisible in the hierarchy.
   */
  static HIDDEN = new InheritedVisibility(false);

  /**
   * An entity that is visible in the hierarchy.
   */
  static VISIBLE = new InheritedVisibility(true);

  /**
   * Returns `true` if the entity is visible in the hierarchy.
   */
  @field.boolean declare visible: boolean;

  constructor(visible: boolean = true) {
    this.visible = visible;
  }
}

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

/// A [`Bundle`] of the [`Visibility`], [`InheritedVisibility`], and [`ViewVisibility`]
/// [`Component`]s, which describe the visibility of an entity.
///
/// * To show or hide an entity, you should set its [`Visibility`].
/// * To get the inherited visibility of an entity, you should get its [`InheritedVisibility`].
/// * For visibility hierarchies to work correctly, you must have both all of [`Visibility`], [`InheritedVisibility`], and [`ViewVisibility`].
///   * You may use the [`VisibilityBundle`] to guarantee this.
export class VisibilityBundle extends Bundle {
  /// The visibility of the entity.
  visibility: Visibility;
  // The inherited visibility of the entity.
  inherited_visibility: InheritedVisibility;
  // The computed visibility of the entity.
  view_visibility: ViewVisibility;

  constructor(
    options?: Partial<{
      visibility: Visibility;
      inherited_visibility: InheritedVisibility;
      view_visibility: ViewVisibility;
    }>,
  ) {
    super();

    const {
      visibility = new Visibility(),
      inherited_visibility = new InheritedVisibility(),
      view_visibility = new ViewVisibility(),
    } = options || {};

    this.visibility = visibility;
    this.inherited_visibility = inherited_visibility;
    this.view_visibility = view_visibility;
  }
}
