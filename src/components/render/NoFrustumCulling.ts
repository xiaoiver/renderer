/**
 * Use this component to opt-out of built-in frustum culling for entities, see
 *
 * It can be used for example:
 * - when a [`Mesh`] is updated but its [`Aabb`] is not, which might happen with animations,
 * - when using some light effects, like wanting a [`Mesh`] out of the [`Frustum`] to appear in the reflection of a [`Mesh`] within.
 */
export class NoFrustumCulling {}
