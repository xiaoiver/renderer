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
const SH_COEFF_COUNT: number =
  (SH_COEFF_COUNT_PER_CHANNEL * SH_CHANNELS + 3) & ~3;

export const HALF_SH_COEFF_COUNT: number = SH_COEFF_COUNT / 2;
const PADDED_HALF_SH_COEFF_COUNT: number = (HALF_SH_COEFF_COUNT + 3) & ~3;

// #[cfg(feature = "f16")]
const SH_VEC4_PLANES: number = PADDED_HALF_SH_COEFF_COUNT / 4;
// #[cfg(feature = "f32")]
// const SH_VEC4_PLANES: number = SH_COEFF_COUNT / 4;

export class SphericalHarmonicCoefficients {
  @field.object declare coefficients: number[];

  constructor(
    options?: Partial<{
      coefficients: number[];
    }>,
  ) {
    const { coefficients = new Array(HALF_SH_COEFF_COUNT).fill(0) } =
      options || {};

    this.coefficients = coefficients;
  }

  set(index: number, value: number) {
    let quantized = toBits(value);
    this.coefficients[index / 2] =
      index % 2 === 0
        ? (this.coefficients[index / 2] & 0xffff0000) | quantized
        : (this.coefficients[index / 2] & 0x0000ffff) | (quantized << 16);
  }
}

function toBits(floatValue: number) {
  // Create a buffer that can contain one 32-bit float
  let buffer = new ArrayBuffer(4);

  // Create a Float32Array view into the buffer
  let floatView = new Float32Array(buffer);

  // Create a Uint32Array view into the same buffer
  let uintView = new Uint32Array(buffer);

  // Set the float value into the Float32Array view
  floatView[0] = floatValue;

  // Read the bits from the Uint32Array view
  return uintView[0];
}
