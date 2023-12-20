import { field } from '@lastolivegames/becsy';

/**
 * Controls how cascaded shadow mapping works.
 * Prefer using [`CascadeShadowConfigBuilder`] to construct an instance.
 *
 * @example
 * const config: CascadeShadowConfig = new CascadeShadowConfigBuilder({
 *    maximum_distance: 100.0,
 * }).build();
 */
export class CascadeShadowConfig {
  @field.object declare bounds: number[];
  /**
   * The proportion of overlap each cascade has with the previous cascade.
   */
  @field.float32 declare overlap_proportion: number;

  /**
   * The (positive) distance to the near boundary of the first cascade.
   */
  @field.float32 declare minimum_distance: number;

  constructor(
    options?: Partial<{
      bounds: number[];
      overlap_proportion: number;
      minimum_distance: number;
    }>,
  ) {
    const {
      bounds = [0, 0, 0, 0],
      overlap_proportion = 0.4,
      minimum_distance = 0,
    } = options || {};

    this.bounds = bounds;
    this.overlap_proportion = overlap_proportion;
    this.minimum_distance = minimum_distance;
  }
}

/**
 * Builder for `CascadeShadowConfig`.
 */
export class CascadeShadowConfigBuilder {
  /// The number of shadow cascades.
  /// More cascades increases shadow quality by mitigating perspective aliasing - a phenomenon where areas
  /// nearer the camera are covered by fewer shadow map texels than areas further from the camera, causing
  /// blocky looking shadows.
  ///
  /// This does come at the cost increased rendering overhead, however this overhead is still less
  /// than if you were to use fewer cascades and much larger shadow map textures to achieve the
  /// same quality level.
  ///
  /// In case rendered geometry covers a relatively narrow and static depth relative to camera, it may
  /// make more sense to use fewer cascades and a higher resolution shadow map texture as perspective aliasing
  /// is not as much an issue. Be sure to adjust `minimum_distance` and `maximum_distance` appropriately.
  num_cascades: number;
  /// The minimum shadow distance, which can help improve the texel resolution of the first cascade.
  /// Areas nearer to the camera than this will likely receive no shadows.
  ///
  /// NOTE: Due to implementation details, this usually does not impact shadow quality as much as
  /// `first_cascade_far_bound` and `maximum_distance`. At many view frustum field-of-views, the
  /// texel resolution of the first cascade is dominated by the width / height of the view frustum plane
  /// at `first_cascade_far_bound` rather than the depth of the frustum from `minimum_distance` to
  /// `first_cascade_far_bound`.
  minimum_distance: number;
  /// The maximum shadow distance.
  /// Areas further from the camera than this will likely receive no shadows.
  maximum_distance: number;
  /// Sets the far bound of the first cascade, relative to the view origin.
  /// In-between cascades will be exponentially spaced relative to the maximum shadow distance.
  /// NOTE: This is ignored if there is only one cascade, the maximum distance takes precedence.
  first_cascade_far_bound: number;
  /// Sets the overlap proportion between cascades.
  /// The overlap is used to make the transition from one cascade's shadow map to the next
  /// less abrupt by blending between both shadow maps.
  overlap_proportion: number;

  constructor(
    options?: Partial<{
      num_cascades: number;
      minimum_distance: number;
      maximum_distance: number;
      first_cascade_far_bound: number;
      overlap_proportion: number;
    }>,
  ) {
    const {
      num_cascades = 4,
      minimum_distance = 0.1,
      maximum_distance = 1000,
      first_cascade_far_bound = 5,
      overlap_proportion = 0.2,
    } = options || {};

    this.num_cascades = num_cascades;
    this.minimum_distance = minimum_distance;
    this.maximum_distance = maximum_distance;
    this.first_cascade_far_bound = first_cascade_far_bound;
    this.overlap_proportion = overlap_proportion;
  }

  build(): CascadeShadowConfig {
    return new CascadeShadowConfig({
      bounds: calculate_cascade_bounds(
        this.num_cascades,
        this.first_cascade_far_bound,
        this.maximum_distance,
      ),
      overlap_proportion: this.overlap_proportion,
      minimum_distance: this.minimum_distance,
    });
  }
}

function calculate_cascade_bounds(
  num_cascades: number,
  nearest_bound: number,
  shadow_maximum_distance: number,
) {
  if (num_cascades === 1) {
    return [shadow_maximum_distance];
  }
  const base = Math.pow(
    shadow_maximum_distance / nearest_bound,
    1.0 / (num_cascades - 1),
  );
  return new Array(num_cascades).map((i) => nearest_bound * Math.pow(base, i));
}
