/**
 * sRGBA color
 */
export class Rgba {
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
  ) {}
}

/**
 * RGBA color in the Linear sRGB colorspace (often colloquially referred to as "linear", "RGB", or "linear RGB").
 */
export class RgbaLinear {
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
  ) {}
}

/**
 * HSL (hue, saturation, lightness) color with an alpha channel
 */
export class Hsla {
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
  ) {}
}

/**
 * LCH(ab) (lightness, chroma, hue) color with an alpha channel
 */
export class Lcha {
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
  ) {}
}

export class Color {
  /// <div style="background-color:rgb(94%, 97%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static ALICE_BLUE: Color = Color.rgb(0.94, 0.97, 1.0);
  /// <div style="background-color:rgb(98%, 92%, 84%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static ANTIQUE_WHITE: Color = Color.rgb(0.98, 0.92, 0.84);
  /// <div style="background-color:rgb(49%, 100%, 83%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static AQUAMARINE: Color = Color.rgb(0.49, 1.0, 0.83);
  /// <div style="background-color:rgb(94%, 100%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static AZURE: Color = Color.rgb(0.94, 1.0, 1.0);
  /// <div style="background-color:rgb(96%, 96%, 86%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static BEIGE: Color = Color.rgb(0.96, 0.96, 0.86);
  /// <div style="background-color:rgb(100%, 89%, 77%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static BISQUE: Color = Color.rgb(1.0, 0.89, 0.77);
  /// <div style="background-color:rgb(0%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static BLACK: Color = Color.rgb(0.0, 0.0, 0.0);
  /// <div style="background-color:rgb(0%, 0%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static BLUE: Color = Color.rgb(0.0, 0.0, 1.0);
  /// <div style="background-color:rgb(86%, 8%, 24%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static CRIMSON: Color = Color.rgb(0.86, 0.08, 0.24);
  /// <div style="background-color:rgb(0%, 100%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static CYAN: Color = Color.rgb(0.0, 1.0, 1.0);
  /// <div style="background-color:rgb(25%, 25%, 25%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static DARK_GRAY: Color = Color.rgb(0.25, 0.25, 0.25);
  /// <div style="background-color:rgb(0%, 50%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static DARK_GREEN: Color = Color.rgb(0.0, 0.5, 0.0);
  /// <div style="background-color:rgb(100%, 0%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static FUCHSIA: Color = Color.rgb(1.0, 0.0, 1.0);
  /// <div style="background-color:rgb(100%, 84%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static GOLD: Color = Color.rgb(1.0, 0.84, 0.0);
  /// <div style="background-color:rgb(50%, 50%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static GRAY: Color = Color.rgb(0.5, 0.5, 0.5);
  /// <div style="background-color:rgb(0%, 100%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static GREEN: Color = Color.rgb(0.0, 1.0, 0.0);
  /// <div style="background-color:rgb(28%, 0%, 51%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static INDIGO: Color = Color.rgb(0.29, 0.0, 0.51);
  /// <div style="background-color:rgb(20%, 80%, 20%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static LIME_GREEN: Color = Color.rgb(0.2, 0.8, 0.2);
  /// <div style="background-color:rgb(50%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static MAROON: Color = Color.rgb(0.5, 0.0, 0.0);
  /// <div style="background-color:rgb(10%, 10%, 44%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static MIDNIGHT_BLUE: Color = Color.rgb(0.1, 0.1, 0.44);
  /// <div style="background-color:rgb(0%, 0%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static NAVY: Color = Color.rgb(0.0, 0.0, 0.5);
  /// <div style="background-color:rgba(0%, 0%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static NONE: Color = Color.rgba(0.0, 0.0, 0.0, 0.0);
  /// <div style="background-color:rgb(50%, 50%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static OLIVE: Color = Color.rgb(0.5, 0.5, 0.0);
  /// <div style="background-color:rgb(100%, 65%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static ORANGE: Color = Color.rgb(1.0, 0.65, 0.0);
  /// <div style="background-color:rgb(100%, 27%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static ORANGE_RED: Color = Color.rgb(1.0, 0.27, 0.0);
  /// <div style="background-color:rgb(100%, 8%, 57%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static PINK: Color = Color.rgb(1.0, 0.08, 0.58);
  /// <div style="background-color:rgb(50%, 0%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static PURPLE: Color = Color.rgb(0.5, 0.0, 0.5);
  /// <div style="background-color:rgb(100%, 0%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static RED: Color = Color.rgb(1.0, 0.0, 0.0);
  /// <div style="background-color:rgb(98%, 50%, 45%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static SALMON: Color = Color.rgb(0.98, 0.5, 0.45);
  /// <div style="background-color:rgb(18%, 55%, 34%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static SEA_GREEN: Color = Color.rgb(0.18, 0.55, 0.34);
  /// <div style="background-color:rgb(75%, 75%, 75%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static SILVER: Color = Color.rgb(0.75, 0.75, 0.75);
  /// <div style="background-color:rgb(0%, 50%, 50%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static TEAL: Color = Color.rgb(0.0, 0.5, 0.5);
  /// <div style="background-color:rgb(100%, 39%, 28%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static TOMATO: Color = Color.rgb(1.0, 0.39, 0.28);
  /// <div style="background-color:rgb(25%, 88%, 82%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static TURQUOISE: Color = Color.rgb(0.25, 0.88, 0.82);
  /// <div style="background-color:rgb(93%, 51%, 93%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static VIOLET: Color = Color.rgb(0.93, 0.51, 0.93);
  /// <div style="background-color:rgb(100%, 100%, 100%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static WHITE: Color = Color.rgb(1.0, 1.0, 1.0);
  /// <div style="background-color:rgb(100%, 100%, 0%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static YELLOW: Color = Color.rgb(1.0, 1.0, 0.0);
  /// <div style="background-color:rgb(60%, 80%, 20%); width: 10px; padding: 10px; border: 1px solid;"></div>
  static YELLOW_GREEN: Color = Color.rgb(0.6, 0.8, 0.2);

  static rgb(r: number, g: number, b: number): Color {
    return Color.rgba(r, g, b, 1.0);
  }

  static rgba(r: number, g: number, b: number, a: number): Color {
    return new Rgba(r, g, b, a);
  }

  /**
   * New `Color` from linear RGB colorspace.
   */
  static rgb_linear(r: number, g: number, b: number): Color {
    return new RgbaLinear(r, g, b, 1.0);
  }
}
