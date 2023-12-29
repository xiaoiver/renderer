import { Affine3, Mat3, Mat4, Vec3 } from '../../math';
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
  static copy(rhs: GlobalTransform) {
    return new GlobalTransform(
      Mat3.copy(rhs.affine()),
      Vec3.copy(rhs.translation),
    );
  }

  static from_translation(translation: Vec3) {
    return new GlobalTransform(Mat3.IDENTITY, translation);
  }

  /**
   * Returns the 3d affine transformation matrix as a [`Mat4`].
   */
  compute_matrix() {
    return Mat4.from(this);
  }

  /**
   * Returns the transformation as a [`Transform`].
   * The transform is expected to be non-degenerate and without shearing, or the output will be invalid.
   */
  compute_transform() {
    const { scale, rotation, translation } =
      this.to_scale_rotation_translation();
    return new Transform(translation, scale, rotation);
  }

  /**
   * Returns the 3d affine transformation matrix as an [`Affine3A`].
   */
  affine() {
    return this.matrix3;
  }

  from(transform: Transform) {
    const { matrix3, translation } = transform.compute_affine();
    this.matrix3 = matrix3;
    this.translation = translation;
  }
}
