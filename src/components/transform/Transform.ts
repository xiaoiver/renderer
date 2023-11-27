import { field } from '@lastolivegames/becsy';
import { Vec3, v3Type, Quat, quatType, Mat4, Affine3 } from '../../math';

/**
 * Describe the position of an entity.
 * If the entity has a parent, the position is relative to its parent position.
 *
 * * To place or move an entity, you should set its [`Transform`].
 * * To get the global transform of an entity, you should get its [`GlobalTransform`].
 * * To be displayed, an entity must have both a [`Transform`] and a [`GlobalTransform`].
 */
export class Transform {
  /**
   * Position of the entity. In 2d, the last value of the `Vec3` is used for z-ordering.
   */
  @field(v3Type) declare translation: Vec3;
  /**
   * Scale of the entity.
   */
  @field(v3Type) declare scale: Vec3;
  /**
   * Rotation of the entity.
   */
  @field(quatType) declare rotation: Quat;

  constructor(
    translation: Vec3 = Vec3.ZERO,
    scale: Vec3 = Vec3.ONE,
    rotation: Quat = Quat.IDENTITY,
  ) {
    this.translation = translation;
    this.scale = scale;
    this.rotation = rotation;
  }

  /**
   * An identity [`Transform`] with no translation, rotation, and a scale of 1 on all axes.
   */
  static IDENTITY = new Transform(Vec3.ZERO, Vec3.ONE, Quat.IDENTITY);

  /**
   * Creates a new [`Transform`], with `translation`. Rotation will be 0 and scale 1 on all axes.
   */
  static from_translation(translation: Vec3) {
    return new Transform(translation, Vec3.ONE, Quat.IDENTITY);
  }

  /**
   * Creates a new [`Transform`] at the position `(x, y, z)`.
   * In 2d, the `z` component is used for z-ordering elements: higher `z`-value will be in front of lower `z`-value.
   */
  static from_xyz(x: number, y: number, z: number) {
    return Transform.from_translation(new Vec3(x, y, z));
  }

  /**
   * Extracts the translation, rotation, and scale from `matrix`. It must be a 3d affine
   * transformation matrix.
   */
  static from_matrix(matrix: Mat4) {
    const { scale, rotation, translation } =
      matrix.to_scale_rotation_translation();
    return new Transform(translation, scale, rotation);
  }

  /**
   * Creates a new [`Transform`], with `rotation`. Translation will be 0 and scale 1 on
   * all axes.
   */
  static from_rotation(rotation: Quat) {
    return new Transform(Vec3.ZERO, Vec3.ONE, rotation);
  }

  /**
   * Rotates this [`Transform`] so that [`Transform::forward`] points towards the `target` position,
   */
  look_at(target: Vec3, up: Vec3) {}

  compute_affine() {
    return Affine3.from_scale_rotation_translation(
      this.scale,
      this.rotation,
      this.translation,
    );
  }
}
