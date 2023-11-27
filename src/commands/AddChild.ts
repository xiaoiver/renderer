/**
 * Command that adds a child to an entity.
 * @see https://github.com/bevyengine/bevy/blob/main/crates/bevy_hierarchy/src/child_builder.rs#L171
 */
export class AddChild {
  constructor(public parent: number, public child: number) {}

  apply() {}
}
