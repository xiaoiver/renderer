import { World, component, field } from '@lastolivegames/becsy';
import { Mat4, Vec2, Vec3, v2Type } from '../../math';
import { ScalingMode } from './ScalingMode';

export const Projection = World.defineEnum('Projection');
export class Perspective {
  /**
   * The vertical field of view (FOV) in radians.
   * Defaults to a value of π/4 radians or 45 degrees.
   */
  @field.float64 declare fov: number;

  /**
   * The aspect ratio (width divided by height) of the viewing frustum.
   * Bevy's [`camera_system`](crate::camera::camera_system) automatically
   * updates this value when the aspect ratio of the associated window changes.
   *
   * Defaults to a value of `1.0`.
   */
  @field.float64 declare aspect_ratio: number;

  /**
   * The distance from the camera in world units of the viewing frustum's near plane.
   * Objects closer to the camera than this value will not be visible.
   *
   * Defaults to a value of `0.1`.
   */
  @field.float64 declare near: number;

  /**
   * The distance from the camera in world units of the viewing frustum's far plane.
   * Objects farther from the camera than this value will not be visible.
   *
   * Defaults to a value of `1000.0`.
   */
  @field.float64 declare far: number;

  constructor(
    fov: number = Math.PI / 4,
    aspect_ratio: number = 1,
    near: number = 0.1,
    far: number = 1000,
  ) {
    this.fov = fov;
    this.aspect_ratio = aspect_ratio;
    this.near = near;
    this.far = far;
  }

  get_projection_matrix() {
    return Mat4.perspective_infinite_reverse_rh(
      this.fov,
      this.aspect_ratio,
      this.near,
    );
  }

  get_frustum_corners(z_near: number, z_far: number) {
    let tan_half_fov = Math.tan(this.fov / 2);
    let a = Math.abs(z_near) * tan_half_fov;
    let b = Math.abs(z_far) * tan_half_fov;
    let aspect_ratio = this.aspect_ratio;
    return [
      new Vec3(a * aspect_ratio, -a, z_near), // bottom right
      new Vec3(a * aspect_ratio, a, z_near), // top right
      new Vec3(-a * aspect_ratio, a, z_near), // top left
      new Vec3(-a * aspect_ratio, -a, z_near), // bottom left
      new Vec3(b * aspect_ratio, -b, z_far), // bottom right
      new Vec3(b * aspect_ratio, b, z_far), // top right
      new Vec3(-b * aspect_ratio, b, z_far), // top left
      new Vec3(-b * aspect_ratio, -b, z_far), // bottom left
    ] as const;
  }
}

export class Orthographic {
  /**
   * The distance from the camera in world units of the viewing frustum's near plane.
   * Objects closer to the camera than this value will not be visible.
   *
   * Defaults to a value of `0.1`.
   */
  @field.float64 declare near: number;

  /**
   * The distance from the camera in world units of the viewing frustum's far plane.
   * Objects farther from the camera than this value will not be visible.
   *
   * Defaults to a value of `1000.0`.
   */
  @field.float64 declare far: number;

  /**
   * Specifies the origin of the viewport as a normalized position from 0 to 1, where (0, 0) is the bottom left
   * and (1, 1) is the top right. This determines where the camera's position sits inside the viewport.
   *
   * When the projection scales due to viewport resizing, the position of the camera, and thereby `viewport_origin`,
   * remains at the same relative point.
   *
   * Consequently, this is pivot point when scaling. With a bottom left pivot, the projection will expand
   * upwards and to the right. With a top right pivot, the projection will expand downwards and to the left.
   * Values in between will caused the projection to scale proportionally on each axis.
   *
   * Defaults to `(0.5, 0.5)`, which makes scaling affect opposite sides equally, keeping the center
   * point of the viewport centered.
   */
  @field(v2Type) declare viewport_origin: Vec2;

  /**
   * How the projection will scale when the viewport is resized.
   *
   * Defaults to `ScalingMode::WindowSize(1.0)`
   */
  @field.object declare scaling_mode: typeof ScalingMode;

  /**
   * Scales the projection in world units.
   * As scale increases, the apparent size of objects decreases, and vice versa.
   *
   * Defaults to `1.0`
   */
  @field.float64 declare scale: number;

  // area: Rect
}
