import { System } from '@lastolivegames/becsy';
import {
  Device,
  TransparentWhite,
  SwapChain,
  setAttachmentStateSimple,
  TransparentBlack,
  BlendMode,
  BlendFactor,
  WebGPUDeviceContribution,
  InputLayoutDescriptor,
  Format,
  Buffer,
  BufferUsage,
  VertexStepMode,
} from '@antv/g-device-api';
import { AppConfig, Material, Renderable, Transform } from '../components';
import {
  AntialiasingMode,
  RGAttachmentSlot,
  RGGraphBuilder,
  RenderHelper,
  RenderInput,
  RenderInst,
  RenderInstList,
  makeAttachmentClearDescriptor,
  makeBackbufferDescSimple,
  opaqueWhiteFullClearRenderPassDescriptor,
} from '../framegraph';
import { Mesh } from '../meshes';
import maths from '../shaders/maths.wgsl?raw';
import view from '../shaders/view.wgsl?raw';
import mesh_types from '../shaders/mesh/mesh_types.wgsl?raw';
import mesh_bindings from '../shaders/mesh/mesh_bindings.wgsl?raw';
import mesh_view_bindings from '../shaders/mesh/mesh_view_bindings.wgsl?raw';
import view_transforms from '../shaders/view_transformations.wgsl?raw';
import forward_io from '../shaders/forward_io.wgsl?raw';
import mesh_functions from '../shaders/mesh/mesh_functions.wgsl?raw';
import { createProgram } from './utils';
import { flatten } from 'lodash-es';
import { getFormatByteSizePerBlock } from '../framegraph/utils/format';
import { PrepareViewUniforms } from './PrepareViewUniforms';

export class Renderer extends System {
  /**
   * Global app config.
   */
  private appConfig = this.singleton.read(AppConfig);

  /**
   * Retrieve view uniforms extracted from camera.
   */
  private viewUniforms = this.attach(PrepareViewUniforms);

  /**
   * Device represents a "virtual GPU".
   */
  private device: Device;
  private swapChain: SwapChain;
  private renderHelper: RenderHelper;

  private renderLists = {
    /**
     * used in main forward rendering pass
     */
    opaque: new RenderInstList(),
  };

  /**
   * Post-processing passes.
   */
  private passes: Record<
    string,
    (
      builder: RGGraphBuilder,
      renderHelper: RenderHelper,
      renderInput: RenderInput,
      mainColorTargetID: number,
    ) => void
  > = {};

  private renderables = this.query(
    (q) => q.addedOrChanged.with(Mesh, Material, Transform).trackWrites,
  );

