import { Gaussian } from './Gaussian';
import { SphericalHarmonicCoefficients } from './SphericalHarmonicCoefficients';
import {
  Covariance3dOpacityPacked128,
  RotationScaleOpacityPacked128,
} from './f16';
import { PositionVisibility } from './f32';

export class GaussianCloud {
  position_visibility: PositionVisibility[];

  spherical_harmonic: SphericalHarmonicCoefficients[];

  rotation_scale_opacity_packed128: RotationScaleOpacityPacked128[];

  covariance_3d_opacity_packed128: Covariance3dOpacityPacked128[];

  static from_gaussians(gaussians: Gaussian[]) {
    const position_visibility = [];
    const spherical_harmonic = [];

    // #[cfg(feature = "precompute_covariance_3d")]
    // let mut covariance_3d_opacity_packed128 = Vec::with_capacity(gaussians.len());

    // #[cfg(not(feature = "precompute_covariance_3d"))]
    // let mut rotation_scale_opacity_packed128 = Vec::with_capacity(gaussians.len());

    for (const gaussian of gaussians) {
      position_visibility.push(gaussian.position_visibility);
      spherical_harmonic.push(gaussian.spherical_harmonic);

      // #[cfg(feature = "precompute_covariance_3d")]
      // covariance_3d_opacity_packed128.push(Covariance3dOpacityPacked128::from_gaussian(&gaussian));

      // #[cfg(not(feature = "precompute_covariance_3d"))]
      // rotation_scale_opacity_packed128.push(RotationScaleOpacityPacked128::from_gaussian(&gaussian));
    }

    const cloud = new GaussianCloud({
      position_visibility,
      spherical_harmonic,
      // #[cfg(feature = "precompute_covariance_3d")]
      // covariance_3d_opacity_packed128,
      // #[cfg(not(feature = "precompute_covariance_3d"))]
      // rotation_scale_opacity_packed128,
    });

    cloud.resize_to_square();

    return cloud;
  }

  constructor(
    options?: Partial<{
      position_visibility: PositionVisibility[];
      spherical_harmonic: SphericalHarmonicCoefficients[];
      rotation_scale_opacity_packed128: RotationScaleOpacityPacked128[];
      covariance_3d_opacity_packed128: Covariance3dOpacityPacked128[];
    }>,
  ) {
    const {
      position_visibility = [],
      spherical_harmonic = [],
      rotation_scale_opacity_packed128 = [],
      covariance_3d_opacity_packed128 = [],
    } = options || {};

    this.position_visibility = position_visibility;
    this.spherical_harmonic = spherical_harmonic;
    this.rotation_scale_opacity_packed128 = rotation_scale_opacity_packed128;
    this.covariance_3d_opacity_packed128 = covariance_3d_opacity_packed128;
  }

  is_empty() {
    return this.position_visibility.length === 0;
  }

  resize_to_square() {
    // this.position_visibility.resize(self.square_len(), PositionVisibility::default());
    // this.spherical_harmonic.resize(self.square_len(), SphericalHarmonicCoefficients::default());
    // #[cfg(feature = "precompute_covariance_3d")]
    // self.covariance_3d_opacity_packed128.resize(self.square_len(), Covariance3dOpacityPacked128::default());
    // #[cfg(not(feature = "precompute_covariance_3d"))]
    // self.rotation_scale_opacity_packed128.resize(self.square_len(), RotationScaleOpacityPacked128::default());
  }
}
