import { field } from '@lastolivegames/becsy';
import { v2Type, Vec2 } from '../../math';

/**
 * Render viewport configuration for the [`Camera`] component.
 * The viewport defines the area on the render target to which the camera renders its image.
 * You can overlay multiple cameras in a single window using viewports to create effects like
 * split screen, minimaps, and character viewers.
 */
export class Viewport {
  /**
   * The physical position to render this viewport to within the [`RenderTarget`] of this [`Camera`].
   * (0,0) corresponds to the top-left corner
   */
  @field(v2Type) declare physicalPosition: Vec2;
  /**
   * The physical size of the viewport rectangle to render to within the [`RenderTarget`] of this [`Camera`].
   * The origin of the rectangle is in the top-left corner.
   */
  @field(v2Type) declare physicalSize: Vec2;
  /**
   * The minimum and maximum depth to render (on a scale from 0.0 to 1.0).
   */
  @field(v2Type) declare depth: Vec2;
}
