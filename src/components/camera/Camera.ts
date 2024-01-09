import { field } from '@lastolivegames/becsy';
import { Mat4, Vec2, Vec3 } from '../../math';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Viewport } from './Viewport';
import { ComputedCameraValues } from './ComputedCameraValues';

type None = null;

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
  @field.boolean declare is_active: boolean;

  /**
   * If this is set to `true`, the camera will use an intermediate "high dynamic range" render texture.
   * This allows rendering with a wider range of lighting values.
   */
  @field.boolean declare hdr: boolean;

  constructor() {
    this.order = 0;
    this.is_active = true;
    this.hdr = false;
  }

  /**
   * Converts a physical size in this `Camera` to a logical size.
   */
  to_logical(computed: ComputedCameraValues, physical_size: Vec2) {
    const scale = computed.target_info_scale_factor;
    return new Vec2(physical_size.x / scale, physical_size.y / scale);
  }

  /**
   * The rendered physical bounds [`URect`] of the camera.
   * If the `viewport` field is set to [`Some`], this will be the rect of that custom viewport.
   *  Otherwise it will default to the full physical rect of the current [`RenderTarget`].
   */
  physical_viewport_rect(computed: ComputedCameraValues): {
    min: Vec2;
    max: Vec2;
  } {
    const min = this.viewport ? this.viewport.physical_position : Vec2.ZERO;
    const max = new Vec2(min.x, min.y);
    max.add_assign(this.physical_viewport_size(computed));
    return { min, max };
  }

  /**
   * The rendered logical bounds [`Rect`] of the camera.
   * If the `viewport` field is set to[`Some`], this will be the rect of that custom viewport.
   * Otherwise it will default to the full logical rect of the current [`RenderTarget`].
   */
  logical_viewport_rect(computed: ComputedCameraValues) {
    const { min, max } = this.physical_viewport_rect(computed);
    return {
      min: this.to_logical(computed, min),
      max: this.to_logical(computed, max),
    };
  }

  /**
   * The logical size of this camera's viewport.
   * If the `viewport` field is set to [`Some`], this will be the size of that custom viewport.
   * Otherwise it will default to the full logical size of the current [`RenderTarget`].
   */
  logical_viewport_size(computed: ComputedCameraValues) {
    return this.viewport
      ? this.to_logical(computed, this.viewport.physical_size)
      : this.logical_target_size(computed);
  }

  /**
   * The physical size of this camera's viewport.
   * If the `viewport` field is set to [`Some`], this will be the size of that custom viewport.
   * Otherwise it will default to the full physical size of the current [`RenderTarget`].
   */
  physical_viewport_size(computed: ComputedCameraValues) {
    return this.viewport
      ? this.viewport.physical_size
      : this.physical_target_size(computed);
  }

  /**
   * The full logical size of this camera's [`RenderTarget`], ignoring custom `viewport` configuration.
   * Note that if the `viewport` field is [`Some`], this will not represent the size of the rendered area.
   * For logic that requires the size of the actually rendered area, prefer [`Camera::logical_viewport_size`].
   */
  logical_target_size(computed: ComputedCameraValues) {
    return this.to_logical(computed, computed.target_info_physical_size);
  }

  /**
   * The full physical size of this camera's [`RenderTarget`], ignoring custom `viewport` configuration.
   * Note that if the `viewport` field is [`Some`], this will not represent the size of the rendered area.
   */
  physical_target_size(computed: ComputedCameraValues) {
    return computed.target_info_physical_size;
  }

  /**
   * The projection matrix computed using this camera's [`CameraProjection`].
   */
  projection_matrix(computed: ComputedCameraValues) {
    return computed.projection_matrix;
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
    computed: ComputedCameraValues,
    cameraTransform: GlobalTransform,
    worldPosition: Vec3,
  ): Vec2 | None {
    let target_size = this.logical_viewport_size(computed);
    let ndc_space_coords = this.world_to_ndc(
      computed,
      cameraTransform,
      worldPosition,
    );

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
    computed: ComputedCameraValues,
    camera_transform: GlobalTransform,
    world_position: Vec3,
  ): Vec3 | None {
    // Build a transformation matrix to convert from world space to NDC using camera data
    let world_to_ndc: Mat4 = computed.projection_matrix.mul(
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
  ndc_to_world(
    computed: ComputedCameraValues,
    camera_transform: GlobalTransform,
    ndc: Vec3,
  ) {
    let ndc_to_world = camera_transform
      .compute_matrix()
      .mul(computed.projection_matrix.inverse()) as Mat4;
    let world_space_coords = ndc_to_world.project_point3(ndc);
    return world_space_coords;
  }
}
