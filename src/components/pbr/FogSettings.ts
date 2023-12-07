import { field } from '@lastolivegames/becsy';
import { Color } from '../render';

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
   * Determines which falloff mode to use, and its parameters.
   */
  // declare falloff: FogFalloff;
}
