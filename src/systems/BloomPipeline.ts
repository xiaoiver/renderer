import { System } from '@lastolivegames/becsy';
import {
  AddressMode,
  FilterMode,
  MipmapFilterMode,
  Program,
  fullscreenMegaState,
  nArray,
} from '@antv/g-device-api';
import { BloomSettings } from '../components';
import {
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  TextureMapping,
  fillVec4,
} from '../framegraph';
import { createProgram } from './utils';
import { RenderResource } from './RenderResource';
import vert from '../shaders/fullscreen.wgsl?raw';
import frag from '../shaders/bloom.wgsl?raw';

export class BloomPipeline extends System {
  bloom = this.query((q) => q.addedOrChanged.with(BloomSettings).trackWrites);

  private rendererResource = this.attach(RenderResource);

  private textureMapping = nArray(1, () => new TextureMapping());
  private program: Program;
  private defines: Record<string, boolean | number> = {};

  constructor() {
    super();
  }

  private compileDefines(bloomSettings: Readonly<BloomSettings>) {
    const { prefilter_settings_threshold } = bloomSettings;
    const prefilter = prefilter_settings_threshold > 0.0;
    this.defines = {
      USE_THRESHOLD: prefilter,
      FIRST_DOWNSAMPLE: true,
    };
  }

  execute(): void {
    this.bloom.addedOrChanged.forEach((entity) => {
      this.compileDefines(entity.read(BloomSettings));

      // Reset program.
      if (this.program) {
        this.program.destroy();
      }
      this.program = null;

      this.rendererResource.registerPass(
        'Bloom Downsample First',
        this.pushDownsamplePass,
      );
    });
  }

  finalize(): void {
    this.program.destroy();
  }

  private pushDownsamplePass = (
    builder: RGGraphBuilder,
    renderHelper: RenderHelper,
    renderInput: RenderInput,
    mainColorTargetID: number,
  ) => {
    const device = renderHelper.getDevice();

    if (!this.program) {
      this.program = createProgram(
        device,
        {
          vertex: {
            wgsl: vert,
            entryPoint: 'fullscreen_vertex_shader',
          },
          fragment: {
            wgsl: frag,
            entryPoint: 'downsample_first',
            defines: true,
          },
        },
        this.defines,
      );
      device.setResourceName(this.program, 'Bloom Downsample First');
    }

    builder.pushPass((pass) => {
      pass.setDebugName('Bloom Downsample First');
      pass.attachRenderTargetID(RGAttachmentSlot.Color0, mainColorTargetID);

      const mainColorResolveTextureID =
        builder.resolveRenderTarget(mainColorTargetID);
      pass.attachResolveTexture(mainColorResolveTextureID);

      const renderInst = renderHelper.renderInstManager.newRenderInst();
      renderInst.setAllowSkippingIfPipelineNotReady(false);

      renderInst.setMegaStateFlags(fullscreenMegaState);
      renderInst.setBindingLayout({ numUniformBuffers: 1, numSamplers: 1 });
      renderInst.drawPrimitives(3);

      renderInst.setProgram(this.program);
      renderInst.setUniformBuffer(renderHelper.uniformBuffer);

      // since gl_VertexID is not available in GLSL 100, we need to use a geometry
      const offs = renderInst.allocateUniformBuffer(0, 4);
      const d = renderInst.mapUniformBufferF32(2);
      fillVec4(
        d,
        offs,
        1.0 / renderInput.backbufferWidth,
        1.0 / renderInput.backbufferHeight,
      );

      pass.exec((passRenderer, scope) => {
        this.textureMapping[0].texture = scope.getResolveTextureForID(
          mainColorResolveTextureID,
        );
        this.textureMapping[0].sampler = device.createSampler({
          addressModeU: AddressMode.CLAMP_TO_EDGE,
          addressModeV: AddressMode.CLAMP_TO_EDGE,
          minFilter: FilterMode.BILINEAR,
          magFilter: FilterMode.BILINEAR,
          mipmapFilter: MipmapFilterMode.LINEAR,
          lodMinClamp: 0,
          lodMaxClamp: 0,
        });
        renderInst.setSamplerBindingsFromTextureMappings(this.textureMapping);
        renderInst.drawOnPass(renderHelper.renderCache, passRenderer);
      });
    });
  };
}
