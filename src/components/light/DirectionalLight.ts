import { field } from '@lastolivegames/becsy';
import { Color } from '../render';
import { Resource } from '../../Resource';

/// A Directional light.
///
/// Directional lights don't exist in reality but they are a good
/// approximation for light sources VERY far away, like the sun or
/// the moon.
///
/// The light shines along the forward direction of the entity's transform. With a default transform
/// this would be along the negative-Z axis.
///
/// Valid values for `illuminance` are:
///
/// | Illuminance (lux) | Surfaces illuminated by                        |
/// |-------------------|------------------------------------------------|
/// | 0.0001            | Moonless, overcast night sky (starlight)       |
/// | 0.002             | Moonless clear night sky with airglow          |
/// | 0.05–0.3          | Full moon on a clear night                     |
/// | 3.4               | Dark limit of civil twilight under a clear sky |
/// | 20–50             | Public areas with dark surroundings            |
/// | 50                | Family living room lights                      |
/// | 80                | Office building hallway/toilet lighting        |
/// | 100               | Very dark overcast day                         |
/// | 150               | Train station platforms                        |
/// | 320–500           | Office lighting                                |
/// | 400               | Sunrise or sunset on a clear day.              |
/// | 1000              | Overcast day; typical TV studio lighting       |
/// | 10,000–25,000     | Full daylight (not direct sun)                 |
/// | 32,000–100,000    | Direct sunlight                                |
///
/// Source: [Wikipedia](https://en.wikipedia.org/wiki/Lux)
///
/// ## Shadows
///
/// To enable shadows, set the `shadows_enabled` property to `true`.
///
/// Shadows are produced via [cascaded shadow maps](https://developer.download.nvidia.com/SDK/10.5/opengl/src/cascaded_shadow_maps/doc/cascaded_shadow_maps.pdf).
///
/// To modify the cascade set up, such as the number of cascades or the maximum shadow distance,
/// change the [`CascadeShadowConfig`] component of the [`crate::bundle::DirectionalLightBundle`].
///
/// To control the resolution of the shadow maps, use the [`DirectionalLightShadowMap`] resource:
///
/// ```
/// # use bevy_app::prelude::*;
/// # use bevy_pbr::DirectionalLightShadowMap;
/// App::new()
///     .insert_resource(DirectionalLightShadowMap { size: 2048 });
/// ```
export class DirectionalLight {
  static DEFAULT_SHADOW_DEPTH_BIAS = 0.02;
  static DEFAULT_SHADOW_NORMAL_BIAS = 1.8;

  @field.object declare color: Color;
  /**
   * Illuminance in lux
   */
  @field.float32 declare illuminance: number;
  @field.boolean declare shadows_enabled: boolean;
  @field.float32 declare shadow_depth_bias: number;
  /**
   * A bias applied along the direction of the fragment's surface normal. It is scaled to the
   * shadow map's texel size so that it is automatically adjusted to the orthographic projection.
   */
  @field.float32 declare shadow_normal_bias: number;

  constructor(
    options?: Partial<{
      color: Color;
      illuminance: number;
      shadows_enabled: boolean;
      shadow_depth_bias: number;
      shadow_normal_bias: number;
    }>,
  ) {
    const {
      color = Color.rgb(1, 1, 1),
      illuminance = 100000.0,
      shadows_enabled = false,
      shadow_depth_bias = DirectionalLight.DEFAULT_SHADOW_DEPTH_BIAS,
      shadow_normal_bias = DirectionalLight.DEFAULT_SHADOW_NORMAL_BIAS,
    } = options || {};
    this.color = color;
    this.illuminance = illuminance;
    this.shadows_enabled = shadows_enabled;
    this.shadow_depth_bias = shadow_depth_bias;
    this.shadow_normal_bias = shadow_normal_bias;
  }
}

/**
 * Controls the resolution of [`DirectionalLight`] shadow maps.
 */
export class DirectionalLightShadowMap implements Resource {
  constructor(public size: number = 2048) {}
}
