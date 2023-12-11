import { clamp } from 'lodash-es';
import { to_degrees, to_radians } from './utils';

/**
 * source: https://entropymine.com/imageworsener/srgbformula/
 */
namespace SrgbColorSpace {
  export function linear_to_nonlinear_srgb(self: number) {
    if (self <= 0.0) {
      return self;
    }

    if (self <= 0.0031308) {
      return self * 12.92; // linear falloff in dark values
    } else {
      return 1.055 * Math.pow(self, 1.0 / 2.4) - 0.055; // gamma curve in other area
    }
  }

  export function nonlinear_to_linear_srgb(self: number) {
    if (self <= 0.0) {
      return self;
    }
    if (self <= 0.04045) {
      return self / 12.92; // linear falloff in dark values
    } else {
      return Math.pow((self + 0.055) / 1.055, 2.4); // gamma curve in other area
    }
  }
}

namespace HslRepresentation {
  /**
   * converts a color in HLS space to sRGB space
   */
  export function hsl_to_nonlinear_srgb(
    hue: number,
    saturation: number,
    lightness: number,
  ): [number, number, number] {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
    const chroma = (1.0 - Math.abs(2.0 * lightness - 1.0)) * saturation;
    const hue_prime = hue / 60.0;
    const largest_component =
      chroma * (1.0 - Math.abs((hue_prime % 2.0) - 1.0));
    let rgb: [number, number, number] = [0, 0, 0];

    if (hue_prime < 1.0) {
      rgb = [chroma, largest_component, 0.0];
    } else if (hue_prime < 2.0) {
      rgb = [largest_component, chroma, 0.0];
    } else if (hue_prime < 3.0) {
      rgb = [0.0, chroma, largest_component];
    } else if (hue_prime < 4.0) {
      rgb = [0.0, largest_component, chroma];
    } else if (hue_prime < 5.0) {
      rgb = [largest_component, 0.0, chroma];
    } else {
      rgb = [chroma, 0.0, largest_component];
    }
    const lightness_match = lightness - chroma / 2.0;
    const [r_temp, g_temp, b_temp] = rgb;

    return [
      r_temp + lightness_match,
      g_temp + lightness_match,
      b_temp + lightness_match,
    ];
  }

  /**
   * converts a color in sRGB space to HLS space
   */
  export function nonlinear_srgb_to_hsl([red, green, blue]: [
    number,
    number,
    number,
  ]): [number, number, number] {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
    const x_max = Math.max(red, Math.max(green, blue));
    const x_min = Math.min(red, Math.min(green, blue));
    const chroma = x_max - x_min;
    const lightness = (x_max + x_min) / 2.0;
    let hue: number;

    if (chroma == 0.0) {
      hue = 0.0;
    } else if (red == x_max) {
      hue = (60.0 * (green - blue)) / chroma;
    } else if (green == x_max) {
      hue = 60.0 * (2.0 + (blue - red) / chroma);
    } else {
      hue = 60.0 * (4.0 + (red - green) / chroma);
    }

    hue = hue < 0.0 ? 360.0 + hue : hue;
    let saturation: number;

    if (lightness <= 0.0 || lightness >= 1.0) {
      saturation = 0.0;
    } else {
      saturation = (x_max - lightness) / Math.min(lightness, 1.0 - lightness);
    }

    return [hue, saturation, lightness];
  }
}

namespace LchRepresentation {
  // References available at http://brucelindbloom.com/ in the "Math" section

  // CIE Constants
  // http://brucelindbloom.com/index.html?LContinuity.html (16) (17)
  const CIE_EPSILON = 216.0 / 24389.0;
  const CIE_KAPPA = 24389.0 / 27.0;
  // D65 White Reference:
  // https://en.wikipedia.org/wiki/Illuminant_D65#Definition
  const D65_WHITE_X = 0.95047;
  const D65_WHITE_Y = 1.0;
  const D65_WHITE_Z = 1.08883;

