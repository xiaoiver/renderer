import { field } from '@lastolivegames/becsy';
import { Color } from '../render';

/**
 * An ambient light, which lights the entire scene equally.
 *
 * Make ambient light slightly brighter:
 * @example
 * ambient_light.brightness = 0.3
 */
export class AmbientLight {
  @field.object declare color: Color;

  /**
   * A direct scale factor multiplied with `color` before being passed to the shader.
   */
  @field.float32 declare brightness: number;

  constructor(
    options?: Partial<{
      color: Color;
      brightness: number;
    }>,
  ) {
    const { color = Color.rgb(1, 1, 1), brightness = 0.05 } = options || {};
    this.color = color;
    this.brightness = brightness;
  }
}
