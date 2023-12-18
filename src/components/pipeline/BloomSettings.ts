import { field } from '@lastolivegames/becsy';

export enum BloomCompositeMode {
  EnergyConserving,
  Additive,
}

/**
 * Applies a bloom effect to an HDR-enabled 2d or 3d camera.
 *
 * Bloom emulates an effect found in real cameras and the human eye,
 * causing halos to appear around very bright parts of the scene.
 *
 * See also <https://en.wikipedia.org/wiki/Bloom_(shader_effect)>.
 *
 * # Usage Notes
 *
 * **Bloom is currently not compatible with WebGL2.**
 *
 * Often used in conjunction with `bevy_pbr::StandardMaterial::emissive` for 3d meshes.
 *
 * Bloom is best used alongside a tonemapping function that desaturates bright colors,
 * such as [`crate::tonemapping::Tonemapping::TonyMcMapface`].
 *
 * Bevy's implementation uses a parametric curve to blend between a set of
 * blurred (lower frequency) images generated from the camera's view.
 * See <https://starlederer.github.io/bloom/> for a visualization of the parametric curve
 * used in Bevy as well as a visualization of the curve's respective scattering profile.
 */
export class BloomSettings {
  /**
   * The default bloom preset.
   */
  static NATURAL = new BloomSettings({
    intensity: 0.15,
    low_frequency_boost: 0.7,
    low_frequency_boost_curvature: 0.95,
    high_pass_frequency: 1.0,
    prefilter_settings_threshold: 0.0,
    prefilter_settings_threshold_softness: 0.0,
    composite_mode: BloomCompositeMode.EnergyConserving,
  });

  /**
   * A preset that's similar to how older games did bloom.
   */
  static OLD_SCHOOL = new BloomSettings({
    intensity: 0.05,
    low_frequency_boost: 0.7,
    low_frequency_boost_curvature: 0.95,
    high_pass_frequency: 1.0,
    prefilter_settings_threshold: 0.6,
    prefilter_settings_threshold_softness: 0.2,
    composite_mode: BloomCompositeMode.Additive,
  });

  /**
   * A preset that applies a very strong bloom, and blurs the whole screen.
   */
  static SCREEN_BLUR = new BloomSettings({
    intensity: 1,
    low_frequency_boost: 0.0,
    low_frequency_boost_curvature: 0.0,
    high_pass_frequency: 1.0 / 3.0,
    prefilter_settings_threshold: 0.0,
    prefilter_settings_threshold_softness: 0.0,
    composite_mode: BloomCompositeMode.EnergyConserving,
  });

  /**
   * Controls the baseline of how much the image is scattered (default: 0.15).
   *
   * This parameter should be used only to control the strength of the bloom
   * for the scene as a whole. Increasing it too much will make the scene appear
   * blurry and over-exposed.
   *
   * To make a mesh glow brighter, rather than increase the bloom intensity,
   * you should increase the mesh's `emissive` value.
   *
   * # In energy-conserving mode
   * The value represents how likely the light is to scatter.
   *
   * The value should be between 0.0 and 1.0 where:
   * * 0.0 means no bloom
   * * 1.0 means the light is scattered as much as possible
   *
   * # In additive mode
   * The value represents how much scattered light is added to
   * the image to create the glow effect.
   *
   * In this configuration:
   * * 0.0 means no bloom
   * * Greater than 0.0 means a proportionate amount of scattered light is added
   */
  @field.float32 declare intensity: number;

  /**
   * Low frequency contribution boost.
   * Controls how much more likely the light
   * is to scatter completely sideways (low frequency image).
   *
   * Comparable to a low shelf boost on an equalizer.
   *
   * # In energy-conserving mode
   * The value should be between 0.0 and 1.0 where:
   * * 0.0 means low frequency light uses base intensity for blend factor calculation
   * * 1.0 means low frequency light contributes at full power
   *
   * # In additive mode
   * The value represents how much scattered light is added to
   * the image to create the glow effect.
   *
   * In this configuration:
   * * 0.0 means no bloom
   * * Greater than 0.0 means a proportionate amount of scattered light is added
   */
  @field.float32 declare low_frequency_boost: number;
  /**
   * Low frequency contribution boost curve.
   * Controls the curvature of the blend factor function
   * making frequencies next to the lowest ones contribute more.
   *
   * Somewhat comparable to the Q factor of an equalizer node.
   *
   * Valid range:
   * * 0.0 - base base intensity and boosted intensity are linearly interpolated
   * * 1.0 - all frequencies below maximum are at boosted intensity level
   */
  @field.float32 declare low_frequency_boost_curvature: number;
  /**
   * Tightens how much the light scatters (default: 1.0).
   *
   * Valid range:
   * * 0.0 - maximum scattering angle is 0 degrees (no scattering)
   * * 1.0 - maximum scattering angle is 90 degrees
   */
  @field.float32 declare high_pass_frequency: number;

  /**
   * Baseline of the quadratic threshold curve (default: 0.0).
   * RGB values under the threshold curve will not contribute to the effect.
   */
  @field.float32 declare prefilter_settings_threshold: number;

  /**
   * Controls how much to blend between the thresholded and non-thresholded colors (default: 0.0).
   * 0.0 = Abrupt threshold, no blending
   * 1.0 = Fully soft threshold
   * Values outside of the range [0.0, 1.0] will be clamped.
   */
  @field.float32 declare prefilter_settings_threshold_softness: number;

  /**
   * Controls whether bloom textures
   * are blended between or added to each other. Useful
   * if image brightening is desired and a must-change
   * if `prefilter_settings` are used.
   */
  @field.int8 declare composite_mode: BloomCompositeMode;

  constructor(
    options?: Partial<{
      intensity: number;
      low_frequency_boost: number;
      low_frequency_boost_curvature: number;
      high_pass_frequency: number;
      prefilter_settings_threshold: number;
      prefilter_settings_threshold_softness: number;
      composite_mode: BloomCompositeMode;
    }>,
  ) {
    const {
      intensity = 0.15,
      low_frequency_boost = 0.0,
      low_frequency_boost_curvature = 0.0,
      high_pass_frequency = 1.0,
      prefilter_settings_threshold = 0.0,
      prefilter_settings_threshold_softness = 0.0,
      composite_mode = BloomCompositeMode.EnergyConserving,
    } = options || {};

    this.intensity = intensity;
    this.low_frequency_boost = low_frequency_boost;
    this.low_frequency_boost_curvature = low_frequency_boost_curvature;
    this.high_pass_frequency = high_pass_frequency;
    this.prefilter_settings_threshold = prefilter_settings_threshold;
    this.prefilter_settings_threshold_softness =
      prefilter_settings_threshold_softness;
    this.composite_mode = composite_mode;
  }
}
