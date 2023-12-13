import { field } from '@lastolivegames/becsy';
import { Color } from '../render';
import { FogFalloff } from './FogFalloff';

export class FogSettings {
  /**
   * The color of the fog effect.
   *
   * **Tip:** The alpha channel of the color can be used to “modulate” the fog effect without
   * changing the fog falloff mode or parameters.
   */
  @field.object declare color: Color;

  /**
   * Color used to modulate the influence of directional light colors on the
   * fog, where the view direction aligns with each directional light direction,
   * producing a “glow” or light dispersion effect. (e.g. around the sun)
   * Use [`Color.NONE`] to disable the effect.
   */
  @field.object declare directional_light_color: Color;

  /**
   * The exponent applied to the directional light alignment calculation.
   * A higher value means a more concentrated “glow”.
   */
  @field.float32 declare directional_light_exponent: number;

  /**
   * The rate at which fog intensity increases with distance is controlled by the falloff mode.
   * Determines which falloff mode to use, and its parameters.
   */
  @field.object declare falloff: FogFalloff;

  constructor(
    options?: Partial<{
      color: Color;
      directional_light_color: Color;
      directional_light_exponent: number;
      falloff: FogFalloff;
    }>,
  ) {
    const {
      color = Color.rgba(1, 1, 1, 1),
      directional_light_color = Color.NONE,
      directional_light_exponent = 8,
      falloff = new FogFalloff.Linear({
        start: 0.0,
        end: 100.0,
      }),
    } = options || {};
    this.color = color;
    this.directional_light_color = directional_light_color;
    this.directional_light_exponent = directional_light_exponent;
    this.falloff = falloff;
  }
}
