import { System } from '@lastolivegames/becsy';
import {
  AddressMode,
  FilterMode,
  MipmapFilterMode,
  Program,
  fullscreenMegaState,
  nArray,
} from '@antv/g-device-api';
import { Fxaa, Sensitivity } from '../components';
import {
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  TextureMapping,
  hashCodeNumberUpdate,
} from '../framegraph';
import vert from '../shaders/fullscreen.wgsl?raw';
import frag from '../shaders/fxaa.wgsl?raw';
import { createProgram } from './utils';
import { RenderResource } from './RenderResource';

const SensitivityStr: Record<Sensitivity, string> = {
  [Sensitivity.Low]: 'LOW',
  [Sensitivity.Medium]: 'MEDIUM',
  [Sensitivity.High]: 'HIGH',
  [Sensitivity.Ultra]: 'ULTRA',
  [Sensitivity.Extreme]: 'EXTREME',
};

export function fxaaHash(a: Fxaa): number {
  let hash = 0;
  hash = hashCodeNumberUpdate(hash, a.enabled ? 1 : 0);
  hash = hashCodeNumberUpdate(hash, a.edge_threshold);
  hash = hashCodeNumberUpdate(hash, a.edge_threshold_min);
  return hash;
}

export class FxaaPipeline extends System {
  fxaa = this.query((q) => q.addedOrChanged.with(Fxaa).trackWrites);

  private rendererResource = this.attach(RenderResource);

  private textureMapping = nArray(1, () => new TextureMapping());
  private program: Program;
  private defines: Record<string, boolean | number> = {};

  private compileDefines(fxaa: Readonly<Fxaa>) {
    const { edge_threshold, edge_threshold_min } = fxaa;
    this.defines = {
      [`EDGE_THRESH_${SensitivityStr[edge_threshold]}`]: true,
      [`EDGE_THRESH_MIN_${SensitivityStr[edge_threshold_min]}`]: true,
    };
  }

  execute(): void {
    this.fxaa.addedOrChanged.forEach((entity) => {
      const fxaa = entity.read(Fxaa);
      this.rendererResource.passesChanged = true;

      this.compileDefines(fxaa);

      // Reset program.
      if (this.program) {
        this.textureMapping.forEach((mapping) => mapping.reset());
        this.program.destroy();
        this.program = null;
      }

      if (!fxaa.enabled) {
        this.rendererResource.unregisterPass('Fxaa');
      } else {
        this.rendererResource.registerPass('Fxaa', this.pushFXAAPass);
      }
    });
  }

  finalize(): void {
    if (this.program) {
      this.program.destroy();
      this.program = null;
    }
  }

  private pushFXAAPass = (
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
            entryPoint: 'fragment',
            defines: true,
          },
        },
        this.defines,
      );
    }

    builder.pushPass((pass) => {
      pass.setDebugName('FXAA');
      pass.attachRenderTargetID(RGAttachmentSlot.Color0, mainColorTargetID);

      const mainColorResolveTextureID =
        builder.resolveRenderTarget(mainColorTargetID);
      pass.attachResolveTexture(mainColorResolveTextureID);

      const renderInst = renderHelper.renderInstManager.newRenderInst();
      renderInst.setAllowSkippingIfPipelineNotReady(false);

      renderInst.setMegaStateFlags(fullscreenMegaState);
      renderInst.setBindingLayout({
        numUniformBuffers: 0,
        numSamplers: 1,
        numStorageBuffers: 0,
      });
      renderInst.drawPrimitives(3);

      renderInst.setProgram(this.program);

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
        });
        renderInst.setSamplerBindingsFromTextureMappings(this.textureMapping);
        renderInst.drawOnPass(renderHelper.renderCache, passRenderer);
      });
    });
  };
}
