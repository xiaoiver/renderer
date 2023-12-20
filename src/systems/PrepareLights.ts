import { System } from '@lastolivegames/becsy';
import { RenderInst } from '../framegraph';
import { MeshPipeline } from './MeshPipeline';
import {
  AmbientLight,
  ExtractedDirectionalLight,
  Transform,
} from '../components';
import { Mat4, Vec4 } from '../math';

const MAX_DIRECTIONAL_LIGHTS = 10;
const MAX_CASCADES_PER_LIGHT = 4;

// These must match the bit flags in /src/render/mesh_view_types.wgsl!
enum DirectionalLightFlags {
  SHADOWS_ENABLED = 1 << 0,
  NONE = 0,
  UNINITIALIZED = 0xffff,
}

export class PrepareLights extends System {
  /**
   * Used for extracting lights uniforms.
   */
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private ambient_lights = this.query(
    (q) =>
      q.addedOrChanged.with(AmbientLight).trackWrites.and.with(AmbientLight)
        .current,
  );
  private directional_lights = this.query(
    (q) =>
      q.addedOrChanged
        .with(ExtractedDirectionalLight)
        .trackWrites.and.with(ExtractedDirectionalLight).current,
  );
  // private ambient_lights = this.query((q) => q.current.with(AmbientLight).read);
  // private directional_lights = this.query(
  //   (q) => q.current.with(ExtractedDirectionalLight).read,
  // );

  async prepare() {
    this.prepareUniforms = (template, binding) => {
      template.setUniforms(binding, [
        { name: 'padding', value: new Array(976).fill(0) },
      ]);
    };
  }

  execute(): void {
    const ambient_lights = this.ambient_lights.addedOrChanged;
    const directional_lights = this.directional_lights.addedOrChanged.slice(
      0,
      MAX_DIRECTIONAL_LIGHTS,
    );

    const updated = ambient_lights.length || directional_lights.length;

    if (updated) {
      let ambient_color = Vec4.ZERO;
      this.ambient_lights.addedOrChanged.forEach((entity) => {
        this.pipeline.passesChanged = true;
        const ambient_light = entity.read(AmbientLight);
        ambient_color = new Vec4(
          ...ambient_light.color.as_linear_rgba_f32(),
        ).mul(ambient_light.brightness);
        return;
      });

      // const is_orthographic = extracted_view.projection.w_axis.w == 1.0;
      // let cluster_factors_zw = calculate_cluster_factors(
      //     clusters.near,
      //     clusters.far,
      //     clusters.dimensions.z as f32,
      //     is_orthographic,
      // );

      // let directional_shadow_enabled_count = this.directional_lights
      //     .iter()
      //     .take(MAX_DIRECTIONAL_LIGHTS)
      //     .filter(|(_, light)| light.shadows_enabled)
      //     .count()
      //     .min(max_texture_array_layers / MAX_CASCADES_PER_LIGHT);

      // directional lights
      const gpu_directional_lights: number[][] = new Array(
        MAX_DIRECTIONAL_LIGHTS,
      )
        .fill(undefined)
        .map(() => new Array(96).fill(0));
      let num_directional_cascades_enabled = 0;

      this.directional_lights.addedOrChanged.forEach((entity, index) => {
        const light = entity.read(ExtractedDirectionalLight);
        this.pipeline.passesChanged = true;

        let flags = DirectionalLightFlags.NONE;
        // if (light.shadows_enabled && (index < directional_shadow_enabled_count)) {
        //   flags |= DirectionalLightFlags.SHADOWS_ENABLED;
        // }

        // convert from illuminance (lux) to candelas
        //
        // exposure is hard coded at the moment but should be replaced
        // by values coming from the camera
        // see: https://google.github.io/filament/Filament.html#imagingpipeline/physicallybasedcamera/exposuresettings
        const APERTURE = 4.0;
        const SHUTTER_SPEED = 1.0 / 250.0;
        const SENSITIVITY = 100.0;
        const ev100 =
          Math.log2((APERTURE * APERTURE) / SHUTTER_SPEED) -
          Math.log2(SENSITIVITY / 100.0);
        const exposure = 1.0 / (Math.pow(2.0, ev100) * 1.2);
        const intensity = light.illuminance * exposure;

        const num_cascades = Math.min(
          light.cascade_shadow_config.bounds.length,
          MAX_CASCADES_PER_LIGHT,
        );

        const mat = Mat4.copy(light.transform.compute_matrix());
        const copied_transform = Transform.from_matrix(mat);

        gpu_directional_lights[index] = [
          // cascades: array<DirectionalCascade, MAX_CASCADES_PER_LIGHT>,
          ...new Array(4)
            .fill([
              // view_projection: mat4x4<f32>,
              ...new Array(16).fill(0),
              // texel_size,
              0,
              // far_bound,
              0,
              // padding
              0,
              0,
            ])
            .flat(),
          // color: vec4<f32>,
          ...light.color.as_linear_rgba_f32().map((v) => v * intensity),
          // direction_to_light: vec3<f32>,
          ...copied_transform.back().to_array(),
          // 'flags' is a bit field indicating various options. u32 is 32 bits so we have up to 32 options.
          // flags: u32,
          flags,
          // shadow_depth_bias,
          light.shadow_depth_bias,
          // shadow_normal_bias,
          light.shadow_normal_bias,
          // num_cascades: u32,
          num_cascades,
          // cascades_overlap_proportion,
          light.cascade_shadow_config.overlap_proportion,
          // depth_texture_base_index: u32,
          num_directional_cascades_enabled,
          // padding
          0,
          0,
          0,
        ];
      });

      this.prepareUniforms = (template, binding) => {
        template.setUniforms(binding, [
          {
            name: 'directional_lights',
            value: gpu_directional_lights.flat(),
          },
          {
            name: 'ambient_color',
            value: ambient_color.to_array(),
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
            value: directional_lights.length,
          },
          {
            name: 'spot_light_shadowmap_offset',
            value: 0,
          },
          {
            name: 'environment_map_smallest_specular_mip_level',
            value: 0,
          },
        ]);
      };
    }
  }
}
