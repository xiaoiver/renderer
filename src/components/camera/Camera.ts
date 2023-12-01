import { field } from '@lastolivegames/becsy';
import { Mat4, Vec2, Vec3 } from '../../math';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Viewport } from './Viewport';

type None = null;

/**
 * Information about the current [`RenderTarget`].
 */
interface RenderTargetInfo {
  /**
   * The physical size of this render target (ignores scale factor).
   */
  physicalSize: Vec2;
  /**
   * The scale factor of this render target.
   */
  scaleFactor: number;
}

/**
 * Holds internally computed [`Camera`] values.
 */
export interface ComputedCameraValues {
  projection_matrix: Mat4;
  target_info: Partial<RenderTargetInfo>;
  // position and size of the `Viewport`
  old_viewport_size: Partial<Vec2>;
}

export class Camera {
  /**
   * If set, this camera will render to the given [`Viewport`] rectangle
   * within the configured [`RenderTarget`].
   */
  @field.object declare viewport?: Viewport;

  /**
   * Cameras with a higher order are rendered later, and thus on top of lower order cameras.
   */
  @field.int32 declare order: number;

  /**
   * If this is set to `true`, this camera will be rendered to its specified [`RenderTarget`].
   * If `false`, this camera will not be rendered.
   */
  @field.boolean declare isActive: boolean;

  /**
   * If this is set to `true`, the camera will use an intermediate "high dynamic range" render texture.
   * This allows rendering with a wider range of lighting values.
   */
  @field.boolean declare hdr: boolean;

  /**
   * Computed values for this camera, such as the projection matrix and the render target size.
   */
  @field.object declare computed: ComputedCameraValues;

  /**
   * Converts a physical size in this `Camera` to a logical size.
   */
  toLogical(physicalSize: Vec2) {
    const scale = this.computed.target_info.scaleFactor;
    return new Vec2(physicalSize[0] / scale, physicalSize[1] / scale);
  }

  /**
   * The rendered physical bounds [`URect`] of the camera.
   * If the `viewport` field is set to [`Some`], this will be the rect of that custom viewport.
   *  Otherwise it will default to the full physical rect of the current [`RenderTarget`].
   */
  physicalViewportRect(): { min: Vec2; max: Vec2 } {
    const min = this.viewport ? this.viewport.physicalPosition : Vec2.ZERO;
    const max = new Vec2(min.x, min.y);
    max.add_assign(this.physicalViewportSize());
    return { min, max };
  }

  /**
   * The rendered logical bounds [`Rect`] of the camera.
   * If the `viewport` field is set to[`Some`], this will be the rect of that custom viewport.
   * Otherwise it will default to the full logical rect of the current [`RenderTarget`].
   */
  logicalViewportRect() {
    const { min, max } = this.physicalViewportRect();
    return { min: this.toLogical(min), max: this.toLogical(max) };
  }

  /**
   * The logical size of this camera's viewport.
   * If the `viewport` field is set to [`Some`], this will be the size of that custom viewport.
   * Otherwise it will default to the full logical size of the current [`RenderTarget`].
   */
  logicalViewportSize() {
    return this.viewport
      ? this.toLogical(this.viewport.physicalSize)
      : this.logicalTargetSize();
  }

  /**
   * The physical size of this camera's viewport.
   * If the `viewport` field is set to [`Some`], this will be the size of that custom viewport.
   * Otherwise it will default to the full physical size of the current [`RenderTarget`].
   */
  physicalViewportSize() {
    return this.viewport
      ? this.viewport.physicalSize
      : this.physicalTargetSize();
  }

  /**
   * The full logical size of this camera's [`RenderTarget`], ignoring custom `viewport` configuration.
   * Note that if the `viewport` field is [`Some`], this will not represent the size of the rendered area.
   * For logic that requires the size of the actually rendered area, prefer [`Camera::logical_viewport_size`].
   */
  logicalTargetSize() {
    return this.toLogical(this.computed.target_info.physicalSize);
  }

  /**
   * The full physical size of this camera's [`RenderTarget`], ignoring custom `viewport` configuration.
   * Note that if the `viewport` field is [`Some`], this will not represent the size of the rendered area.
   */
  physicalTargetSize() {
    return this.computed.target_info.physicalSize;
  }

  /**
   * The projection matrix computed using this camera's [`CameraProjection`].
   */
  projectionMatrix() {
    return this.computed.projection_matrix;
  }

  /**
   * Given a position in world space, use the camera to compute the viewport-space coordinates.
   *
   * To get the coordinates in Normalized Device Coordinates, you should use
   * [`world_to_ndc`](Self::world_to_ndc).
   *
   * Returns `None` if any of these conditions occur:
   */
  world_to_viewport(
    cameraTransform: GlobalTransform,
    worldPosition: Vec3,
  ): Vec2 | None {
    let target_size = this.logicalViewportSize();
    let ndc_space_coords = this.world_to_ndc(cameraTransform, worldPosition);

    if (ndc_space_coords.z < 0.0 || ndc_space_coords.z > 1.0) {
      return null;
    }

    // Once in NDC space, we can discard the z element and rescale x/y to fit the screen
    let viewport_position = ndc_space_coords
      .truncate()
      .add(Vec2.ONE)
      .div(2.0)
      .mul(target_size);
    // Flip the Y co-ordinate origin from the bottom to the top.
    viewport_position.y = target_size.y - viewport_position.y;
    return viewport_position;
  }

  /**
   * Given a position in world space, use the camera's viewport to compute the Normalized Device Coordinates.
   *
   * When the position is within the viewport the values returned will be between -1.0 and 1.0 on the X and Y axes,
   * and between 0.0 and 1.0 on the Z axis.
   */
  world_to_ndc(
    camera_transform: GlobalTransform,
    world_position: Vec3,
  ): Vec3 | None {
    // Build a transformation matrix to convert from world space to NDC using camera data
    let world_to_ndc: Mat4 = this.computed.projection_matrix.mul(
      camera_transform.compute_matrix().inverse(),
    ) as Mat4;
    let ndc_space_coords: Vec3 = world_to_ndc.project_point3(world_position);
    return ndc_space_coords;
  }

  /**
   * Given a position in Normalized Device Coordinates,
   * use the camera's viewport to compute the world space position.
   *
   * When the position is within the viewport the values returned will be between -1.0 and 1.0 on the X and Y axes,
   * and between 0.0 and 1.0 on the Z axis.
   * To get the world space coordinates with the viewport position, you should use
   * [`world_to_viewport`](Self::world_to_viewport).
   */
  ndc_to_world(camera_transform: GlobalTransform, ndc: Vec3) {
    let ndc_to_world = camera_transform
      .compute_matrix()
      .mul(this.computed.projection_matrix.inverse()) as Mat4;
    let world_space_coords = ndc_to_world.project_point3(ndc);
    return world_space_coords;
  }
}
