import { System } from '@lastolivegames/becsy';
import { RenderInst } from '../framegraph';
import { FogSettings, FogFalloff } from '../components';
import { MeshPipeline } from './MeshPipeline';

// Important: These must be kept in sync with `mesh_view_types.wgsl`
const GPU_FOG_MODE_OFF = 0;
const GPU_FOG_MODE_LINEAR = 1;
const GPU_FOG_MODE_EXPONENTIAL = 2;
const GPU_FOG_MODE_EXPONENTIAL_SQUARED = 3;
const GPU_FOG_MODE_ATMOSPHERIC = 4;

/**
 * Prepares fog metadata and writes the fog-related uniform buffers to the GPU
 */
export class PrepareFog extends System {
  /**
   * Used for extracting fog uniforms.
   */
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private fogs = this.query(
    (q) => q.addedOrChanged.with(FogSettings).trackWrites,
  );

  execute(): void {
    this.fogs.addedOrChanged.forEach((entity) => {
      console.log('fog...');
      this.pipeline.passesChanged = true;
      const fog = entity.read(FogSettings);
      const {
        color,
        directional_light_color,
        directional_light_exponent,
        falloff,
      } = fog;

      let mode = GPU_FOG_MODE_OFF;
      let be: [number, number, number];
      let bi = [0, 0, 0];
      if (falloff instanceof FogFalloff.Linear) {
        mode = GPU_FOG_MODE_LINEAR;
        be = [falloff.start, falloff.end, 0.0];
      } else if (falloff instanceof FogFalloff.Exponential) {
        mode = GPU_FOG_MODE_EXPONENTIAL;
        be = [falloff.density, 0.0, 0.0];
      } else if (falloff instanceof FogFalloff.ExponentialSquared) {
        mode = GPU_FOG_MODE_EXPONENTIAL_SQUARED;
        be = [falloff.density, 0.0, 0.0];
      } else if (falloff instanceof FogFalloff.Atmospheric) {
        mode = GPU_FOG_MODE_ATMOSPHERIC;
        be = falloff.extinction.to_array();
        bi = falloff.inscattering.to_array();
      }

      this.prepareUniforms = (template, binding) => {
        template.setUniforms(binding, [
          {
            name: 'base_color',
            value: color.as_linear_rgba_f32(),
          },
          {
            name: 'directional_light_color',
            value: directional_light_color.as_linear_rgba_f32(),
          },
          {
            name: 'be',
            value: be,
          },
          {
            name: 'directional_light_exponent',
            value: directional_light_exponent,
          },
          {
            name: 'bi',
            value: bi,
          },
          {
            name: 'mode',
            value: mode,
          },
        ]);
      };
    });
  }
}
