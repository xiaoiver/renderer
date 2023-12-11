import { Vec3 } from '../../math';
import { Color } from '../render';

/**
 * A linear fog falloff that grows in intensity between `start` and `end` distances.
 * This falloff mode is simpler to control than other modes,
 * however it can produce results that look “artificial”, depending on the scene.
 *
 * ```text
 * let fog_intensity = 1.0 - ((end - distance) / (end - start)).clamp(0.0, 1.0);
 * ```
 */
export class Linear {
  /**
   * Distance from the camera where fog is completely transparent, in world units.
   */
  start: number;

  /**
   * Distance from the camera where fog is completely opaque, in world units.
   */
  end: number;

  constructor(
    options: Partial<{
      start: number;
      end: number;
    }>,
  ) {
    const { start = 0, end = 100 } = options || {};
    this.start = start;
    this.end = end;
  }
}

/**
 * An exponential fog falloff with a given `density`.
 *
 * Initially gains intensity quickly with distance, then more slowly.
 * Typically produces more natural results than [`FogFalloff.Linear`], but is a bit harder to control.
 *
 * To move the fog “further away”, use lower density values. To move it “closer” use higher density values.
 *
 * The fog intensity for a given point in the scene is determined by the following formula:
 * ```text
 * let fog_intensity = 1.0 - 1.0 / (distance * density).exp();
 * ```
 */
export class Exponential {
  /**
   * Multiplier applied to the world distance (within the exponential fog falloff calculation).
   */
  density: number;
  constructor(
    options: Partial<{
      density: number;
    }>,
  ) {
    const { density = 0 } = options || {};
    this.density = density;
  }
}

/**
 * A squared exponential fog falloff with a given `density`.
 *
 * Similar to [`FogFalloff.Exponential`],
 * but grows more slowly in intensity for closer distances before “catching up”.
 *
 * To move the fog “further away”, use lower density values. To move it “closer” use higher density values.
 */
export class ExponentialSquared {
  /**
   * Multiplier applied to the world distance (within the exponential squared fog falloff calculation).
   */
  density: number;
  constructor(
    options: Partial<{
      density: number;
    }>,
  ) {
    const { density = 0 } = options || {};
    this.density = density;
  }
}

/**
 * A more general form of the [`FogFalloff.Exponential`] mode.
 * The falloff formula is separated into two terms, `extinction` and `inscattering`,
 * for a somewhat simplified atmospheric scattering model.
 * Additionally, individual color channels can have their own density values,
 * resulting in a total of six different configuration parameters.
 *
 * ## Formula
 * Unlike other modes, atmospheric falloff doesn't use a simple intensity-based blend of fog color with
 * object color. Instead, it calculates per-channel extinction and inscattering factors, which are
 * then used to calculate the final color.
 *
 * ```text
 * let extinction_factor = 1.0 - 1.0 / (distance * extinction).exp();
 * let inscattering_factor = 1.0 - 1.0 / (distance * inscattering).exp();
 * let result = input_color * (1.0 - extinction_factor) + fog_color * inscattering_factor;
 * ```
 *
 * ## Equivalence to [`FogFalloff.Exponential`]
 * For a density value of `D`, the following two falloff modes will produce identical visual results:
 * ```ts
 * let exponential = new FogFalloff.Exponential({
 *    density: D,
 * });
 * let atmospheric = new FogFalloff.Atmospheric({
 *    extinction: new Vec3(D, D, D),
 *    inscattering: new Vec3(D, D, D),
 * });
 * ```
 * **Note:** While the results are identical, [`FogFalloff.Atmospheric`] is computationally more expensive.
 */
export class Atmospheric {
  /**
   * Controls how much light is removed due to atmospheric “extinction”, i.e. loss of light due to
   * photons being absorbed by atmospheric particles.
   *
   * Each component can be thought of as an independent per `R`/`G`/`B` channel `density` factor from
   * [`FogFalloff.Exponential`]: Multiplier applied to the world distance (within the fog
   * falloff calculation) for that specific channel.
   *
   * **Note:**
   * This value is not a `Color`, since it affects the channels exponentially in a non-intuitive way.
   * For artistic control, use the [`FogFalloff.from_visibility_colors()`] convenience method.
   */
  extinction: Vec3;

