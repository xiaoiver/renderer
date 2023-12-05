import { Texture } from '@antv/g-device-api';
import { ITextureLoader } from './ITextureLoader';

export class ImageTextureLoader implements ITextureLoader {
  supportCascades: boolean;
  canLoad(extension: string, mimeType?: string): boolean {
    throw new Error('Method not implemented.');
  }
  loadData(
    data: ArrayBufferView,
    texture: Texture,
    callback: (
      width: number,
      height: number,
      loadMipmap: boolean,
      isCompressed: boolean,
      done: () => void,
      loadFailed?: boolean,
    ) => void,
    options?: any,
  ): void {
    throw new Error('Method not implemented.');
  }
}
