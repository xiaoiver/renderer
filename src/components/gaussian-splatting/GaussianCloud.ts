import { field } from '@lastolivegames/becsy';
import { Gaussian } from './Gaussian';
import { SphericalHarmonicCoefficients } from './SphericalHarmonicCoefficients';
import { PositionVisibility, Rotation, ScaleOpacity } from './f32';
import { resize } from '../../utils/array';

export class GaussianCloud {
  @field.object declare position_visibility: PositionVisibility[];

  @field.object declare spherical_harmonic: SphericalHarmonicCoefficients[];

  @field.object declare rotation: Rotation[];

  @field.object declare scale_opacity: ScaleOpacity[];

  static from_gaussians(gaussians: Gaussian[]) {
    const position_visibility = [];
    const spherical_harmonic = [];
    const rotation = [];
    const scale_opacity = [];

    // #[cfg(feature = "precompute_covariance_3d")]
    // let mut covariance_3d_opacity_packed128 = Vec::with_capacity(gaussians.len());

    // #[cfg(not(feature = "precompute_covariance_3d"))]
    // let mut rotation_scale_opacity_packed128 = Vec::with_capacity(gaussians.len());

    for (const gaussian of gaussians) {
      position_visibility.push(gaussian.position_visibility);
      spherical_harmonic.push(gaussian.spherical_harmonic);
      rotation.push(gaussian.rotation);
      scale_opacity.push(gaussian.scale_opacity);

      // #[cfg(feature = "precompute_covariance_3d")]
      // covariance_3d_opacity_packed128.push(Covariance3dOpacityPacked128::from_gaussian(&gaussian));

      // #[cfg(not(feature = "precompute_covariance_3d"))]
      // rotation_scale_opacity_packed128.push(RotationScaleOpacityPacked128::from_gaussian(&gaussian));
    }

    const cloud = new GaussianCloud({
      position_visibility,
      spherical_harmonic,
      rotation,
      scale_opacity,
      // #[cfg(feature = "precompute_covariance_3d")]
      // covariance_3d_opacity_packed128,
      // #[cfg(not(feature = "precompute_covariance_3d"))]
      // rotation_scale_opacity_packed128,
    });

    // cloud.resize_to_square();

    return cloud;
  }

  constructor(
    options?: Partial<{
      position_visibility: PositionVisibility[];
      spherical_harmonic: SphericalHarmonicCoefficients[];
      rotation: Rotation[];
      scale_opacity: ScaleOpacity[];
    }>,
  ) {
    const {
      position_visibility = [],
      spherical_harmonic = [],
      rotation = [],
      scale_opacity = [],
    } = options || {};

    this.position_visibility = position_visibility;
    this.spherical_harmonic = spherical_harmonic;
    this.rotation = rotation;
    this.scale_opacity = scale_opacity;
  }

  is_empty() {
    return this.position_visibility.length === 0;
  }

  len() {
    return this.position_visibility.length;
  }

  len_sqrt_ceil() {
    return Math.ceil(Math.sqrt(this.len()));
  }

  square_len() {
    return Math.pow(this.len_sqrt_ceil(), 2);
  }

  resize_to_square() {
    resize(
      this.position_visibility,
      this.square_len(),
      new PositionVisibility(),
    );
    resize(
      this.spherical_harmonic,
      this.square_len(),
      new SphericalHarmonicCoefficients(),
    );
    // #[cfg(feature = "precompute_covariance_3d")]
    // self.covariance_3d_opacity_packed128.resize(self.square_len(), Covariance3dOpacityPacked128::default());
    // #[cfg(not(feature = "precompute_covariance_3d"))]
    // self.rotation_scale_opacity_packed128.resize(self.square_len(), RotationScaleOpacityPacked128::default());
  }
}