  /* Controls how much light is added due to light scattering from the sun through the atmosphere.
   *
   * Each component can be thought of as an independent per `R`/`G`/`B` channel `density` factor from
   * [`FogFalloff.Exponential`]: A multiplier applied to the world distance (within the fog
   * falloff calculation) for that specific channel.
   *
   * **Note:**
   * This value is not a `Color`, since it affects the channels exponentially in a non-intuitive way.
   * For artistic control, use the [`FogFalloff.from_visibility_colors()`] convenience method.
   */
  inscattering: Vec3;

  constructor(
    options: Partial<{
      extinction: Vec3;
      inscattering: Vec3;
    }>,
  ) {
    const { extinction, inscattering } = options || {};
    this.extinction = extinction;
    this.inscattering = inscattering;
  }
}

/**
 * Allows switching between different fog falloff modes, and configuring their parameters.
 *
 * When using non-linear fog modes it can be hard to determine the right parameter values
 * for a given scene.
 *
 * For easier artistic control, instead of creating the enum variants directly,
 * you can use the visibility-based convenience methods:
 *
 * - For `FogFalloff.Exponential`:
 *    - [`FogFalloff.from_visibility()`]
 *    - [`FogFalloff.from_visibility_contrast()`]
 *
 * - For `FogFalloff.ExponentialSquared`:
 *    - [`FogFalloff.from_visibility_squared()`]
 *    - [`FogFalloff.from_visibility_contrast_squared()`]
 *
 * - For `FogFalloff.Atmospheric`:
 *    - [`FogFalloff.from_visibility_color()`]
 *    - [`FogFalloff.from_visibility_colors()`]
 *    - [`FogFalloff.from_visibility_contrast_color()`]
 *    - [`FogFalloff.from_visibility_contrast_colors()`]
 */
export type FogFalloff =
  | Linear
  | Exponential
  | ExponentialSquared
  | Atmospheric;
export namespace FogFalloff {
  /**
   * A 2% contrast threshold was originally proposed by Koschmieder, being the
   * minimum visual contrast at which a human observer could detect an object.
   * We use a revised 5% contrast threshold, deemed more realistic for typical human observers.
   */
  export const REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD = 0.05;

  /**
   * Calculates the extinction coefficient β, from V and Cₜ, where:
   *
   * - Cₜ is the contrast threshold, in the range of `0.0` to `1.0`
   * - V is the visibility distance in which a perfectly black object is still identifiable
   *   against the horizon sky within the contrast threshold
   *
   * We start with Koschmieder's equation:
   *
   * ```text
   *       -ln(Cₜ)
   *  V = ─────────
   *          β
   * ```
   *
   * Multiplying both sides by β/V, that gives us:
   *
   * ```text
   *       -ln(Cₜ)
   *  β = ─────────
   *          V
   * ```
   *
   * See:
   * - <https://en.wikipedia.org/wiki/Visibility>
   * - <https://www.biral.com/wp-content/uploads/2015/02/Introduction_to_visibility-v2-2.pdf>
   */
  export function koschmieder(v: number, c_t: number) {
    return Math.log(-c_t) / v;
  }

  /**
   * Creates a [`FogFalloff.Exponential`] value from the given visibility distance in world units,
   * using the revised Koschmieder contrast threshold, [`FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD`].
   */
  export function from_visibility(visibility: number) {
    return FogFalloff.from_visibility_contrast(
      visibility,
      FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,
    );
  }

  /**
   * Creates a [`FogFalloff.Exponential`] value from the given visibility distance in world units,
   * and a given contrast threshold in the range of `0.0` to `1.0`.
   */
  export function from_visibility_contrast(
    visibility: number,
    contrast_threshold: number,
  ): FogFalloff {
    return new Exponential({
      density: FogFalloff.koschmieder(visibility, contrast_threshold),
    });
  }

  /**
   * Creates a [`FogFalloff.ExponentialSquared`] value from the given visibility distance in world units,
   * using the revised Koschmieder contrast threshold, [`FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD`].
   */
  export function from_visibility_squared(visibility: number) {
    return FogFalloff.from_visibility_contrast_squared(
      visibility,
      FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,
    );
  }

