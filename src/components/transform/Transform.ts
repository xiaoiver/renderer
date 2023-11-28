import { field } from '@lastolivegames/becsy';
import { Vec3, v3Type, Quat, quatType, Mat4, Affine3, Mat3 } from '../../math';

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
   * and [`Transform::up`] points towards `up`.
   *
   * In some cases it's not possible to construct a rotation. Another axis will be picked in those cases:
   * * if `target` is the same as the transform translation, `Vec3::Z` is used instead
   * * if `up` is zero, `Vec3::Y` is used instead
   * * if the resulting forward direction is parallel with `up`, an orthogonal vector is used as the "right" direction
   */
  look_at(target: Vec3, up: Vec3) {
    this.look_to(target.sub(this.translation), up);
    return this;
  }

  /**
   * Rotates this [`Transform`] so that [`Transform::forward`] points in the given `direction`
   * and [`Transform::up`] points towards `up`.
   */
  look_to(direction: Vec3, _up: Vec3) {
    let back: Vec3;
    try {
      back = direction.normalize().neg();
    } catch (e) {
      back = Vec3.NEG_Z;
    }

    let up: Vec3;
    try {
      up = _up.normalize();
    } catch (e) {
      up = Vec3.Y;
    }

    let right: Vec3;
    try {
      right = up.cross(back).normalize();
    } catch (e) {
      right = up.any_orthonormal_vector();
    }

    up = back.cross(right);
    this.rotation = Quat.from_mat3(Mat3.from_cols(right, up, back));
  }

  compute_affine() {
    return Affine3.from_scale_rotation_translation(
      this.scale,
      this.rotation,
      this.translation,
    );
  }
}
