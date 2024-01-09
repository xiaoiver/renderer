import { count_ones } from '../../components/render/utils';

export namespace MeshPipelineKey {
  export const MSAA_MASK_BITS = 0b111;
  export const MSAA_SHIFT_BITS = 32 - count_ones(MSAA_MASK_BITS);

  export const PRIMITIVE_TOPOLOGY_MASK_BITS = 0b111;
  export const PRIMITIVE_TOPOLOGY_SHIFT_BITS =
    MSAA_SHIFT_BITS - count_ones(PRIMITIVE_TOPOLOGY_MASK_BITS);

  export const BLEND_MASK_BITS = 0b11;
  export const BLEND_SHIFT_BITS =
    PRIMITIVE_TOPOLOGY_SHIFT_BITS - count_ones(BLEND_MASK_BITS);

  export const TONEMAP_METHOD_MASK_BITS = 0b111;
  export const TONEMAP_METHOD_SHIFT_BITS =
    BLEND_SHIFT_BITS - count_ones(TONEMAP_METHOD_MASK_BITS);

  export const SHADOW_FILTER_METHOD_MASK_BITS = 0b11;
  export const SHADOW_FILTER_METHOD_SHIFT_BITS =
    TONEMAP_METHOD_SHIFT_BITS - count_ones(SHADOW_FILTER_METHOD_MASK_BITS);

  export const VIEW_PROJECTION_MASK_BITS = 0b11;
  export const VIEW_PROJECTION_SHIFT_BITS =
    SHADOW_FILTER_METHOD_SHIFT_BITS - count_ones(VIEW_PROJECTION_MASK_BITS);

  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_MASK_BITS = 0b11;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS =
    VIEW_PROJECTION_SHIFT_BITS -
    count_ones(SCREEN_SPACE_SPECULAR_TRANSMISSION_MASK_BITS);

