import { System } from '@lastolivegames/becsy';
import { Cascades, DirectionalLight, GlobalTransform } from '../../components';

/**
 * build_directional_light_cascades
 */
export class BuildDirectionalLightCascades extends System {
  lights = this.query(
    (q) => q.with(DirectionalLight, Cascades, GlobalTransform).current,
  );

  execute(): void {
    this.lights.current.forEach((entity) => {
      const directional_light = entity.read(DirectionalLight);
      if (!directional_light.shadows_enabled) {
        return;
      }

      //   const cascades = entity.write(Cascades);
      //   cascades.cascades.clear();
    });
  }
}
