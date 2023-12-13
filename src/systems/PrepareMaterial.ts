import { System } from '@lastolivegames/becsy';
import { RenderInst } from '../framegraph';
import { AlphaMode, Material, StandardMaterialFlags } from '../components';
import { MeshPipeline } from './MeshPipeline';

/**
 * Prepares material metadata and writes the material-related uniform buffers to the GPU
 */
export class PrepareMaterial extends System {
  /**
   * Used for extracting view uniforms from camera.
   */
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private materials = this.query(
    (q) => q.addedOrChanged.with(Material).trackWrites,
  );

  execute(): void {
    this.materials.addedOrChanged.forEach((entity) => {
      this.pipeline.passesChanged = true;
      const material = entity.read(Material);
      const {
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
      } = material;

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

      this.prepareUniforms = (template, binding) => {
        template.setUniforms(binding, [
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
      };
    });
  }
}
