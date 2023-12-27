import { System } from '@lastolivegames/becsy';
import {
  CascadeShadowConfig,
  Cascades,
  DirectionalLight,
  ExtractedDirectionalLight,
  GlobalTransform,
} from '../../components';

/**
 * extract_lights
 */
export class ExtractLights extends System {
  directional_lights = this.query(
    (q) => q.addedOrChanged.with(DirectionalLight, GlobalTransform).trackWrites,
  );

  constructor() {
    super();
    this.query(
      (q) =>
        q
          .using(ExtractedDirectionalLight)
          .write.using(GlobalTransform, CascadeShadowConfig, Cascades).read,
    );
  }

  execute(): void {
    this.directional_lights.addedOrChanged.forEach((entity) => {
      const {
        color,
        illuminance,
        shadows_enabled,
        shadow_depth_bias,
        shadow_normal_bias,
      } = entity.read(DirectionalLight);
      const transform = entity.read(GlobalTransform);
      const cascade_shadow_config = entity.read(CascadeShadowConfig);
      const cascades = entity.read(Cascades);

      console.log('transform changed...');

      if (!entity.has(ExtractedDirectionalLight)) {
        entity.add(ExtractedDirectionalLight, {
          color,
          illuminance,
          shadows_enabled,
          shadow_depth_bias,
          shadow_normal_bias,
          transform,
          cascade_shadow_config,
          cascades: cascades.cascades,
        });
      } else {
        const extracted = entity.write(ExtractedDirectionalLight);
        extracted.color = color;
        extracted.illuminance = illuminance;
        extracted.shadows_enabled = shadows_enabled;
        extracted.shadow_depth_bias = shadow_depth_bias;
        extracted.shadow_normal_bias = shadow_normal_bias;
        extracted.transform = transform;
        extracted.cascade_shadow_config = cascade_shadow_config;
        extracted.cascades = cascades.cascades;
      }
    });
  }
}
