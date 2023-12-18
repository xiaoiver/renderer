import { field } from '@lastolivegames/becsy';
import { Vec2, v2Type } from '../../math';

/**
 * Your typical first-person camera controller.
 */
export class FpsCameraController {
  @field.boolean declare enabled: boolean;
  @field(v2Type) declare mouse_rotate_sensitivity: Vec2;
  @field.float32 declare translate_sensitivity: number;
  @field.float32 declare smoothing_weight: number;

  constructor(
    options: Partial<{
      enabled: boolean;
      mouse_rotate_sensitivity: Vec2;
      translate_sensitivity: number;
      smoothing_weight: number;
    }> = {},
  ) {
    const {
      enabled = true,
      mouse_rotate_sensitivity = Vec2.splat(0.2),
      translate_sensitivity = 2.0,
      smoothing_weight = 0.9,
    } = options;

    this.enabled = enabled;
    this.mouse_rotate_sensitivity = mouse_rotate_sensitivity;
    this.translate_sensitivity = translate_sensitivity;
    this.smoothing_weight = smoothing_weight;
  }
}
