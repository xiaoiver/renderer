import { field } from '@lastolivegames/becsy';

function num_sh_coefficients(degree: number): number {
  if (degree == 0) {
    return 1;
  } else {
    return 2 * degree + 1 + num_sh_coefficients(degree - 1);
  }
}

const SH_DEGREE: number = 0;
const SH_CHANNELS: number = 3;
const SH_COEFF_COUNT_PER_CHANNEL: number = num_sh_coefficients(SH_DEGREE);
export const SH_COEFF_COUNT: number =
  (SH_COEFF_COUNT_PER_CHANNEL * SH_CHANNELS + 3) & ~3;

export const HALF_SH_COEFF_COUNT: number = SH_COEFF_COUNT / 2; // 2
// #[cfg(feature = "f32")]
const SH_VEC4_PLANES: number = SH_COEFF_COUNT / 4;

export class SphericalHarmonicCoefficients {
  @field.object declare coefficients: number[];

  constructor(
    options?: Partial<{
      coefficients: number[];
    }>,
  ) {
    const { coefficients = new Array(SH_COEFF_COUNT).fill(0) } = options || {};

    this.coefficients = coefficients;
  }
}
