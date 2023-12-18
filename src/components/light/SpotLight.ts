import { field } from '@lastolivegames/becsy';
import { Color } from '../render';

/**
 * A light that emits light in a given direction from a central point.
 * Behaves like a point light in a perfectly absorbent housing that shines light only in a given direction.
 * The direction is taken from the transform, and can be specified with [`Transform.looking_at`].
 */
export class SpotLight {
  static DEFAULT_SHADOW_DEPTH_BIAS = 0.02;
  static DEFAULT_SHADOW_NORMAL_BIAS = 1.8;

  @field.object declare color: Color;
  /// Luminous power in lumens
  @field.float32 declare intensity: number;
  @field.float32 declare range: number;
  @field.float32 declare radius: number;
  @field.boolean declare shadows_enabled: boolean;
  @field.float32 declare shadow_depth_bias: number;
  /// A bias applied along the direction of the fragment's surface normal. It is scaled to the
  /// shadow map's texel size so that it can be small close to the camera and gets larger further
  /// away.
  @field.float32 declare shadow_normal_bias: number;
  /// Angle defining the distance from the spot light direction to the outer limit
  /// of the light's cone of effect.
  /// `outer_angle` should be < `PI / 2.0`.
  /// `PI / 2.0` defines a hemispherical spot light, but shadows become very blocky as the angle
  /// approaches this limit.
  @field.float32 declare outer_angle: number;
  /// Angle defining the distance from the spot light direction to the inner limit
  /// of the light's cone of effect.
  /// Light is attenuated from `inner_angle` to `outer_angle` to give a smooth falloff.
  /// `inner_angle` should be <= `outer_angle`
  @field.float32 declare inner_angle: number;

  constructor(
    options?: Partial<{
      color: Color;
      intensity: number;
      range: number;
      radius: number;
      shadows_enabled: boolean;
      shadow_depth_bias: number;
      shadow_normal_bias: number;
      outer_angle: number;
      inner_angle: number;
    }>,
  ) {
    const {
      color = Color.rgb(1, 1, 1),
      intensity = 800, // Roughly a 60W non-halogen incandescent bulb
      range = 20,
      radius = 0,
      shadows_enabled = false,
      shadow_depth_bias = SpotLight.DEFAULT_SHADOW_DEPTH_BIAS,
      shadow_normal_bias = SpotLight.DEFAULT_SHADOW_NORMAL_BIAS,
      outer_angle = Math.PI / 4.0,
      inner_angle = 0.0,
    } = options || {};
    this.color = color;
    this.intensity = intensity;
    this.range = range;
    this.radius = radius;
    this.shadows_enabled = shadows_enabled;
    this.shadow_depth_bias = shadow_depth_bias;
    this.shadow_normal_bias = shadow_normal_bias;
    this.outer_angle = outer_angle;
    this.inner_angle = inner_angle;
  }
}
