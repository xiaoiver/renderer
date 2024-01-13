import { Entity, System } from '@lastolivegames/becsy';
import {
  Children,
  InheritedVisibility,
  Parent,
  Visibility,
  VisibilityMode,
} from '../../components';

/**
 * visibility_propagate_system
 */
export class VisibilityPropagate extends System {
  changed = this.query(
    (q) =>
      q.addedOrChanged.with(Visibility).withAny(Parent, Children).trackWrites,
  );

  visibility_query = this.query((q) =>
    q.current.with(Visibility, InheritedVisibility),
  );

  children_query = this.query((q) =>
    q.current.with(Children, Visibility, InheritedVisibility),
  );

  constructor() {
    super();
    this.query((q) => q.using(InheritedVisibility).write);
  }

  execute(): void {
    this.changed.addedOrChanged.forEach((entity) => {
      const visibility = entity.read(Visibility);
      const parent = entity.read(Parent);
      const children = entity.read(Children);

      let is_visible: boolean;
      if (visibility.mode === VisibilityMode.Visible) {
        is_visible = true;
      } else if (visibility.mode === VisibilityMode.Hidden) {
        is_visible = false;
      } else if (visibility.mode === VisibilityMode.Inherited) {
        // fall back to true if no parent is found or parent lacks components
        if (!children.parent || !children.parent.has(Visibility)) {
          is_visible = true;
        }
      }

      // Only update the visibility if it has changed.
      // This will also prevent the visibility from propagating multiple times in the same frame
      // if this entity's visibility has been updated recursively by its parent.
      const inherited_visibility = entity.write(InheritedVisibility);
      if (inherited_visibility.visible !== is_visible) {
        inherited_visibility.visible = is_visible;

        // Recursively update the visibility of each child.
        parent.children.forEach((child) => {
          this.propagate_recursive(is_visible, child);
        });
      }
    });
  }

  private propagate_recursive(parent_is_visible: boolean, entity: Entity) {
    const visibility = entity.read(Visibility);
    const inherited_visibility = entity.write(InheritedVisibility);

    let is_visible: boolean;
    if (visibility.mode === VisibilityMode.Visible) {
      is_visible = true;
    } else if (visibility.mode === VisibilityMode.Hidden) {
      is_visible = false;
    } else if (visibility.mode === VisibilityMode.Inherited) {
      is_visible = parent_is_visible;
    }

    // Only update the visibility if it has changed.
    if (inherited_visibility.visible !== is_visible) {
      inherited_visibility.visible = is_visible;

      const parent = entity.read(Parent);
      // Recursively update the visibility of each child.
      parent.children.forEach((child) => {
        this.propagate_recursive(is_visible, child);
      });
    }
  }
}
