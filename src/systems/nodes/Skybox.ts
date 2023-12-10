import {
  AddressMode,
  FilterMode,
  MipmapFilterMode,
  Program,
  Sampler,
  Texture,
  fullscreenMegaState,
  nArray,
} from '@antv/g-device-api';
import { createProgram } from '../utils';
import { PipelineNode } from './PipelineNode';
import { TextureMapping } from '../../framegraph';
import { PrepareViewUniforms } from '../PrepareViewUniforms';
import vert from '../../shaders/skybox.wgsl?raw';

export class SkyboxNode extends PipelineNode {
  cubemap: Texture;
  viewUniforms: PrepareViewUniforms;

  private program: Program;
  private sampler: Sampler;
  private textureMapping = nArray(1, () => new TextureMapping());

  init() {
    const { device } = this.renderCache;
    this.program = createProgram(
      device,
      {
        vertex: {
          wgsl: vert,
          entryPoint: 'skybox_vertex',
        },
        fragment: {
          wgsl: vert,
          entryPoint: 'skybox_fragment',
        },
      },
      {},
    );
    this.sampler = device.createSampler({
      addressModeU: AddressMode.CLAMP_TO_EDGE,
      addressModeV: AddressMode.CLAMP_TO_EDGE,
      minFilter: FilterMode.BILINEAR,
      magFilter: FilterMode.BILINEAR,
      mipmapFilter: MipmapFilterMode.LINEAR,
      lodMinClamp: 0,
      lodMaxClamp: 0,
    });
  }

  prepare(): void {}

  post(): void {}

  submit(): void {
    const renderInst = this.renderInstManager.newRenderInst();

    renderInst.setAllowSkippingIfPipelineNotReady(false);
    renderInst.setMegaStateFlags(fullscreenMegaState);
    renderInst.setBindingLayout({
      numUniformBuffers: 1,
      numSamplers: 1,
      numStorageBuffers: 0,
    });
    renderInst.setUniformBuffer(this.pipeline.renderHelper.uniformBuffer);

    this.viewUniforms.viewExtractor(renderInst, 0);

    this.textureMapping[0].texture = this.cubemap;
    this.textureMapping[0].sampler = this.sampler;
    renderInst.setSamplerBindingsFromTextureMappings(this.textureMapping);

    renderInst.setProgram(this.program);
    renderInst.drawPrimitives(3);

    this.renderInstManager.submitRenderInst(renderInst, this.renderList);
  }
}