  export function lch_to_nonlinear_srgb(
    lightness: number,
    chroma: number,
    hue: number,
  ): [number, number, number] {
    lightness = lightness * 100.0;
    chroma = chroma * 100.0;

    // convert LCH to Lab
    // http://www.brucelindbloom.com/index.html?Eqn_LCH_to_Lab.html
    const l = lightness;
    const a = chroma * Math.cos(to_radians(hue));
    const b = chroma * Math.sin(to_radians(hue));

    // convert Lab to XYZ
    // http://www.brucelindbloom.com/index.html?Eqn_Lab_to_XYZ.html
    const fy = (l + 16.0) / 116.0;
    const fx = a / 500.0 + fy;
    const fz = fy - b / 200.0;
    let xr: number;
    const fx3 = Math.pow(fx, 3.0);
    if (fx3 > CIE_EPSILON) {
      xr = fx3;
    } else {
      xr = (116.0 * fx - 16.0) / CIE_KAPPA;
    }
    let yr: number;
    if (l > CIE_EPSILON * CIE_KAPPA) {
      yr = Math.pow((l + 16.0) / 116.0, 3.0);
    } else {
      yr = l / CIE_KAPPA;
    }
    let zr: number;
    const fz3 = Math.pow(fz, 3.0);
    if (fz3 > CIE_EPSILON) {
      zr = fz3;
    } else {
      zr = (116.0 * fz - 16.0) / CIE_KAPPA;
    }
    const x = xr * D65_WHITE_X;
    const y = yr * D65_WHITE_Y;
    const z = zr * D65_WHITE_Z;

    // XYZ to sRGB
    // http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html (sRGB, XYZ to RGB [M]-1)
    const red = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    const green = x * -0.969266 + y * 1.8760108 + z * 0.041556;
    const blue = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

    return [
      clamp(SrgbColorSpace.linear_to_nonlinear_srgb(red), 0, 1),
      clamp(SrgbColorSpace.linear_to_nonlinear_srgb(green), 0, 1),
      clamp(SrgbColorSpace.linear_to_nonlinear_srgb(blue), 0, 1),
    ];
  }

  export function nonlinear_srgb_to_lch([red, green, blue]: [
    number,
    number,
    number,
  ]): [number, number, number] {
    // RGB to XYZ
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
    red = SrgbColorSpace.nonlinear_to_linear_srgb(red);
    green = SrgbColorSpace.nonlinear_to_linear_srgb(green);
    blue = SrgbColorSpace.nonlinear_to_linear_srgb(blue);

    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html (sRGB, RGB to XYZ [M])
    const x = red * 0.4124564 + green * 0.3575761 + blue * 0.1804375;
    const y = red * 0.2126729 + green * 0.7151522 + blue * 0.072175;
    const z = red * 0.0193339 + green * 0.119192 + blue * 0.9503041;

    // XYZ to Lab
    // http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_Lab.html
    const xr = x / D65_WHITE_X;
    const yr = y / D65_WHITE_Y;
    const zr = z / D65_WHITE_Z;
    let fx: number;
    if (xr > CIE_EPSILON) {
      fx = Math.cbrt(xr);
    } else {
      fx = (CIE_KAPPA * xr + 16.0) / 116.0;
    }
    let fy: number;
    if (yr > CIE_EPSILON) {
      fy = Math.cbrt(yr);
    } else {
      fy = (CIE_KAPPA * yr + 16.0) / 116.0;
    }
    let fz: number;
    if (yr > CIE_EPSILON) {
      fz = Math.cbrt(zr);
    } else {
      fz = (CIE_KAPPA * zr + 16.0) / 116.0;
    }
    const l = 116.0 * fy - 16.0;
    const a = 500.0 * (fx - fy);
    const b = 200.0 * (fy - fz);

    // Lab to LCH
    // http://www.brucelindbloom.com/index.html?Eqn_Lab_to_LCH.html
    const c = Math.sqrt(Math.pow(a, 2.0) + Math.pow(b, 2.0));
    let h = to_degrees(Math.atan2(to_radians(b), to_radians(a)));
    if (h < 0.0) {
      h = h + 360.0;
    }

    return [clamp(l / 100.0, 0.0, 1.5), clamp(c / 100.0, 0.0, 1.5), h];
  }
}

abstract class Base {
  abstract a(): number;

  /**
   * Determine if the color is fully transparent, i.e. if the alpha is 0.
   *
   * @example
   * ```ts
   * Color.NONE.is_fully_transparent(); // true
   * Color.rgba(1, 1, 1, 0).is_fully_transparent(); // true
   * ```
   */
  is_fully_transparent() {
    return this.a() === 0;
  }

  /**
   * Converts a `Color` to variant `Color::Rgba`
   */
  abstract as_rgba(): Rgba;

  /**
   * Converts a `Color` to a `[f32; 4]` from linear RGB colorspace
   */
  abstract as_linear_rgba_f32(): [number, number, number, number];
}

/**
 * sRGBA color
 */
export class Rgba extends Base {
  constructor(
    /**
     * Red channel. [0.0, 1.0]
     */
    public readonly red: number,
    /**
     * Green channel. [0.0, 1.0]
     */
    public readonly green: number,
    /**
     * Blue channel. [0.0, 1.0]
     */
    public readonly blue: number,
    /**
     * Alpha channel. [0.0, 1.0]
     */
    public readonly alpha: number,
  ) {
    super();
  }

