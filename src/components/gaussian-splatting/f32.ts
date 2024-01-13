import { field } from '@lastolivegames/becsy';
import { Mat3, Vec3, Vec4 } from '../../math';
import { Gaussian } from './Gaussian';
import { GaussianCloud } from './GaussianCloud';
import {
  HALF_SH_COEFF_COUNT,
  SphericalHarmonicCoefficients,
} from './SphericalHarmonicCoefficients';
import { pack_f32s_to_u32 } from './f16';

export class PositionVisibility {
  @field.float32.vector(3) position: [number, number, number];
  @field.float32 visibility: number;

  constructor(
    options?: Partial<{
      position: [number, number, number];
      visibility: number;
    }>,
  ) {
    const { position = [0, 0, 0], visibility = 0 } = options || {};

    this.position = position;
    this.visibility = visibility;
  }

  from(position_visibility: [number, number, number, number]) {
    return new PositionVisibility({
      position: [
        position_visibility[0],
        position_visibility[1],
        position_visibility[2],
      ],
      visibility: position_visibility[3],
    });
  }
}

export class Rotation {
  @field.float32.vector(4) rotation: [number, number, number, number];

  constructor(
    options?: Partial<{
      rotation: [number, number, number, number];
    }>,
  ) {
    const { rotation = [0, 0, 0, 1] } = options || {};

    this.rotation = rotation;
  }

  from(rotation: [number, number, number, number]) {
    return new Rotation({ rotation });
  }
}

export class ScaleOpacity {
  @field.float32.vector(3) scale: [number, number, number];
  @field.float32 opacity: number;

  constructor(
    options?: Partial<{
      scale: [number, number, number];
      opacity: number;
    }>,
  ) {
    const { scale = [1, 1, 1], opacity = 1 } = options || {};

    this.scale = scale;
    this.opacity = opacity;
  }

  from(scale_opacity: [number, number, number, number]) {
    return new ScaleOpacity({
      scale: [scale_opacity[0], scale_opacity[1], scale_opacity[2]],
      opacity: scale_opacity[3],
    });
  }
}

export class Covariance3dOpacity {
  @field.float32.vector(6) cov3d: [
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  @field.float32 opacity: number;
  @field.float32 pad: number;

  constructor(
    options?: Partial<{
      cov3d: [number, number, number, number, number, number];
      opacity: number;
      pad: number;
    }>,
  ) {
    const { cov3d = [0, 0, 0, 0, 0, 0], opacity = 1, pad = 0 } = options || {};

    this.cov3d = cov3d;
    this.opacity = opacity;
    this.pad = pad;
  }

  static from(gaussian: Gaussian) {
    const cov3d = compute_covariance_3d(
      new Vec4(...gaussian.rotation.rotation),
      new Vec3(...gaussian.scale_opacity.scale),
    );

    return new Covariance3dOpacity({
      cov3d,
      opacity: gaussian.scale_opacity.opacity,
      pad: 0.0,
    });
  }
}

function compute_covariance_3d(
  rotation: Vec4,
  scale: Vec3,
): [number, number, number, number, number, number] {
  const S = Mat3.from_diagonal(scale);

  const r = rotation.x;
  const x = rotation.y;
  const y = rotation.z;
  const z = rotation.w;

  const R = Mat3.from_cols(
    new Vec3(
      1.0 - 2.0 * (y * y + z * z),
      2.0 * (x * y - r * z),
      2.0 * (x * z + r * y),
    ),
    new Vec3(
      2.0 * (x * y + r * z),
      1.0 - 2.0 * (x * x + z * z),
      2.0 * (y * z - r * x),
    ),
    new Vec3(
      2.0 * (x * z - r * y),
      2.0 * (y * z + r * x),
      1.0 - 2.0 * (x * x + y * y),
    ),
  );

  const M = S.mul_mat3(R);
  const Sigma = M.transpose().mul_mat3(M);

  return [
    Sigma.row(0).x,
    Sigma.row(0).y,
    Sigma.row(0).z,
    Sigma.row(1).y,
    Sigma.row(1).z,
    Sigma.row(2).z,
  ];
}

export function random_gaussians(n: number) {
  const gaussians: Gaussian[] = [];
  for (let i = 0; i < n; i++) {
    gaussians.push(
      new Gaussian({
        rotation: new Rotation({
          rotation: [
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ],
        }),
        position_visibility: new PositionVisibility({
          position: [
            20 * (Math.random() * 2 - 1),
            20 * (Math.random() * 2 - 1),
            20 * (Math.random() * 2 - 1),
          ],
          visibility: 1.0,
        }),
        scale_opacity: new ScaleOpacity({
          scale: [Math.random(), Math.random(), Math.random()],
          opacity: Math.random() * 0.8,
        }),
        spherical_harmonic: new SphericalHarmonicCoefficients({
          coefficients: new Array(HALF_SH_COEFF_COUNT).map(() => {
            const upper = Math.random() * 2 - 1;
            const lower = Math.random() * 2 - 1;
            return pack_f32s_to_u32(upper, lower);
          }),
        }),
      }),
    );
  }

  return GaussianCloud.from_gaussians(gaussians);
}