  async prepare() {
    const { canvas } = this.appConfig;

    const deviceContribution = new WebGPUDeviceContribution({
      shaderCompilerPath: '/glsl_wgsl_compiler_bg.wasm',
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

    // Register shader modules
    this.registerShaderModule(maths);
    this.registerShaderModule(forward_io);
    this.registerShaderModule(view);
    this.registerShaderModule(mesh_types);
    this.registerShaderModule(mesh_bindings);
    this.registerShaderModule(mesh_view_bindings);
    this.registerShaderModule(view_transforms);
    this.registerShaderModule(mesh_functions);
  }

  initialize(): void {
    // Build render graph
    const renderHelper = new RenderHelper();
    this.renderHelper = renderHelper;
    renderHelper.setDevice(this.device);
    renderHelper.renderInstManager.disableSimpleMode();
  }

  execute(): void {
    for (const renderable of this.renderables.addedOrChanged) {
      const { canvas } = this.appConfig;
      const renderInstManager = this.renderHelper.renderInstManager;
      const builder = this.renderHelper.renderGraph.newGraphBuilder();
      const renderCache = this.renderHelper.getCache();

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
        pass.exec((passRenderer) => {
          this.renderLists.opaque.drawOnPassRenderer(renderCache, passRenderer);
        });
      });

      // Post-processing passes
      Object.keys(this.passes).forEach((name) => {
        const func = this.passes[name];
        func(builder, this.renderHelper, renderInput, mainColorTargetID);
      });

      // Output to screen
      builder.resolveRenderTargetToExternalTexture(
        mainColorTargetID,
        this.swapChain.getOnscreenTexture(),
      );

      const template = this.renderHelper.pushTemplateRenderInst();
      // SceneParams: binding = 0, ObjectParams: binding = 1
      template.setBindingLayout({ numUniformBuffers: 1, numSamplers: 0 });
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
      if (this.viewUniforms.viewExtractor) {
        this.viewUniforms.viewExtractor(template);
      }

      const { translation } = renderable.read(Transform);
      const mesh = renderable.read(Mesh);
      const { vertex_shader, fragment_shader } = renderable.read(Material);

      const defines: Record<string, number | boolean> = {};
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_POSITION)) {
        defines['VERTEX_POSITIONS'] = 1;
      }
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_NORMAL)) {
        defines['VERTEX_NORMALS'] = 1;
      }
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_UV_0)) {
        defines['VERTEX_UVS'] = 1;
      }
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_UV_1)) {
        defines['VERTEX_UVS_1'] = 1;
      }
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_TANGENT)) {
        defines['VERTEX_TANGENTS'] = 1;
      }
      if (mesh.contains_attribute(Mesh.ATTRIBUTE_COLOR)) {
        defines['VERTEX_COLORS'] = 1;
      }

      const renderInst = renderInstManager.newRenderInst();
      renderInst.setAllowSkippingIfPipelineNotReady(false);
      const program = createProgram(
        this.device,
        {
          vertex: {
            wgsl: vertex_shader,
            entryPoint: 'vertex',
            defines: true,
          },
          fragment: {
            wgsl: fragment_shader,
            entryPoint: 'fragment',
            defines: true,
          },
        },
        defines,
      );

      /**
       * Create input layout.
       */
      const inputLayoutDescriptor: InputLayoutDescriptor = {
        vertexBufferDescriptors: [],
        indexBufferFormat: null,
        program: null,
      };
      let indexBuffer: Buffer | null = null;
      if (mesh.indices) {
        inputLayoutDescriptor.indexBufferFormat = Format.U32_R;
        indexBuffer = this.device.createBuffer({
          viewOrSize: new Uint32Array(mesh.indices),
          usage: BufferUsage.INDEX,
        });
      }

      const attributeBuffers = [];
      mesh.attributes.forEach(([attribute, data]) => {
        const { format, id } = attribute;
        const vertexBuffer = this.device.createBuffer({
          viewOrSize: new Float32Array(flatten(data)), // Uint?
          usage: BufferUsage.VERTEX,
        });
        attributeBuffers.push(vertexBuffer);

        inputLayoutDescriptor.vertexBufferDescriptors.push({
          arrayStride: getFormatByteSizePerBlock(format),
          stepMode: VertexStepMode.VERTEX,
          attributes: [
            {
              format,
              offset: 0,
              shaderLocation: id, // Same as attribute location in shader.
            },
          ],
        });
      });
      const inputLayout = renderCache.createInputLayout({
        ...inputLayoutDescriptor,
        program,
      });

      renderInst.renderPipelineDescriptor.topology = mesh.primitive_topology;
      renderInst.setProgram(program);
      renderInst.setVertexInput(
        inputLayout,
        attributeBuffers.map((buffer) => ({
          buffer,
          byteOffset: 0,
        })),
        indexBuffer
          ? {
              buffer: indexBuffer,
              offset: 0,
            }
          : null,
      );

      const vertexCount = mesh.count_vertices();
      if (indexBuffer) {
        renderInst.drawIndexesInstanced(mesh.indices.length, 1);
      } else {
        renderInst.drawPrimitives(vertexCount);
      }

      renderInstManager.submitRenderInst(renderInst, this.renderLists.opaque);

      renderInstManager.popTemplateRenderInst();

      this.renderHelper.prepareToRender();
      this.renderHelper.renderGraph.execute();

      renderInstManager.resetRenderInsts();
    }
  }

  finalize(): void {
    this.renderHelper.destroy();
    this.device.destroy();
    this.device.checkForLeaks();
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
    ) => void,
  ) {
    this.passes[key] = func;
  }

  /**
   * Use naga-oil to combine and manipulate shaders.
   * The order is important.
   */
  registerShaderModule(shader: string): string {
    const compiler = this.device['WGSLComposer'];
    return compiler.wgsl_compile(shader);
  }
}