  a() {
    return this.alpha;
  }

  as_rgba() {
    return this;
  }

  as_linear_rgba_f32(): [number, number, number, number] {
    return [
      SrgbColorSpace.nonlinear_to_linear_srgb(this.red),
      SrgbColorSpace.nonlinear_to_linear_srgb(this.green),
      SrgbColorSpace.nonlinear_to_linear_srgb(this.blue),
      this.alpha,
    ];
  }
}

/**
 * RGBA color in the Linear sRGB colorspace (often colloquially referred to as "linear", "RGB", or "linear RGB").
 */
export class RgbaLinear extends Base {
  constructor(
    /**
     * Red channel. [0.0, 1.0]
     */
    public readonly red: number,
    /**
     * Green channel. [0.0, 1.0]
     */
    public readonly green: number,
    /**
     * Blue channel. [0.0, 1.0]
     */
    public readonly blue: number,
    /**
     * Alpha channel. [0.0, 1.0]
     */
    public readonly alpha: number,
  ) {
    super();
  }

  a() {
    return this.alpha;
  }

  as_rgba() {
    return new Rgba(
      SrgbColorSpace.linear_to_nonlinear_srgb(this.red),
      SrgbColorSpace.linear_to_nonlinear_srgb(this.green),
      SrgbColorSpace.linear_to_nonlinear_srgb(this.blue),
      this.alpha,
    );
  }

  as_linear_rgba_f32(): [number, number, number, number] {
    return [this.red, this.green, this.blue, this.alpha];
  }
}

/**
 * HSL (hue, saturation, lightness) color with an alpha channel
 */
export class Hsla extends Base {
  constructor(
    /**
     * Hue channel. [0.0, 360.0]
     */
    public readonly hue: number,
    /**
     * Saturation channel. [0.0, 1.0]
     */
    public readonly saturation: number,
    /**
     * Lightness channel. [0.0, 1.0]
     */
    public readonly lightness: number,
    /**
     * Alpha channel. [0.0, 1.0]
     */
    public readonly alpha: number,
  ) {
    super();
  }

  a() {
    return this.alpha;
  }

  as_rgba() {
    const [red, green, blue] = HslRepresentation.hsl_to_nonlinear_srgb(
      this.hue,
      this.saturation,
      this.lightness,
    );
    return new Rgba(red, green, blue, this.alpha);
  }

  as_linear_rgba_f32(): [number, number, number, number] {
    const [red, green, blue] = HslRepresentation.hsl_to_nonlinear_srgb(
      this.hue,
      this.saturation,
      this.lightness,
    );
    return [red, green, blue, this.alpha];
  }
}

/**
 * LCH(ab) (lightness, chroma, hue) color with an alpha channel
 */
export class Lcha extends Base {
  constructor(
    /**
     * Lightness channel. [0.0, 1.0]
     */
    public readonly lightness: number,
    /**
     * Chroma channel. [0.0, 1.5]
     */
    public readonly chroma: number,
    /**
     * Hue channel. [0.0, 360.0]
     */
    public readonly hue: number,
    /**
     * Alpha channel. [0.0, 1.0]
     */
    public readonly alpha: number,
  ) {
    super();
  }

  a() {
    return this.alpha;
  }

  as_rgba() {
    const [red, green, blue] = LchRepresentation.lch_to_nonlinear_srgb(
      this.lightness,
      this.chroma,
      this.hue,
    );
    return new Rgba(red, green, blue, this.alpha);
  }

  as_linear_rgba_f32(): [number, number, number, number] {
    const [red, green, blue] = LchRepresentation.lch_to_nonlinear_srgb(
      this.lightness,
      this.chroma,
      this.hue,
    );

    return [
      SrgbColorSpace.nonlinear_to_linear_srgb(red),
      SrgbColorSpace.nonlinear_to_linear_srgb(green),
      SrgbColorSpace.nonlinear_to_linear_srgb(blue),
      this.alpha,
    ];
  }
}

export type Color = Rgba | RgbaLinear | Hsla | Lcha;

export namespace Color {
  /**
   * New `Color` from sRGB colorspace.
   * @param r Red channel. [0.0, 1.0]
   * @param g Green channel. [0.0, 1.0]
   * @param b Blue channel. [0.0, 1.0]
   * @returns
   */
  export function rgb(r: number, g: number, b: number): Color {
    return Color.rgba(r, g, b, 1.0);
  }