  /**
   * Creates a [`FogFalloff.ExponentialSquared`] value from the given visibility distance in world units,
   * and a given contrast threshold in the range of `0.0` to `1.0`.
   */
  export function from_visibility_contrast_squared(
    visibility: number,
    contrast_threshold: number,
  ) {
    return new ExponentialSquared({
      density: Math.sqrt(
        FogFalloff.koschmieder(visibility, contrast_threshold) / visibility,
      ),
    });
  }

  /**
   * Creates a [`FogFalloff.Atmospheric`] value from the given visibility distance in world units,
   * and a shared color for both extinction and inscattering, using the revised Koschmieder contrast threshold,
   * [`FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD`].
   */
  export function from_visibility_color(
    visibility: number,
    extinction_inscattering_color: Color,
  ) {
    return FogFalloff.from_visibility_contrast_colors(
      visibility,
      FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,
      extinction_inscattering_color,
      extinction_inscattering_color,
    );
  }

  /**
   * Creates a [`FogFalloff.Atmospheric`] value from the given visibility distance in world units,
   * extinction and inscattering colors, using the revised Koschmieder contrast threshold,
   * [`FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD`].
   *
   * ## Tips
   * - Alpha values of the provided colors can modulate the `extinction` and `inscattering` effects;
   * - Using an `extinction_color` of [`Color.WHITE`] or [`Color.NONE`] disables the extinction effect;
   * - Using an `inscattering_color` of [`Color.BLACK`] or [`Color.NONE`] disables the inscattering effect.
   */
  export function from_visibility_colors(
    visibility: number,
    extinction_color: Color,
    inscattering_color: Color,
  ) {
    return FogFalloff.from_visibility_contrast_colors(
      visibility,
      FogFalloff.REVISED_KOSCHMIEDER_CONTRAST_THRESHOLD,
      extinction_color,
      inscattering_color,
    );
  }

  /**
   * Creates a [`FogFalloff.Atmospheric`] value from the given visibility distance in world units,
   * a contrast threshold in the range of `0.0` to `1.0`, and a shared color for both extinction and inscattering.
   */
  export function from_visibility_contrast_color(
    visibility: number,
    contrast_threshold: number,
    extinction_inscattering_color: Color,
  ) {
    return FogFalloff.from_visibility_contrast_colors(
      visibility,
      contrast_threshold,
      extinction_inscattering_color,
      extinction_inscattering_color,
    );
  }

  /**
   * Creates a [`FogFalloff.Atmospheric`] value from the given visibility distance in world units,
   * a contrast threshold in the range of `0.0` to `1.0`, extinction and inscattering colors.
   *
   * ## Tips
   * - Alpha values of the provided colors can modulate the `extinction` and `inscattering` effects;
   * - Using an `extinction_color` of [`Color.WHITE`] or [`Color.NONE`] disables the extinction effect;
   * - Using an `inscattering_color` of [`Color.BLACK`] or [`Color.NONE`] disables the inscattering effect.
   */
  export function from_visibility_contrast_colors(
    visibility: number,
    contrast_threshold: number,
    extinction_color: Color,
    inscattering_color: Color,
  ) {
    const E = Math.E;
    let [r_e, g_e, b_e, a_e] = extinction_color.as_linear_rgba_f32();
    let [r_i, g_i, b_i, a_i] = inscattering_color.as_linear_rgba_f32();

    return new Atmospheric({
      extinction: new Vec3(
        // Values are subtracted from 1.0 here to preserve the intuitive/artistic meaning of
        // colors, since they're later subtracted. (e.g. by giving a blue extinction color, you
        // get blue and _not_ yellow results)
        Math.pow(1.0 - r_e, E),
        Math.pow(1.0 - g_e, E),
        Math.pow(1.0 - b_e, E),
      )
        .mul_assign(FogFalloff.koschmieder(visibility, contrast_threshold))
        .mul_assign(Math.pow(a_e, E)),
      inscattering: new Vec3(
        Math.pow(r_i, E),
        Math.pow(g_i, E),
        Math.pow(b_i, E),
      )
        .mul_assign(FogFalloff.koschmieder(visibility, contrast_threshold))
        .mul_assign(Math.pow(a_i, E)),
    });
  }
}
