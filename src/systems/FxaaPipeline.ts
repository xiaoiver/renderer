import { System } from '@lastolivegames/becsy';
import { Program, fullscreenMegaState, nArray } from '@antv/g-device-api';
import { Fxaa, Sensitivity } from '../components';
import { Renderer } from './Renderer';
import {
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  TextureMapping,
} from '../framegraph';
import vert from '../shaders/fullscreen.wgsl?raw';
import frag from '../shaders/fxaa.wgsl?raw';
import { createProgram } from './utils';

const SensitivityStr: Record<Sensitivity, string> = {
  [Sensitivity.Low]: 'LOW',
  [Sensitivity.Medium]: 'MEDIUM',
  [Sensitivity.High]: 'HIGH',
  [Sensitivity.Ultra]: 'ULTRA',
  [Sensitivity.Extreme]: 'EXTREME',
};

export class FxaaPipeline extends System {
  views = this.query((q) => q.addedOrChanged.with(Fxaa).trackWrites);

  private renderer = this.attach(Renderer);

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
    this.views.addedOrChanged.forEach((entity) => {
      const fxaa = entity.read(Fxaa);
      if (!fxaa.enabled) {
        return;
      }

      this.compileDefines(fxaa);

      // Reset program.
      if (this.program) {
        this.program.destroy();
      }
      this.program = null;

      this.renderer.registerPass('FXAA', this.pushFXAAPass);
    });
  }

  finalize(): void {
    this.program.destroy();
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
      renderInst.setUniformBuffer(renderHelper.uniformBuffer);
      renderInst.setAllowSkippingIfPipelineNotReady(false);

      renderInst.setMegaStateFlags(fullscreenMegaState);
      renderInst.setBindingLayout({ numUniformBuffers: 0, numSamplers: 1 });
      renderInst.drawPrimitives(3);

      renderInst.setProgram(this.program);

      pass.exec((passRenderer, scope) => {
        this.textureMapping[0].texture = scope.getResolveTextureForID(
          mainColorResolveTextureID,
        );
        renderInst.setSamplerBindingsFromTextureMappings(this.textureMapping);
        renderInst.drawOnPass(renderHelper.renderCache, passRenderer);
      });
    });
  };
}
