import { Affine3, Mat4 } from '../../math';
import { Transform } from './Transform';

/**
 * Describe the position of an entity relative to the reference frame.
 *
 * * To place or move an entity, you should set its [`Transform`].
 * * [`GlobalTransform`] is fully managed by bevy, you cannot mutate it, use [`Transform`] instead.
 * * To get the global transform of an entity, you should get its [`GlobalTransform`].
 * * For transform hierarchies to work correctly, you must have both a [`Transform`] and a [`GlobalTransform`].
 * * You may use the [`TransformBundle`](crate::TransformBundle) to guarantee this.
 */
export class GlobalTransform extends Affine3 {
  /**
   * Returns the 3d affine transformation matrix as a [`Mat4`].
   */
  compute_matrix() {
    return Mat4.from(this);
  }

  from(transform: Transform) {
    const { matrix3, translation } = transform.compute_affine();
    this.matrix3 = matrix3;
    this.translation = translation;
  }
}
