import {
  Format,
  FormatTypeFlags,
  getFormatByteSize,
  getFormatTypeFlags,
} from '@antv/g-device-api';

export function getFormatByteSizePerBlock(format: Format): number {
  const formatTypeFlags = getFormatTypeFlags(format);

  switch (formatTypeFlags) {
    case FormatTypeFlags.BC1:
    case FormatTypeFlags.BC4_SNORM:
    case FormatTypeFlags.BC4_UNORM:
      return 8;
    case FormatTypeFlags.BC2:
    case FormatTypeFlags.BC3:
    case FormatTypeFlags.BC5_SNORM:
    case FormatTypeFlags.BC5_UNORM:
      return 16;
    default:
      return getFormatByteSize(format);
  }
}
