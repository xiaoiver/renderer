import { System } from '@lastolivegames/becsy';
import { Children, GlobalTransform, Parent, Transform } from '../components';

/**
 * Update [`GlobalTransform`] component of entities that aren't in the hierarchy
 * Third party plugins should ensure that this is used in concert with [`propagate_transforms`].
 */
export class SyncSimpleTransforms extends System {
  queries = this.query((q) => q.addedOrChanged.with(Transform).trackWrites);

  constructor() {
    super();
    this.query((q) => q.using(GlobalTransform).write);
  }

  execute(): void {
    // Update changed entities.
    this.queries.addedOrChanged.forEach((entity) => {
      const transform = entity.read(Transform);

      if (!entity.has(GlobalTransform)) {
        entity.add(GlobalTransform, {});
      }

      const globalTransform = entity.write(GlobalTransform);
      globalTransform.from(transform);
    });
  }
}

/**
 * Update [`GlobalTransform`] component of entities based on entity hierarchy and [`Transform`] components.
 */
export class PropagateTransforms extends System {
  root_query = this.query((q) =>
    q.current.with(Children, Transform, GlobalTransform).without(Parent),
  );

  transform_query = this.query((q) =>
    q.current.with(Transform, GlobalTransform, Parent).withAny(Children),
  );
  parent_query = this.query((q) => q.with(Parent));

  execute(): void {
    this.root_query.current.forEach((entity) => {
      // const { parent } = entity.read(Children);
      // const r = parent.read(Parent);
      // this.parent_query
      // console.log(r, entity.__id, parent.__id);
    });
  }

  /**
   * Recursively propagates the transforms for `entity` and all of its descendants.
   */
  private propagate_recursive() {}
}
