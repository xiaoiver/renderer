import { field } from '@lastolivegames/becsy';
import { PositionVisibility, Rotation, ScaleOpacity } from './f32';
import { SphericalHarmonicCoefficients } from './SphericalHarmonicCoefficients';

export class Gaussian {
  @field.object declare rotation: Rotation;
  @field.object declare position_visibility: PositionVisibility;
  @field.object declare scale_opacity: ScaleOpacity;
  @field.object declare spherical_harmonic: SphericalHarmonicCoefficients;

  constructor(
    options?: Partial<{
      rotation: Rotation;
      position_visibility: PositionVisibility;
      scale_opacity: ScaleOpacity;
      spherical_harmonic: SphericalHarmonicCoefficients;
    }>,
  ) {
    const {
      rotation = new Rotation(),
      position_visibility = new PositionVisibility(),
      scale_opacity = new ScaleOpacity(),
      spherical_harmonic = new SphericalHarmonicCoefficients(),
    } = options || {};

    this.rotation = rotation;
    this.position_visibility = position_visibility;
    this.scale_opacity = scale_opacity;
    this.spherical_harmonic = spherical_harmonic;
  }
}
