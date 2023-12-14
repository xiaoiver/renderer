import { field } from '@lastolivegames/becsy';
import { Vec2, v2Type } from '../../math';

/**
 * A 3rd person camera that orbits around the target.
 */
export class OrbitCameraController {
  @field.boolean declare enabled: boolean;
  @field(v2Type) declare mouse_rotate_sensitivity: Vec2;
  @field(v2Type) declare mouse_translate_sensitivity: Vec2;
  @field.float32 declare mouse_wheel_zoom_sensitivity: number;
  @field.float32 pixels_per_line: number;
  @field.float32 smoothing_weight: number;

  constructor(
    options: Partial<{
      enabled: boolean;
      mouse_rotate_sensitivity: Vec2;
      mouse_translate_sensitivity: Vec2;
      mouse_wheel_zoom_sensitivity: number;
      pixels_per_line: number;
      smoothing_weight: number;
    }> = {},
  ) {
    const {
      enabled = true,
      mouse_rotate_sensitivity = Vec2.splat(0.08),
      mouse_translate_sensitivity = Vec2.splat(0.1),
      mouse_wheel_zoom_sensitivity = 0.2,
      pixels_per_line = 53.0,
      smoothing_weight = 0.8,
    } = options;

    this.enabled = enabled;
    this.mouse_rotate_sensitivity = mouse_rotate_sensitivity;
    this.mouse_translate_sensitivity = mouse_translate_sensitivity;
    this.mouse_wheel_zoom_sensitivity = mouse_wheel_zoom_sensitivity;
    this.pixels_per_line = pixels_per_line;
    this.smoothing_weight = smoothing_weight;
  }
}
