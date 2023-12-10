import { System } from '@lastolivegames/becsy';
import { Format, TextureDimension, TextureUsage } from '@antv/g-device-api';
import { Skybox } from '../components';
import { RenderResource } from './RenderResource';
import { PrepareViewUniforms } from './PrepareViewUniforms';
import { MeshPipeline } from './MeshPipeline';
import { SkyboxNode } from './nodes/Skybox';

export class SkyboxPipeline extends System {
  private rendererResource = this.attach(RenderResource);
  private viewUniforms = this.attach(PrepareViewUniforms);
  private pipeline = this.attach(MeshPipeline);

  private skybox = this.query((q) => q.addedOrChanged.with(Skybox).trackWrites);

  /**
   * Should only has one node.
   */
  private skyboxNode: SkyboxNode;

  async prepare() {
    this.skyboxNode = new SkyboxNode(
      this.rendererResource.renderHelper.renderInstManager,
      this.rendererResource.renderHelper.renderCache,
      this.pipeline,
    );
    this.skyboxNode.viewUniforms = this.viewUniforms;
    this.pipeline.nodes.push(this.skyboxNode);
  }

  execute(): void {
    this.skybox.addedOrChanged.forEach((entity, i) => {
      this.pipeline.passesChanged = true;
      const device = this.rendererResource.device;

      /**
       * Create cubemap from skybox image handle.
       */
      const skybox = entity.read(Skybox);
      const imageBitmaps = skybox.image_handle;
      const texture = device.createTexture({
        format: Format.U8_RGBA_NORM,
        width: imageBitmaps[0].width,
        height: imageBitmaps[0].height,
        depthOrArrayLayers: 6,
        dimension: TextureDimension.TEXTURE_CUBE_MAP,
        usage: TextureUsage.SAMPLED,
      });
      texture.setImageData(imageBitmaps);
      device.setResourceName(texture, `Cube map ${i}`);

      this.skyboxNode.cubemap = texture;
    });
  }
}
