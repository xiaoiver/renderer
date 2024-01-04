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
import {
  AlphaMode,
  GlobalTransform,
  Material,
  StandardMaterialFlags,
} from '../../components';
import { Mesh } from '../../meshes';
import { MESH_BINDING } from '../ExtractMeshes';
import { PipelineNode } from './PipelineNode';
import { createProgram } from '../utils';
import { getFormatByteSizePerBlock } from '../../framegraph/utils/format';
import { PrepareViewUniforms } from '../PrepareViewUniforms';
import { PrepareFog } from '../PrepareFog';
import { TextureMapping } from '../../framegraph';
import { PrepareLights } from '../PrepareLights';

/**
 * Render opaque meshes.
 */
export class OpaqueNode extends PipelineNode {
  viewUniforms: PrepareViewUniforms;
  fogUniforms: PrepareFog;
  lightsUniforms: PrepareLights;

  init() {}

  prepare() {
    const template = this.pipeline.renderHelper.pushTemplateRenderInst();
    template.setBindingLayout({
      numUniformBuffers: 4, // TODO: should be dynamic
      numSamplers: 1,
      numStorageBuffers: 1, // var<storage> mesh: array<Mesh>
      numStorageTextures: 0,
    });
    template.setMegaStateFlags(
      setAttachmentStateSimple(
        {
          depthWrite: true,
          stencilWrite: false,
          depthCompare: CompareFunction.GREATER,
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
    // Lights binding = 1
    this.lightsUniforms.prepareUniforms(template, 1);
    // Fog binding = 2
    this.fogUniforms.prepareUniforms(template, 2);
  }

  post() {
    this.renderInstManager.popTemplateRenderInst();
  }

  submit(renderable: Entity): void {
    const device = this.renderCache.device;
    const mesh = renderable.read(Mesh);
    const {
      vertex_shader,
      fragment_shader,
      base_color,
      base_color_texture,
      emissive,
      emissive_texture,
      perceptual_roughness,
      metallic,
      metallic_roughness_texture,
      reflectance,
      diffuse_transmission,
      specular_transmission,
      thickness,
      ior,
      attenuation_distance,
      attenuation_color,
      alpha_mode,
      parallax_depth_scale,
      max_parallax_layer_count,
      deferred_lighting_pass_id,
      occlusion_texture,
      double_sided,
      fog_enabled,
      depth_map,
      unlit,
      specular_transmission_texture,
      thickness_texture,
      diffuse_transmission_texture,
    } = renderable.read(Material);

    let flags = StandardMaterialFlags.NONE;
    if (base_color_texture) {
      flags |= StandardMaterialFlags.BASE_COLOR_TEXTURE;
    }
    if (emissive_texture) {
      flags |= StandardMaterialFlags.EMISSIVE_TEXTURE;
    }
    if (metallic_roughness_texture) {
      flags |= StandardMaterialFlags.METALLIC_ROUGHNESS_TEXTURE;
    }
    if (occlusion_texture) {
      flags |= StandardMaterialFlags.OCCLUSION_TEXTURE;
    }
    if (double_sided) {
      flags |= StandardMaterialFlags.DOUBLE_SIDED;
    }
    if (unlit) {
      flags |= StandardMaterialFlags.UNLIT;
    }
    if (fog_enabled) {
      flags |= StandardMaterialFlags.FOG_ENABLED;
    }
    if (depth_map) {
      flags |= StandardMaterialFlags.DEPTH_MAP;
    }
    if (specular_transmission_texture) {
      flags |= StandardMaterialFlags.SPECULAR_TRANSMISSION_TEXTURE;
    }
    if (thickness_texture) {
      flags |= StandardMaterialFlags.THICKNESS_TEXTURE;
    }
    if (diffuse_transmission_texture) {
      flags |= StandardMaterialFlags.DIFFUSE_TRANSMISSION_TEXTURE;
    }

    let alpha_cutoff = 0.5;
    if (alpha_mode instanceof AlphaMode.Opaque) {
      flags |= StandardMaterialFlags.ALPHA_MODE_OPAQUE;
    } else if (alpha_mode instanceof AlphaMode.Mask) {
      alpha_cutoff = alpha_mode.value;
      flags |= StandardMaterialFlags.ALPHA_MODE_MASK;
    } else if (alpha_mode instanceof AlphaMode.Blend) {
      flags |= StandardMaterialFlags.ALPHA_MODE_BLEND;
    } else if (alpha_mode instanceof AlphaMode.Premultiplied) {
      flags |= StandardMaterialFlags.ALPHA_MODE_PREMULTIPLIED;
    } else if (alpha_mode instanceof AlphaMode.Add) {
      flags |= StandardMaterialFlags.ALPHA_MODE_ADD;
    } else if (alpha_mode instanceof AlphaMode.Multiply) {
      flags |= StandardMaterialFlags.ALPHA_MODE_MULTIPLY;
    }

    const max_relief_mapping_search_steps = 0;

    const affine = GlobalTransform.copy(renderable.read(GlobalTransform));
    const transform = affine
      .to_transpose()
      .map((v) => v.to_array())
      .flat();
    const previous_transform = transform;
    const [inverse_transpose_model_a, inverse_transpose_model_b] =
      affine.inverse_transpose_3x3();

    const meshStorageBufferData = [];
    meshStorageBufferData.push(
      ...transform,
      ...previous_transform,
      ...inverse_transpose_model_a,
      inverse_transpose_model_b,
      0,
      0,
      0,
    ); // length = 34

    const meshStorageBuffer = device.createBuffer({
      viewOrSize: new Float32Array(36),
      usage: BufferUsage.STORAGE,
    });
    // Set mesh storage buffer
    meshStorageBuffer.setSubData(
      0,
      new Uint8Array(new Float32Array(meshStorageBufferData).buffer),
    );

    // pub struct MeshFlags: u32 {
    //   const SHADOW_RECEIVER             = (1 << 0);
    //   const TRANSMITTED_SHADOW_RECEIVER = (1 << 1);
    //   // Indicates the sign of the determinant of the 3x3 model matrix. If the sign is positive,
    //   // then the flag should be set, else it should not be set.
    //   const SIGN_DETERMINANT_MODEL_3X3  = (1 << 31);
    //   const NONE                        = 0;
    //   const UNINITIALIZED               = 0xFFFF;
    // }
    // flags: mesh_transforms.flags,

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
    renderInst.setStorageBuffers([meshStorageBuffer], [MESH_BINDING]);
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

    renderInst.setUniforms(3, [
      {
        name: 'base_color',
        value: base_color.as_linear_rgba_f32(),
      },
      {
        name: 'emissive',
        value: emissive.as_linear_rgba_f32(),
      },
      {
        name: 'perceptual_roughness',
        value: perceptual_roughness,
      },
      {
        name: 'metallic',
        value: metallic,
      },
      {
        name: 'reflectance',
        value: reflectance,
      },
      {
        name: 'diffuse_transmission',
        value: diffuse_transmission,
      },
      {
        name: 'specular_transmission',
        value: specular_transmission,
      },
      {
        name: 'thickness',
        value: thickness,
      },
      {
        name: 'ior',
        value: ior,
      },
      {
        name: 'attenuation_distance',
        value: attenuation_distance,
      },
      {
        name: 'attenuation_color',
        value: attenuation_color.as_linear_rgba_f32(),
      },
      {
        name: 'flags',
        value: flags,
      },
      {
        name: 'alpha_cutoff',
        value: alpha_cutoff,
      },
      {
        name: 'parallax_depth_scale',
        value: parallax_depth_scale,
      },
      {
        name: 'max_parallax_layer_count',
        value: max_parallax_layer_count,
      },
      {
        name: 'max_relief_mapping_search_steps',
        value: max_relief_mapping_search_steps,
      },
      {
        name: 'deferred_lighting_pass_id',
        value: deferred_lighting_pass_id,
      },
    ]);

    this.renderInstManager.submitRenderInst(renderInst, this.renderList);
  }
}
