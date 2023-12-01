import { field } from '@lastolivegames/becsy';

/**
 * Configures basic color grading parameters to adjust the image appearance.
 * Grading is applied just before/after tonemapping for a given [`Camera`](crate::camera::Camera) entity.
 */
export class ColorGrading {
  /**
   * Exposure value (EV) offset, measured in stops.
   */
  @field.float32 declare exposure: number;

  /**
   * Non-linear luminance adjustment applied before tonemapping. y = pow(x, gamma)
   */
  @field.float32 declare gamma: number;

  /**
   * Saturation adjustment applied before tonemapping.
   * Values below 1.0 desaturate, with a value of 0.0 resulting in a grayscale image
   * with luminance defined by ITU-R BT.709.
   * Values above 1.0 increase saturation.
   */
  @field.float32 declare pre_saturation: number;

  /**
   * Saturation adjustment applied after tonemapping.
   * Values below 1.0 desaturate, with a value of 0.0 resulting in a grayscale image
   * with luminance defined by ITU-R BT.709
   * Values above 1.0 increase saturation.
   */
  @field.float32 declare post_saturation: number;

  constructor(options?: {
    exposure?: number;
    gamma?: number;
    pre_saturation?: number;
    post_saturation?: number;
  }) {
    const {
      exposure = 0.0,
      gamma = 1.0,
      pre_saturation = 1.0,
      post_saturation = 1.0,
    } = options || {};

    this.exposure = exposure;
    this.gamma = gamma;
    this.pre_saturation = pre_saturation;
    this.post_saturation = post_saturation;
  }
}
