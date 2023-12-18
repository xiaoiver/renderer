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
  CullMode,
  TextureDimension,
  TextureUsage,
  CompareFunction,
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
import { PrepareFog } from '../PrepareFog';
import { PrepareMaterial } from '../PrepareMaterial';
import { TextureMapping } from '../../framegraph';

/**
 * Render opaque meshes.
 */
export class OpaqueNode extends PipelineNode {
  viewUniforms: PrepareViewUniforms;
  fogUniforms: PrepareFog;
  materialUniforms: PrepareMaterial;

  init() {}

  prepare() {
    const template = this.pipeline.renderHelper.pushTemplateRenderInst();
    template.setBindingLayout({
      numUniformBuffers: 4,
      numSamplers: 1,
      numStorageBuffers: 1,
    });
    template.setMegaStateFlags(
      setAttachmentStateSimple(
        {
          depthWrite: true,
          // depthCompare: CompareFunction.GEQUAL,
          depthCompare: CompareFunction.LEQUAL,
          blendConstant: TransparentBlack,
          cullMode: CullMode.BACK,
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

    // View binding = 0
    this.viewUniforms.prepareUniforms(template, 0);
    // Fog binding = 2
    this.fogUniforms.prepareUniforms(template, 2);
    // Material binding = 3
    this.materialUniforms.prepareUniforms(template, 3);

    // Lights binding = 1
    template.setUniforms(1, [
      {
        name: 'directional_lights',
        value: new Array(10)
          .fill([
            // cascades: array<DirectionalCascade, MAX_CASCADES_PER_LIGHT>,
            ...new Array(4)
              .fill([
                // view_projection: mat4x4<f32>,
                ...new Array(16).fill(0),
                // texel_size: f32,
                0,
                // far_bound: f32,
                0,
                // padding
                0,
                0,
              ])
              .flat(),

            // color: vec4<f32>,
            0,
            0,
            0,
            0,
            // direction_to_light: vec3<f32>,
            0,
            0,
            0,
            // // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
            // flags: u32,
            0,
            // shadow_depth_bias: f32,
            0,
            // shadow_normal_bias: f32,
            0,
            // num_cascades: u32,
            0,
            // cascades_overlap_proportion: f32,
            0,
            // depth_texture_base_index: u32,
            0,
            // padding
            0,
            0,
            0,
          ])
          .flat(),
      },
      {
        name: 'ambient_color',
        value: [0, 0, 0, 0],
      },
      {
        name: 'cluster_dimensions',
        value: [0, 0, 0, 0],
      },
      {
        name: 'cluster_factors',
        value: [0, 0, 0, 0],
      },
      {
        name: 'n_directional_lights',
        value: 0,
      },
      {
        name: 'spot_light_shadowmap_offset',
        value: 0,
      },
      {
        name: 'environment_map_smallest_specular_mip_level',
        value: 0,
      },
      {
        name: 'padding',
        value: 0,
      },
      {
        name: 'padding1',
        value: [0, 0, 0, 0],
      },
      {
        name: 'padding2',
        value: [0, 0, 0, 0],
      },
    ]);
  }

  post() {
    this.renderInstManager.popTemplateRenderInst();
  }

  submit(renderable: Entity): void {
    const device = this.renderCache.device;
    const mesh = renderable.read(Mesh);
    const { vertex_shader, fragment_shader, base_color_texture } =
      renderable.read(Material);

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

    if (base_color_texture) {
      const texture = device.createTexture({
        format: Format.U8_RGBA_NORM,
        width: base_color_texture.width,
        height: base_color_texture.height,
        dimension: TextureDimension.TEXTURE_2D,
        usage: TextureUsage.SAMPLED,
        pixelStore: {
          unpackFlipY: true,
        },
      });
      texture.setImageData([base_color_texture]);
      device.setResourceName(texture, 'BaseColor');

      const mapping = new TextureMapping();
      mapping.texture = texture;
      renderInst.setSamplerBindingsFromTextureMappings([mapping]);
    }

    this.renderInstManager.submitRenderInst(renderInst, this.renderList);
  }
}
