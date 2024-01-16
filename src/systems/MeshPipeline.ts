import { Entity, System } from '@lastolivegames/becsy';
import { Device, SwapChain, OpaqueWhite } from '@antv/g-device-api';
import { AppConfig, GlobalTransform, Material, Transform } from '../components';
import {
  AntialiasingMode,
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  makeAttachmentClearDescriptor,
  makeBackbufferDescSimple,
  opaqueWhiteFullClearRenderPassDescriptor,
} from '../framegraph';
import { Mesh } from '../meshes';
import { PrepareViewUniforms } from './PrepareViewUniforms';
import { PrepareFog } from './PrepareFog';
import { RenderResource } from './RenderResource';
import { OpaqueNode } from './nodes/Opaque';
import { PipelineNode } from './nodes/PipelineNode';
import { PrepareLights } from './PrepareLights';

export class MeshPipeline extends System {
  private appConfig = this.singleton.read(AppConfig);

  private rendererResource = this.attach(RenderResource);
  // extractMeshes = this.attach(ExtractMeshes);

  device: Device;
  swapChain: SwapChain;
  renderHelper: RenderHelper;
  passes: Record<
    string,
    (
      builder: RGGraphBuilder,
      renderHelper: RenderHelper,
      renderInput: RenderInput,
      mainColorTargetID: number,
      mainDepthTargetID?: number,
    ) => void
  > = {};
  passesChanged = true;

  nodes: PipelineNode[] = [];

  /**
   * Retrieve view uniforms extracted from camera.
   */
  private viewUniforms = this.attach(PrepareViewUniforms);
  private lightsUniforms = this.attach(PrepareLights);
  private fogUniforms = this.attach(PrepareFog);

  private meshes_query = this.query((q) =>
    q.current.with(Mesh, Material, Transform, GlobalTransform),
  );
  private renderables = this.query(
    (q) => q.addedOrChanged.with(Mesh, Material, Transform).trackWrites,
  );

  async prepare() {
    this.device = this.rendererResource.device;
    this.swapChain = this.rendererResource.swapChain;
    this.renderHelper = this.rendererResource.renderHelper;
    const opaque = new OpaqueNode(
      this.renderHelper.renderInstManager,
      this.renderHelper.renderCache,
      this,
    );
    opaque.viewUniforms = this.viewUniforms;
    opaque.lightsUniforms = this.lightsUniforms;
    opaque.fogUniforms = this.fogUniforms;
    this.nodes.push(opaque);
  }

  private run(renderables: Readonly<Entity[]>) {
    const { canvas } = this.appConfig;
    const renderInstManager = this.renderHelper.renderInstManager;
    const builder = this.renderHelper.renderGraph.newGraphBuilder();

    const clearColor = OpaqueWhite;
    const renderInput = {
      backbufferWidth: canvas.width,
      backbufferHeight: canvas.height,
      antialiasingMode: AntialiasingMode.None,
    };
    // create main Color RT
    const mainRenderDesc = makeBackbufferDescSimple(
      RGAttachmentSlot.Color0,
      renderInput,
      makeAttachmentClearDescriptor(clearColor),
    );
    // create main Depth RT
    const mainDepthDesc = makeBackbufferDescSimple(
      RGAttachmentSlot.DepthStencil,
      renderInput,
      opaqueWhiteFullClearRenderPassDescriptor,
    );
    const mainColorTargetID = builder.createRenderTargetID(
      mainRenderDesc,
      'Main Color',
    );
    const mainDepthTargetID = builder.createRenderTargetID(
      mainDepthDesc,
      'Main Depth',
    );

    builder.pushPass((pass) => {
      pass.setDebugName('Main Render Pass');
      pass.attachRenderTargetID(RGAttachmentSlot.Color0, mainColorTargetID);
      pass.attachRenderTargetID(
        RGAttachmentSlot.DepthStencil,
        mainDepthTargetID,
      );

      pass.exec((passRenderer) => {
        this.nodes.forEach((node) => {
          node.draw(passRenderer);
        });
      });
    });

    // Post-processing passes
    Object.keys(this.passes).forEach((name) => {
      const func = this.passes[name];
      func(
        builder,
        this.renderHelper,
        renderInput,
        mainColorTargetID,
        mainDepthTargetID,
      );
    });

    // Output to screen
    builder.resolveRenderTargetToExternalTexture(
      mainColorTargetID,
      this.swapChain.getOnscreenTexture(),
    );

    // Submit all render nodes.
    this.nodes.forEach((node) => {
      node.prepare();
      renderables.forEach((renderable) => {
        node.submit(renderable);
      });
      node.post();
    });

    this.renderHelper.prepareToRender();
    this.renderHelper.renderGraph.execute();

    renderInstManager.resetRenderInsts();
  }

  execute(): void {
    if (this.passesChanged && this.meshes_query.current.length) {
      this.run(this.meshes_query.current);
      this.passesChanged = false;
    } else if (this.renderables.addedOrChanged.length) {
      this.run(this.renderables.addedOrChanged);
    }
  }

  /**
   * Register pass
   */
  registerPass(
    key: string,
    func: (
      builder: RGGraphBuilder,
      renderHelper: RenderHelper,
      renderInput: RenderInput,
      mainColorTargetID: number,
      mainDepthTargetID?: number,
    ) => void,
  ) {
    this.passes[key] = func;
  }

  unregisterPass(key: string) {
    delete this.passes[key];
  }
}
