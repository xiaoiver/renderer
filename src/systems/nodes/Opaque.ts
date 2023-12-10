import {
  InputLayoutDescriptor,
  Format,
  BufferUsage,
  VertexStepMode,
  Buffer,
  setAttachmentStateSimple,
  TransparentBlack,
  BlendMode,
  BlendFactor,
} from '@antv/g-device-api';
import { Entity } from '@lastolivegames/becsy';
import { flatten } from 'lodash-es';
import { Material } from '../../components';
import { Mesh } from '../../meshes';
import { MESH_BINDING } from '../ExtractMeshes';
import { PipelineNode } from './PipelineNode';
import { createProgram } from '../utils';
import { getFormatByteSizePerBlock } from '../../framegraph/utils/format';
import { PrepareViewUniforms } from '../PrepareViewUniforms';

/**
 * Render opaque meshes.
 */
export class OpaqueNode extends PipelineNode {
  viewUniforms: PrepareViewUniforms;

  init() {}

  prepare() {
    const template = this.pipeline.renderHelper.pushTemplateRenderInst();
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
  }

  post() {
    this.renderInstManager.popTemplateRenderInst();
  }

  submit(renderable: Entity): void {
    const device = this.renderCache.device;
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

    const renderInst = this.renderInstManager.newRenderInst();
    renderInst.setAllowSkippingIfPipelineNotReady(false);
    const program = createProgram(
      device,
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
      indexBuffer = device.createBuffer({
        viewOrSize: new Uint32Array(mesh.indices),
        usage: BufferUsage.INDEX,
      });
    }

    const attributeBuffers = [];
    mesh.attributes.forEach(([attribute, data]) => {
      const { format, id } = attribute;
      const vertexBuffer = device.createBuffer({
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
    const inputLayout = this.renderCache.createInputLayout({
      ...inputLayoutDescriptor,
      program,
    });

    renderInst.renderPipelineDescriptor.topology = mesh.primitive_topology;
    renderInst.setProgram(program);
    renderInst.setStorageBuffers(
      [this.pipeline.extractMeshes.meshStorageBuffer],
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

    this.renderInstManager.submitRenderInst(renderInst, this.renderList);
  }
}
