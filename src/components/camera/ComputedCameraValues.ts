import { field } from '@lastolivegames/becsy';
import { Mat4, Vec2, m4Type, v2Type } from '../../math';

/**
 * Computed values for this camera, such as the projection matrix and the render target size.
 */
export class ComputedCameraValues {
  @field(m4Type) declare projection_matrix: Mat4;

  /**
   * The physical size of this render target (ignores scale factor).
   */
  @field(v2Type) declare target_info_physical_size: Vec2;
  /**
   * The scale factor of this render target.
   */
  @field.float32 declare target_info_scale_factor: number;

  /**
   * position and size of the `Viewport`
   */
  @field(v2Type) declare old_viewport_size: Vec2;
}
