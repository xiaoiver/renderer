import { Texture, GL } from '@antv/g-device-api';
import { KhronosTextureContainer } from './ktx-decoder/KhronosTextureContainer';
// import { KhronosTextureContainer2 } from './ktx-decoder/khronosTextureContainer2';
import type { ITextureLoader } from './ITextureLoader';
// import { Constants } from '../../../Engines/constants';
import { Nullable } from '../types';

function mapSRGBToLinear(format: number): Nullable<number> {
  switch (format) {
    case GL.COMPRESSED_RGB_S3TC_DXT1_EXT:
      return GL.COMPRESSED_SRGB_S3TC_DXT1_EXT;
    case GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ETC2:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGB8_ETC2;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGBA8_ETC2_EAC;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4;
    case Constants.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_BPTC_UNORM:
      return Constants.TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM;
  }

  return null;
}

/**
 * Implementation of the KTX Texture Loader.
 */
export class KTXTextureLoader implements ITextureLoader {
  /**
   * Defines whether the loader supports cascade loading the different faces.
   */
  public readonly supportCascades = false;

  /**
   * This returns if the loader support the current file information.
   * @param extension defines the file extension of the file being loaded
   * @param mimeType defines the optional mime type of the file being loaded
   * @returns true if the loader can load the specified file
   */
  public canLoad(extension: string, mimeType?: string): boolean {
    // The ".ktx2" file extension is still up for debate: https://github.com/KhronosGroup/KTX-Specification/issues/18
    return (
      extension.endsWith('.ktx') ||
      extension.endsWith('.ktx2') ||
      mimeType === 'image/ktx' ||
      mimeType === 'image/ktx2'
    );
  }

  // public loadCubeData(
  //   data: ArrayBufferView | ArrayBufferView[],
  //   texture: Texture,
  //   createPolynomials: boolean,
  //   onLoad: Nullable<(data?: any) => void>,
  // ): void {
  //   if (Array.isArray(data)) {
  //     return;
  //   }

  //   // Need to invert vScale as invertY via UNPACK_FLIP_Y_WEBGL is not supported by compressed texture
  //   texture._invertVScale = !texture.invertY;
  //   const engine = texture.getEngine();
  //   const ktx = new KhronosTextureContainer(data, 6);

  //   const loadMipmap = ktx.numberOfMipmapLevels > 1 && texture.generateMipMaps;

  //   engine._unpackFlipY(true);

  //   ktx.uploadLevels(texture, texture.generateMipMaps);

  //   texture.width = ktx.pixelWidth;
  //   texture.height = ktx.pixelHeight;

  //   engine._setCubeMapTextureParams(
  //     texture,
  //     loadMipmap,
  //     ktx.numberOfMipmapLevels - 1,
  //   );
  //   texture.isReady = true;
  //   texture.onLoadedObservable.notifyObservers(texture);
  //   texture.onLoadedObservable.clear();

  //   if (onLoad) {
  //     onLoad();
  //   }
  // }

  public loadData(
    data: ArrayBufferView,
    texture: Texture,
    callback: (
      width: number,
      height: number,
      loadMipmap: boolean,
      isCompressed: boolean,
      done: () => void,
      loadFailed: boolean,
    ) => void,
    options?: any,
  ): void {
    if (KhronosTextureContainer.IsValid(data)) {
      // Need to invert vScale as invertY via UNPACK_FLIP_Y_WEBGL is not supported by compressed texture
      texture._invertVScale = !texture.invertY;
      const ktx = new KhronosTextureContainer(data, 1);

      const mappedFormat = mapSRGBToLinear(ktx.glInternalFormat);
      if (mappedFormat) {
        texture.format = mappedFormat;
        texture._useSRGBBuffer = texture
          .getEngine()
          ._getUseSRGBBuffer(true, texture.generateMipMaps);
        texture._gammaSpace = true;
      } else {
        texture.format = ktx.glInternalFormat;
      }

      callback(
        ktx.pixelWidth,
        ktx.pixelHeight,
        texture.generateMipMaps,
        true,
        () => {
          ktx.uploadLevels(texture, texture.generateMipMaps);
        },
        ktx.isInvalid,
      );
      // } else if (KhronosTextureContainer2.IsValid(data)) {
      //   const ktx2 = new KhronosTextureContainer2(texture.getEngine());
      //   ktx2.uploadAsync(data, texture, options).then(
      //     () => {
      //       callback(
      //         texture.width,
      //         texture.height,
      //         texture.generateMipMaps,
      //         true,
      //         () => {},
      //         false,
      //       );
      //     },
      //     (error) => {
      //       console.warn(`Failed to load KTX2 texture data: ${error.message}`);
      //       callback(0, 0, false, false, () => {}, true);
      //     },
      //   );
    } else {
      console.error('texture missing KTX identifier');
      callback(0, 0, false, false, () => {}, true);
    }
  }
}
