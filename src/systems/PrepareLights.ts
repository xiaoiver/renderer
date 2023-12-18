import { System } from '@lastolivegames/becsy';
import { RenderInst } from '../framegraph';
import { MeshPipeline } from './MeshPipeline';
import { AmbientLight } from '../components';
import { Vec4 } from '../math';

export class PrepareLights extends System {
  /**
   * Used for extracting lights uniforms.
   */
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private lights = this.query(
    (q) => q.addedOrChanged.with(AmbientLight).trackWrites,
  );

  async prepare() {
    this.prepareUniforms = (template, binding) => {
      template.setUniforms(binding, [
        { name: 'padding', value: new Array(976).fill(0) },
      ]);
    };
  }

  execute(): void {
    this.lights.addedOrChanged.forEach((entity) => {
      this.pipeline.passesChanged = true;

      // const is_orthographic = extracted_view.projection.w_axis.w == 1.0;
      // let cluster_factors_zw = calculate_cluster_factors(
      //     clusters.near,
      //     clusters.far,
      //     clusters.dimensions.z as f32,
      //     is_orthographic,
      // );

      const ambient_light = entity.read(AmbientLight);
      const ambient_color = new Vec4(
        ...ambient_light.color.as_linear_rgba_f32(),
      ).mul(ambient_light.brightness);

      this.prepareUniforms = (template, binding) => {
        template.setUniforms(binding, [
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
      };
    });
  }
}
