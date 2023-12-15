import { System } from '@lastolivegames/becsy';
import {
  AddressMode,
  FilterMode,
  MipmapFilterMode,
  Program,
  fullscreenMegaState,
  nArray,
} from '@antv/g-device-api';
// import { Tonemapping, TonemappingEnum } from '../components';
import {
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  TextureMapping,
} from '../framegraph';
import { createProgram } from './utils';
import { MeshPipeline } from './MeshPipeline';
import vert from '../shaders/fullscreen.wgsl?raw';
import frag from '../shaders/tonemapping/tonemapping.wgsl?raw';
import { PrepareViewUniforms } from './PrepareViewUniforms';

export class TonemappingPipeline extends System {
  // tonemapping = this.query(
  //   (q) => q.addedOrChanged.withAny(TonemappingEnum).trackWrites,
  // );

  private pipeline = this.attach(MeshPipeline);
  private viewUniforms = this.attach(PrepareViewUniforms);

  private textureMapping = nArray(1, () => new TextureMapping());
  private program: Program;
  private defines: Record<string, boolean | number> = {};

  execute(): void {
    // this.tonemapping.addedOrChanged.forEach((entity) => {
    //   this.pipeline.passesChanged = true;
    //   if (entity.has(Tonemapping.None)) {
    //     this.defines['TONEMAP_METHOD_NONE'] = 1;
    //   } else if (entity.has(Tonemapping.Reinhard)) {
    //     this.defines['TONEMAP_METHOD_REINHARD'] = 1;
    //   } else if (entity.has(Tonemapping.ReinhardLuminance)) {
    //     this.defines['TONEMAP_METHOD_REINHARD_LUMINANCE'] = 1;
    //   } else if (entity.has(Tonemapping.AcesFitted)) {
    //     this.defines['TONEMAP_METHOD_ACES_FITTED'] = 1;
    //   } else if (entity.has(Tonemapping.AgX)) {
    //     this.defines['TONEMAP_METHOD_AGX'] = 1;
    //   } else if (entity.has(Tonemapping.SomewhatBoringDisplayTransform)) {
    //     this.defines['TONEMAP_METHOD_SOMWHAT_BORING_DISPLAY_TRANSFORM'] = 1;
    //   } else if (entity.has(Tonemapping.TonyMcMapface)) {
    //     this.defines['TONEMAP_METHOD_TONY_MC_MAPFACE'] = 1;
    //   } else if (entity.has(Tonemapping.BlenderFilmic)) {
    //     this.defines['TONEMAP_METHOD_BLENDER_FILMIC'] = 1;
    //   }
    //   // Reset program.
    //   this.finalize();
    //   // this.pipeline.registerPass('Tonemapping', this.pushTonemappingPass);
    // });
  }

  finalize(): void {
    if (this.program) {
      this.program.destroy();
      this.program = null;
      this.pipeline.unregisterPass('Tonemapping');
    }
  }

  private pushTonemappingPass = (
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
      pass.setDebugName('Tonemapping');
      pass.attachRenderTargetID(RGAttachmentSlot.Color0, mainColorTargetID);

      const mainColorResolveTextureID =
        builder.resolveRenderTarget(mainColorTargetID);
      pass.attachResolveTexture(mainColorResolveTextureID);

      pass.exec((passRenderer, scope) => {
        const renderInst = renderHelper.renderInstManager.newRenderInst();
        renderInst.setAllowSkippingIfPipelineNotReady(false);

        renderInst.setMegaStateFlags(fullscreenMegaState);
        renderInst.setBindingLayout({
          numUniformBuffers: 1,
          numSamplers: 1,
          numStorageBuffers: 0,
        });
        renderInst.drawPrimitives(3);
        renderInst.setProgram(this.program);

        // View
        this.viewUniforms.prepareUniforms(renderInst, 0);

        // hdr_texture & sampler
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
