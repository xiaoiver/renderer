import { Entity, System } from '@lastolivegames/becsy';
import {
  Device,
  TransparentWhite,
  SwapChain,
  setAttachmentStateSimple,
  TransparentBlack,
  BlendMode,
  BlendFactor,
  InputLayoutDescriptor,
  Format,
  Buffer,
  BufferUsage,
  VertexStepMode,
  OpaqueWhite,
} from '@antv/g-device-api';
import { AppConfig, Material, PipelineDirty, Transform } from '../components';
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
import { createProgram } from './utils';
import { flatten } from 'lodash-es';
import { getFormatByteSizePerBlock } from '../framegraph/utils/format';
import { PrepareViewUniforms } from './PrepareViewUniforms';
import { RenderResource } from './RenderResource';
import { ExtractMeshes, MESH_BINDING } from './ExtractMeshes';

export class MeshPipeline extends System {
  private appConfig = this.singleton.read(AppConfig);

  private rendererResource = this.attach(RenderResource);
  private extractMeshes = this.attach(ExtractMeshes);

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
    ) => void
  >;

  /**
   * Retrieve view uniforms extracted from camera.
   */
  private viewUniforms = this.attach(PrepareViewUniforms);

  private renderLists = {
    /**
     * used in main forward rendering pass
     */
    opaque: new RenderInstList(),
  };

  private meshes_query = this.query((q) => q.current.with(Mesh, Transform));
  private renderables = this.query(
    (q) => q.addedOrChanged.with(Mesh, Material, Transform).trackWrites,
  );

  async prepare() {
    this.device = this.rendererResource.device;
    this.swapChain = this.rendererResource.swapChain;
    this.renderHelper = this.rendererResource.renderHelper;
    this.passes = this.rendererResource.passes;
  }

  private run(renderable: Entity) {
    const { canvas } = this.appConfig;
    const renderInstManager = this.renderHelper.renderInstManager;
    const builder = this.renderHelper.renderGraph.newGraphBuilder();
    const renderCache = this.renderHelper.getCache();

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

    // MAIN_OPAQUE_PASS
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
      pass.post(() => {
        renderInstManager.popTemplateRenderInst();
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
    template.setBindingLayout({
      numUniformBuffers: 1,
      numSamplers: 0,
      numStorageBuffers: 1,
    });
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

    const mesh = renderable.read(Mesh);
    const { vertex_shader, fragment_shader } = renderable.read(Material);

    const defines: Record<string, number | boolean> = {};
    defines['VERTEX_OUTPUT_INSTANCE_INDEX'] = 1;
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
    renderInst.setStorageBuffers(
      [this.extractMeshes.meshStorageBuffer],
      [MESH_BINDING],
    );
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

    this.renderHelper.prepareToRender();
    this.renderHelper.renderGraph.execute();

    renderInstManager.resetRenderInsts();
  }

  execute(): void {
    if (this.rendererResource.passesChanged) {
      for (const renderable of this.meshes_query.current) {
        this.run(renderable);
      }
    } else {
      for (const renderable of this.renderables.addedOrChanged) {
        this.run(renderable);
      }
    }

    this.rendererResource.passesChanged = false;
  }
}