  /**
   * New `Color` from sRGB colorspace.
   * @param r Red channel. [0.0, 1.0]
   * @param g Green channel. [0.0, 1.0]
   * @param b Blue channel. [0.0, 1.0]
   * @param a Alpha channel. [0.0, 1.0]
   * @returns
   */
  export function rgba(r: number, g: number, b: number, a: number): Color {
    return new Rgba(r, g, b, a);
  }

  /**
   * New `Color` from linear RGB colorspace.
   * @param r Red channel. [0.0, 1.0]
   * @param g Green channel. [0.0, 1.0]
   * @param b Blue channel. [0.0, 1.0]
   * @returns
   */
  export function rgb_linear(r: number, g: number, b: number): Color {
    return new RgbaLinear(r, g, b, 1.0);
  }

  /**
   * New `Color` from linear RGB colorspace.
   * @param r Red channel. [0.0, 1.0]
   * @param g Green channel. [0.0, 1.0]
   * @param b Blue channel. [0.0, 1.0]
   * @param a Alpha channel. [0.0, 1.0]
   * @returns
   */
  export function rgba_linear(
    r: number,
    g: number,
    b: number,
    a: number,
  ): Color {
    return new RgbaLinear(r, g, b, a);
  }

  /**
   * New `Color` with HSL representation in sRGB colorspace.
   * @param hue Hue channel. [0.0, 360.0]
   * @param saturation Saturation channel. [0.0, 1.0]
   * @param lightness Lightness channel. [0.0, 1.0]
   */
  export function hsl(hue: number, saturation: number, lightness: number) {
    return new Hsla(hue, saturation, lightness, 1.0);
  }

  /**
   * New `Color` with HSL representation in sRGB colorspace.
   * @param hue Hue channel. [0.0, 360.0]
   * @param saturation Saturation channel. [0.0, 1.0]
   * @param lightness Lightness channel. [0.0, 1.0]
   * @param alpha Alpha channel. [0.0, 1.0]
   */
  export function hsla(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number,
  ) {
    return new Hsla(hue, saturation, lightness, alpha);
  }

  /**
   * New `Color` with LCH(ab) representation in sRGB colorspace.
   * @param lightness Lightness channel. [0.0, 1.0]
   * @param chroma Chroma channel. [0.0, 1.5]
   * @param hue Hue channel. [0.0, 360.0]
   */
  export function lch(lightness: number, chroma: number, hue: number) {
    return new Lcha(lightness, chroma, hue, 1.0);
  }

  /**
   * New `Color` with LCH(ab) representation in sRGB colorspace.
   * @param lightness Lightness channel. [0.0, 1.0]
   * @param chroma Chroma channel. [0.0, 1.5]
   * @param hue Hue channel. [0.0, 360.0]
   * @param alpha Alpha channel. [0.0, 1.0]
   */
  export function lcha(
    lightness: number,
    chroma: number,
    hue: number,
    alpha: number,
  ) {
    return new Lcha(lightness, chroma, hue, alpha);
  }

  /**
   * New `Color` from sRGB colorspace.
   *
   * @example
   * ```ts
   * Color.hex('#ff0000');
   * ```
   */
  export function hex(hex: string) {}

  /// Converts hex bytes to an array of RGB\[A\] components
  ///
  /// # Example
  /// For RGB: *b"ffffff" -> [255, 255, 255, ..]
  /// For RGBA: *b"E2E2E2FF" -> [226, 226, 226, 255, ..]
  export function decode_hex(bytes: number[]) {}

  /// Parse a single hex digit (a-f/A-F/0-9) as a `u8`
  function hex_value(b: number) {
    if (b >= 48 && b <= 57) {
      return b - 48;
    } else if (b >= 65 && b <= 70) {
      return b - 55;
    } else if (b >= 97 && b <= 102) {
      return b - 87;
    } else {
      return 0;
    }
  }

  export function as_linear_rgba_f32() {}

