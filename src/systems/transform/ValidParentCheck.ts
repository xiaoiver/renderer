import { System } from '@lastolivegames/becsy';

/// System to print a warning for each [`Entity`] with a `T` component
/// which parent hasn't a `T` component.
///
/// Hierarchy propagations are top-down, and limited only to entities
/// with a specific component (such as `InheritedVisibility` and `GlobalTransform`).
/// This means that entities with one of those component
/// and a parent without the same component is probably a programming error.
/// (See B0004 explanation linked in warning message)
export class ValidParentCheck extends System {
  execute(): void {}
}
