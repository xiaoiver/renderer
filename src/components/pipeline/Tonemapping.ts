import { field } from '@lastolivegames/becsy';

export class Tonemapping {
  @field.uint8 declare method: TonemappingMethod;

  constructor(method: TonemappingMethod = TonemappingMethod.Reinhard) {
    this.method = method;
  }
}
export enum TonemappingMethod {
  /**
   * Bypass tonemapping.
   */
  None,

  /**
   * Suffers from lots hue shifting, brights don't desaturate naturally.
   * Bright primaries and secondaries don't desaturate at all.
   */
  Reinhard,

  /**
   * Suffers from hue shifting. Brights don't desaturate much at all across the spectrum.
   */
  ReinhardLuminance,

  /**
   * Same base implementation that Godot 4.0 uses for Tonemap ACES.
   * @see https://github.com/TheRealMJP/BakingLab/blob/master/BakingLab/ACES.hlsl
   * Not neutral, has a very specific aesthetic, intentional and dramatic hue shifting.
   * Bright greens and reds turn orange. Bright blues turn magenta.
   * Significantly increased contrast. Brights desaturate across the spectrum.
   */
  AcesFitted,

  /**
   * By Troy Sobotka @see https://github.com/sobotka/AgX
   * Very neutral. Image is somewhat desaturated when compared to other tonemappers.
   * Little to no hue shifting. Subtle [Abney shifting](https://en.wikipedia.org/wiki/Abney_effect).
   * NOTE: Requires the `tonemapping_luts` cargo feature.
   */
  AgX,

  /**
   * By Tomasz Stachowiak
   * Has little hue shifting in the darks and mids, but lots in the brights. Brights desaturate across the spectrum.
   * Is sort of between Reinhard and ReinhardLuminance. Conceptually similar to reinhard-jodie.
   * Designed as a compromise if you want e.g. decent skin tones in low light, but can't afford to re-do your
   * VFX to look good without hue shifting.
   */
  SomewhatBoringDisplayTransform,

  /**
   * By Tomasz Stachowiak
   * @see https://github.com/h3r2tic/tony-mc-mapface
   * Very neutral. Subtle but intentional hue shifting. Brights desaturate across the spectrum.
   * Comment from author:
   * Tony is a display transform intended for real-time applications such as games.
   * It is intentionally boring, does not increase contrast or saturation, and stays close to the
   * input stimulus where compression isn't necessary.
   * Brightness-equivalent luminance of the input stimulus is compressed. The non-linearity resembles Reinhard.
   * Color hues are preserved during compression, except for a deliberate [Bezold–Brücke shift](https://en.wikipedia.org/wiki/Bezold%E2%80%93Br%C3%BCcke_shift).
   * To avoid posterization, selective desaturation is employed, with care to avoid the [Abney effect](https://en.wikipedia.org/wiki/Abney_effect).
   * NOTE: Requires the `tonemapping_luts` cargo feature.
   */
  TonyMcMapface,

  /**
   * Default Filmic Display Transform from blender.
   * Somewhat neutral. Suffers from hue shifting. Brights desaturate across the spectrum.
   * NOTE: Requires the `tonemapping_luts` cargo feature.
   */
  BlenderFilmic,
}