  export const NONE = 0;
  export const HDR = 1 << 0;
  export const TONEMAP_IN_SHADER = 1 << 1;
  export const DEBAND_DITHER = 1 << 2;
  export const DEPTH_PREPASS = 1 << 3;
  export const NORMAL_PREPASS = 1 << 4;
  export const DEFERRED_PREPASS = 1 << 5;
  export const MOTION_VECTOR_PREPASS = 1 << 6;
  export const MAY_DISCARD = 1 << 7; // Guards shader codepaths that may discard, allowing early depth tests in most cases
  // See: https://www.khronos.org/opengl/wiki/Early_Fragment_Test
  export const ENVIRONMENT_MAP = 1 << 8;
  export const SCREEN_SPACE_AMBIENT_OCCLUSION = 1 << 9;
  export const DEPTH_CLAMP_ORTHO = 1 << 10;
  export const TEMPORAL_JITTER = 1 << 11;
  export const MORPH_TARGETS = 1 << 12;
  export const BLEND_RESERVED_BITS = BLEND_MASK_BITS << BLEND_SHIFT_BITS; // ← Bitmask reserving bits for the blend state
  export const BLEND_OPAQUE = 0 << BLEND_SHIFT_BITS; // ← Values are just sequential within the mask, and can range from 0 to 3
  export const BLEND_PREMULTIPLIED_ALPHA = 1 << BLEND_SHIFT_BITS; //
  export const BLEND_MULTIPLY = 2 << BLEND_SHIFT_BITS; // ← We still have room for one more value without adding more bits
  export const BLEND_ALPHA = 3 << BLEND_SHIFT_BITS;
  export const MSAA_RESERVED_BITS = MSAA_MASK_BITS << MSAA_SHIFT_BITS;
  export const PRIMITIVE_TOPOLOGY_RESERVED_BITS =
    PRIMITIVE_TOPOLOGY_MASK_BITS << PRIMITIVE_TOPOLOGY_SHIFT_BITS;
  export const TONEMAP_METHOD_RESERVED_BITS =
    TONEMAP_METHOD_MASK_BITS << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_NONE = 0 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_REINHARD = 1 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_REINHARD_LUMINANCE =
    2 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_ACES_FITTED = 3 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_AGX = 4 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_SOMEWHAT_BORING_DISPLAY_TRANSFORM =
    5 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_TONY_MC_MAPFACE = 6 << TONEMAP_METHOD_SHIFT_BITS;
  export const TONEMAP_METHOD_BLENDER_FILMIC = 7 << TONEMAP_METHOD_SHIFT_BITS;
  export const SHADOW_FILTER_METHOD_RESERVED_BITS =
    SHADOW_FILTER_METHOD_MASK_BITS << SHADOW_FILTER_METHOD_SHIFT_BITS;
  export const SHADOW_FILTER_METHOD_HARDWARE_2X2 =
    0 << SHADOW_FILTER_METHOD_SHIFT_BITS;
  export const SHADOW_FILTER_METHOD_CASTANO_13 =
    1 << SHADOW_FILTER_METHOD_SHIFT_BITS;
  export const SHADOW_FILTER_METHOD_JIMENEZ_14 =
    2 << SHADOW_FILTER_METHOD_SHIFT_BITS;
  export const VIEW_PROJECTION_RESERVED_BITS =
    VIEW_PROJECTION_MASK_BITS << VIEW_PROJECTION_SHIFT_BITS;
  export const VIEW_PROJECTION_NONSTANDARD = 0 << VIEW_PROJECTION_SHIFT_BITS;
  export const VIEW_PROJECTION_PERSPECTIVE = 1 << VIEW_PROJECTION_SHIFT_BITS;
  export const VIEW_PROJECTION_ORTHOGRAPHIC = 2 << VIEW_PROJECTION_SHIFT_BITS;
  export const VIEW_PROJECTION_RESERVED = 3 << VIEW_PROJECTION_SHIFT_BITS;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_RESERVED_BITS =
    SCREEN_SPACE_SPECULAR_TRANSMISSION_MASK_BITS <<
    SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_LOW =
    0 << SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_MEDIUM =
    1 << SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_HIGH =
    2 << SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS;
  export const SCREEN_SPACE_SPECULAR_TRANSMISSION_ULTRA =
    3 << SCREEN_SPACE_SPECULAR_TRANSMISSION_SHIFT_BITS;

  // export function from_msaa_samples(msaa_samples: number) {
  //   let msaa_bits =
  //     (msaa_samples.trailing_zeros() & MSAA_MASK_BITS) << MSAA_SHIFT_BITS;
  //   return from_bits_retain(msaa_bits);
  // }
  // export function msaa_samples() {
  //   return 1 << ((self.bits() >> MSAA_SHIFT_BITS) & MSAA_MASK_BITS)
  // }

  export function from_hdr(hdr: boolean) {
    if (hdr) {
      MeshPipelineKey.HDR;
    } else {
      MeshPipelineKey.NONE;
    }
  }

  // export function primitive_topology(): PrimitiveTopology {
  //   let primitive_topology_bits = (self.bits() >> Self::PRIMITIVE_TOPOLOGY_SHIFT_BITS)
  //       & Self::PRIMITIVE_TOPOLOGY_MASK_BITS;
  //   match primitive_topology_bits {
  //       x if x == PrimitiveTopology::PointList as u32 => PrimitiveTopology::PointList,
  //       x if x == PrimitiveTopology::LineList as u32 => PrimitiveTopology::LineList,
  //       x if x == PrimitiveTopology::LineStrip as u32 => PrimitiveTopology::LineStrip,
  //       x if x == PrimitiveTopology::TriangleList as u32 => PrimitiveTopology::TriangleList,
  //       x if x == PrimitiveTopology::TriangleStrip as u32 => PrimitiveTopology::TriangleStrip,
  //       _ => PrimitiveTopology::default(),
  //   }
  // }
}
