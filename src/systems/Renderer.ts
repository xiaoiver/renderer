import { System } from '@lastolivegames/becsy';
import {
  WebGLDeviceContribution,
  Device,
  TransparentWhite,
  SwapChain,
  setAttachmentStateSimple,
  TransparentBlack,
  BlendMode,
  BlendFactor,
} from '@antv/g-device-api';
import { AppConfig, Renderable, Transform } from '../components';
import {
  AntialiasingMode,
  RGAttachmentSlot,
  RenderHelper,
  makeAttachmentClearDescriptor,
  makeBackbufferDescSimple,
  opaqueWhiteFullClearRenderPassDescriptor,
} from '../framegraph';

export class Renderer extends System {
  /**
   * Global app config.
   */
  private appConfig = this.singleton.read(AppConfig);

  /**
   * Device represents a "virtual GPU".
   */
  private device: Device;
  private swapChain: SwapChain;
  private renderHelper: RenderHelper;

  private renderables = this.query(
    (q) => q.addedOrChanged.with(Renderable).and.with(Transform).trackWrites,
  );

  async prepare() {
    const { canvas } = this.appConfig;

    const deviceContribution = new WebGLDeviceContribution({
      targets: ['webgl2', 'webgl1'],
      // xrCompatible: params.xrCompatible,
      onContextCreationError: () => {},
      onContextLost: () => {},
      onContextRestored(e) {},
    });

    // Create swap chain and get device
    const swapChain = await deviceContribution.createSwapChain(canvas);
    this.swapChain = swapChain;

    swapChain.configureSwapChain(canvas.width, canvas.height);
    const device = swapChain.getDevice();
    this.device = device;

    // Handle resize.
    canvas.addEventListener('resize', () => {
      swapChain.configureSwapChain(canvas.width, canvas.height);
    });
  }

  initialize(): void {
    // Build render graph
    const renderHelper = new RenderHelper();
    this.renderHelper = renderHelper;
    renderHelper.setDevice(this.device);
    renderHelper.renderInstManager.disableSimpleMode();
  }

  execute(): void {
    const { canvas } = this.appConfig;
    const renderInstManager = this.renderHelper.renderInstManager;
    const builder = this.renderHelper.renderGraph.newGraphBuilder();

    const clearColor = TransparentWhite;
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
      pass.exec((passRenderer) => {});
    });

    builder.resolveRenderTargetToExternalTexture(
      mainColorTargetID,
      this.swapChain.getOnscreenTexture(),
    );

    for (const renderable of this.renderables.addedOrChanged) {
      const { translation } = renderable.read(Transform);

      console.log('transform...', translation.x, translation.y, translation.z);
    }

    const template = this.renderHelper.pushTemplateRenderInst();
    // SceneParams: binding = 0, ObjectParams: binding = 1
    template.setBindingLayout({ numUniformBuffers: 2, numSamplers: 0 });
    template.setMegaStateFlags(
      setAttachmentStateSimple(
        {
          depthWrite: true,
          blendConstant: TransparentBlack,
        },
        {
          rgbBlendMode: BlendMode.ADD,
          alphaBlendMode: BlendMode.ADD,
          rgbBlendSrcFactor: BlendFactor.SRC_ALPHA,
          alphaBlendSrcFactor: BlendFactor.ONE,
          rgbBlendDstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,
          alphaBlendDstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,
        },
      ),
    );

    // Update Scene Params
    // const camera = this.context.camera;
    // template.setUniforms(SceneUniformBufferIndex, [
    //   {
    //     name: SceneUniform.PROJECTION_MATRIX,
    //     value: camera.getPerspective(),
    //   },
    //   {
    //     name: SceneUniform.VIEW_MATRIX,
    //     value: camera.getViewTransform(),
    //   },
    //   {
    //     name: SceneUniform.CAMERA_POSITION,
    //     value: camera.getPosition(),
    //   },
    //   {
    //     name: SceneUniform.DEVICE_PIXEL_RATIO,
    //     value: this.context.contextService.getDPR(),
    //   },
    //   {
    //     name: SceneUniform.VIEWPORT,
    //     value: [width, height],
    //   },
    //   {
    //     name: SceneUniform.IS_ORTHO,
    //     value: camera.isOrtho() ? 1 : 0,
    //   },
    //   {
    //     name: SceneUniform.IS_PICKING,
    //     value: 0,
    //   },
    // ]);

    // this.batchManager.render(this.renderLists.world);

    renderInstManager.popTemplateRenderInst();

    this.renderHelper.prepareToRender();
    this.renderHelper.renderGraph.execute();

    renderInstManager.resetRenderInsts();
  }

  finalize(): void {
    this.renderHelper.destroy();
    this.device.destroy();
    this.device.checkForLeaks();
  }
}