  export const ALICE_BLUE: Color = Color.rgb(0.94, 0.97, 1.0);
  export const ANTIQUE_WHITE: Color = Color.rgb(0.98, 0.92, 0.84);
  export const AQUAMARINE: Color = Color.rgb(0.49, 1.0, 0.83);
  export const AZURE: Color = Color.rgb(0.94, 1.0, 1.0);
  // /// <div style="background-color:rgb(96%, 96%, 86%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const BEIGE: Color = Color.rgb(0.96, 0.96, 0.86);
  // /// <div style="background-color:rgb(100%, 89%, 77%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const BISQUE: Color = Color.rgb(1.0, 0.89, 0.77);
  // /// <div style="background-color:rgb(0%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const BLACK: Color = Color.rgb(0.0, 0.0, 0.0);
  // /// <div style="background-color:rgb(0%, 0%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const BLUE: Color = Color.rgb(0.0, 0.0, 1.0);
  // /// <div style="background-color:rgb(86%, 8%, 24%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const CRIMSON: Color = Color.rgb(0.86, 0.08, 0.24);
  // /// <div style="background-color:rgb(0%, 100%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const CYAN: Color = Color.rgb(0.0, 1.0, 1.0);
  // /// <div style="background-color:rgb(25%, 25%, 25%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const DARK_GRAY: Color = Color.rgb(0.25, 0.25, 0.25);
  // /// <div style="background-color:rgb(0%, 50%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const DARK_GREEN: Color = Color.rgb(0.0, 0.5, 0.0);
  // /// <div style="background-color:rgb(100%, 0%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const FUCHSIA: Color = Color.rgb(1.0, 0.0, 1.0);
  // /// <div style="background-color:rgb(100%, 84%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const GOLD: Color = Color.rgb(1.0, 0.84, 0.0);
  // /// <div style="background-color:rgb(50%, 50%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const GRAY: Color = Color.rgb(0.5, 0.5, 0.5);
  // /// <div style="background-color:rgb(0%, 100%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const GREEN: Color = Color.rgb(0.0, 1.0, 0.0);
  // /// <div style="background-color:rgb(28%, 0%, 51%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const INDIGO: Color = Color.rgb(0.29, 0.0, 0.51);
  // /// <div style="background-color:rgb(20%, 80%, 20%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const LIME_GREEN: Color = Color.rgb(0.2, 0.8, 0.2);
  // /// <div style="background-color:rgb(50%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const MAROON: Color = Color.rgb(0.5, 0.0, 0.0);
  // /// <div style="background-color:rgb(10%, 10%, 44%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const MIDNIGHT_BLUE: Color = Color.rgb(0.1, 0.1, 0.44);
  // /// <div style="background-color:rgb(0%, 0%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const NAVY: Color = Color.rgb(0.0, 0.0, 0.5);
  /// <div style="background-color:rgba(0%, 0%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const NONE: Color = Color.rgba(0.0, 0.0, 0.0, 0.0);
  // /// <div style="background-color:rgb(50%, 50%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const OLIVE: Color = Color.rgb(0.5, 0.5, 0.0);
  // /// <div style="background-color:rgb(100%, 65%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const ORANGE: Color = Color.rgb(1.0, 0.65, 0.0);
  // /// <div style="background-color:rgb(100%, 27%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const ORANGE_RED: Color = Color.rgb(1.0, 0.27, 0.0);
  // /// <div style="background-color:rgb(100%, 8%, 57%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const PINK: Color = Color.rgb(1.0, 0.08, 0.58);
  // /// <div style="background-color:rgb(50%, 0%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const PURPLE: Color = Color.rgb(0.5, 0.0, 0.5);
  // /// <div style="background-color:rgb(100%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const RED: Color = Color.rgb(1.0, 0.0, 0.0);
  // /// <div style="background-color:rgb(98%, 50%, 45%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const SALMON: Color = Color.rgb(0.98, 0.5, 0.45);
  // /// <div style="background-color:rgb(18%, 55%, 34%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const SEA_GREEN: Color = Color.rgb(0.18, 0.55, 0.34);
  // /// <div style="background-color:rgb(75%, 75%, 75%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const SILVER: Color = Color.rgb(0.75, 0.75, 0.75);
  // /// <div style="background-color:rgb(0%, 50%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const TEAL: Color = Color.rgb(0.0, 0.5, 0.5);
  // /// <div style="background-color:rgb(100%, 39%, 28%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const TOMATO: Color = Color.rgb(1.0, 0.39, 0.28);
  // /// <div style="background-color:rgb(25%, 88%, 82%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const TURQUOISE: Color = Color.rgb(0.25, 0.88, 0.82);
  // /// <div style="background-color:rgb(93%, 51%, 93%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const VIOLET: Color = Color.rgb(0.93, 0.51, 0.93);
  // /// <div style="background-color:rgb(100%, 100%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const WHITE: Color = Color.rgb(1.0, 1.0, 1.0);
  // /// <div style="background-color:rgb(100%, 100%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const YELLOW: Color = Color.rgb(1.0, 1.0, 0.0);
  // /// <div style="background-color:rgb(60%, 80%, 20%); width: 10px; padding: 10px; border: 1px solid;"></div>
  export const YELLOW_GREEN: Color = Color.rgb(0.6, 0.8, 0.2);
}
