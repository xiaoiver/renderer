import { field } from '@lastolivegames/becsy';
import { Gaussian } from './Gaussian';
import { Covariance3dOpacity, Rotation, ScaleOpacity } from './f32';

type u32 = number;
type u16 = number;
type f32 = number;
type f16 = number;

export class RotationScaleOpacityPacked128 {
  @field.float32.vector(2) declare rotation: [u32, u32];
  @field.float32 declare scale_opacity: [u32, u32];

  constructor(
    options?: Partial<{
      rotation: [u32, u32];
      scale_opacity: [u32, u32];
    }>,
  ) {
    const { rotation = [0, 0], scale_opacity = [1, 1] } = options || {};

    this.rotation = rotation;
    this.scale_opacity = scale_opacity;
  }

  // static fromU32(rotation_scale_opacity: [u32, u32, u32, u32]) {
  //   return new RotationScaleOpacityPacked128({
  //     rotation: [rotation_scale_opacity[0], rotation_scale_opacity[1]],
  //     scale_opacity: [rotation_scale_opacity[2], rotation_scale_opacity[3]],
  //   });
  // }

  // static fromF32(
  //   rotation_scale_opacity: [f32, f32, f32, f32, f32, f32, f32, f32],
  // ) {
  //   return new RotationScaleOpacityPacked128({
  //     rotation: [
  //       pack_f32s_to_u32(rotation_scale_opacity[0], rotation_scale_opacity[1]),
  //       pack_f32s_to_u32(rotation_scale_opacity[2], rotation_scale_opacity[3]),
  //     ],
  //     scale_opacity: [
  //       pack_f32s_to_u32(rotation_scale_opacity[4], rotation_scale_opacity[5]),
  //       pack_f32s_to_u32(rotation_scale_opacity[6], rotation_scale_opacity[7]),
  //     ],
  //   });
  // }

  // static fromF16(
  //   rotation_scale_opacity: [f16, f16, f16, f16, f16, f16, f16, f16],
  // ) {
  //   return new RotationScaleOpacityPacked128({
  //     rotation: [
  //       pack_f16s_to_u32(rotation_scale_opacity[0], rotation_scale_opacity[1]),
  //       pack_f16s_to_u32(rotation_scale_opacity[2], rotation_scale_opacity[3]),
  //     ],
  //     scale_opacity: [
  //       pack_f16s_to_u32(rotation_scale_opacity[4], rotation_scale_opacity[5]),
  //       pack_f16s_to_u32(rotation_scale_opacity[6], rotation_scale_opacity[7]),
  //     ],
  //   });
  // }

  from_gaussian(gaussian: Gaussian) {
    return new RotationScaleOpacityPacked128({
      rotation: [
        pack_f32s_to_u32(
          gaussian.rotation.rotation[0],
          gaussian.rotation.rotation[1],
        ),
        pack_f32s_to_u32(
          gaussian.rotation.rotation[2],
          gaussian.rotation.rotation[3],
        ),
      ],
      scale_opacity: [
        pack_f32s_to_u32(
          gaussian.scale_opacity.scale[0],
          gaussian.scale_opacity.scale[1],
        ),
        pack_f32s_to_u32(
          gaussian.scale_opacity.scale[2],
          gaussian.scale_opacity.opacity,
        ),
      ],
    });
  }

  to_rotation(): Rotation {
    const [u0, l0] = unpack_u32_to_f32s(this.rotation[0]);
    const [u1, l1] = unpack_u32_to_f32s(this.rotation[1]);

    return new Rotation({
      rotation: [u0, l0, u1, l1],
    });
  }

  to_scale_opacity(): ScaleOpacity {
    const [u0, l0] = unpack_u32_to_f32s(this.scale_opacity[0]);
    const [u1, l1] = unpack_u32_to_f32s(this.scale_opacity[1]);

    return new ScaleOpacity({
      scale: [u0, l0, u1],
      opacity: l1,
    });
  }
}

export function pack_f32s_to_u32(upper: f32, lower: f32): u32 {
  return pack_f16s_to_u32(upper as f16, lower as f16);
}

/**
 * Assuming upper and lower are 16-bit integers (0 to 65535)
 */
export function pack_f16s_to_u32(upper: f16, lower: f16): u32 {
  const upper_bits = (upper & (0xffff as u32)) << 16;
  const lower_bits = lower & (0xffff as u32);
  return (upper_bits | lower_bits) >>> 0;
}

export function unpack_u32_to_f16s(value: u32): [f16, f16] {
  const upper = (value >> 16) as u16 & 0xffff;
  const lower = (value & 0xffff) as u16;
  return [upper, lower];
}

export function unpack_u32_to_f32s(value: u32): [f32, f32] {
  const [upper, lower] = unpack_u32_to_f16s(value);
  return [upper as f32, lower as f32];
}

export class Covariance3dOpacityPacked128 {
  @field.uint32.vector(3) declare cov3d: [u32, u32, u32];
  @field.uint32 declare opacity: u32;

  constructor(
    options?: Partial<{
      cov3d: [u32, u32, u32];
      opacity: u32;
    }>,
  ) {
    const { cov3d = [0, 0, 0], opacity = 1 } = options || {};

    this.cov3d = cov3d;
    this.opacity = opacity;
  }

  static from_gaussian(gaussian: Gaussian) {
    const cov3d = Covariance3dOpacity.from(gaussian).cov3d;
    const opacity = gaussian.scale_opacity.opacity;

    return new Covariance3dOpacityPacked128({
      cov3d: [
        pack_f32s_to_u32(cov3d[0], cov3d[1]),
        pack_f32s_to_u32(cov3d[2], cov3d[3]),
        pack_f32s_to_u32(cov3d[4], cov3d[5]),
      ],
      opacity: pack_f32s_to_u32(opacity, opacity), // TODO: benefit from 32-bit opacity
    });
  }

  covariance_3d_opacity(): Covariance3dOpacity {
    const [c0, c1] = unpack_u32_to_f32s(this.cov3d[0]);
    const [c2, c3] = unpack_u32_to_f32s(this.cov3d[1]);
    const [c4, c5] = unpack_u32_to_f32s(this.cov3d[2]);

    const [opacity, _] = unpack_u32_to_f32s(this.opacity);

    const cov3d: [f32, f32, f32, f32, f32, f32] = [c0, c1, c2, c3, c4, c5];

    return new Covariance3dOpacity({
      cov3d,
      opacity,
      pad: 0.0,
    });
  }
}
