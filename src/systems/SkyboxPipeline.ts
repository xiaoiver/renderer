import { Entity, System } from '@lastolivegames/becsy';
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

  private skyboxs = this.query(
    (q) => q.added.and.removed.and.changed.with(Skybox).trackWrites,
  );

  /**
   * Should only has one node.
   */
  private skyboxNode: SkyboxNode;

  execute(): void {
    // Only support one skybox.
    for (const entity of this.skyboxs.added) {
      this.pipeline.passesChanged = true;
      this.skyboxNode = new SkyboxNode(
        this.rendererResource.renderHelper.renderInstManager,
        this.rendererResource.renderHelper.renderCache,
        this.pipeline,
      );
      this.skyboxNode.viewUniforms = this.viewUniforms;
      this.pipeline.nodes.unshift(this.skyboxNode);
      this.updateSkybox(entity);
      break;
    }

    for (const _ of this.skyboxs.removed) {
      this.pipeline.passesChanged = true;
      const index = this.pipeline.nodes.indexOf(this.skyboxNode);
      this.pipeline.nodes.splice(index, 1);
      this.skyboxNode = null;
      break;
    }

    for (const entity of this.skyboxs.changed) {
      this.updateSkybox(entity);
    }
  }

  private updateSkybox(entity: Entity) {
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
    device.setResourceName(texture, `Skybox Cube map`);

    this.skyboxNode.cubemap = texture;
  }
}
