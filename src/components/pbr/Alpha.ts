export type AlphaMode =
  | AlphaMode.Opaque
  | AlphaMode.Mask
  | AlphaMode.Blend
  | AlphaMode.Premultiplied
  | AlphaMode.Add
  | AlphaMode.Multiply;
export namespace AlphaMode {
  /**
   * Base color alpha values are overridden to be fully opaque (1.0).
   */
  export class Opaque {}
  /**
   * Reduce transparency to fully opaque or fully transparent
   * based on a threshold.
   *
   * Compares the base color alpha value to the specified threshold.
   * If the value is below the threshold,
   * considers the color to be fully transparent (alpha is set to 0.0).
   * If it is equal to or above the threshold,
   * considers the color to be fully opaque (alpha is set to 1.0).
   */
  export class Mask {
    value: number;
  }

  /**
   * The base color alpha value defines the opacity of the color.
   * Standard alpha-blending is used to blend the fragment's color
   * with the color behind it.
   */
  export class Blend {}

  /**
   * Similar to [`AlphaMode::Blend`], however assumes RGB channel values are
   * [premultiplied](https://en.wikipedia.org/wiki/Alpha_compositing#Straight_versus_premultiplied).
   *
   * For otherwise constant RGB values, behaves more like [`AlphaMode::Blend`] for
   * alpha values closer to 1.0, and more like [`AlphaMode::Add`] for
   * alpha values closer to 0.0.
   *
   * Can be used to avoid “border” or “outline” artifacts that can occur
   * when using plain alpha-blended textures.
   */
  export class Premultiplied {}

  /**
   * Combines the color of the fragments with the colors behind them in an
   * additive process, (i.e. like light) producing lighter results.
   *
   * Black produces no effect. Alpha values can be used to modulate the result.
   *
   * Useful for effects like holograms, ghosts, lasers and other energy beams.
   */
  export class Add {}

  /**
   * Combines the color of the fragments with the colors behind them in a
   * multiplicative process, (i.e. like pigments) producing darker results.
   *
   * White produces no effect. Alpha values can be used to modulate the result.
   *
   * Useful for effects like stained glass, window tint film and some colored liquids.
   */
  export class Multiply {}
}
