import { field } from '@lastolivegames/becsy';

/**
 * Adds a skybox to a 3D camera, based on a cubemap texture.
 *
 * Note that this component does not (currently) affect the scene's lighting.
 * To do so, use `EnvironmentMapLight` alongside this component.
 * See also <https://en.wikipedia.org/wiki/Skybox_(video_games)>.
 */
export class Skybox {
  @field.object declare image_handle: (HTMLImageElement | ImageBitmap)[];

  constructor(
    options?: Partial<{ image_handle: (HTMLImageElement | ImageBitmap)[] }>,
  ) {
    const { image_handle } = options || {};
    this.image_handle = image_handle;
  }
}
