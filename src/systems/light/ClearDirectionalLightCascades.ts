import { System } from '@lastolivegames/becsy';
import { Cascades, DirectionalLight } from '../../components';

/**
 * clear_directional_light_cascades
 */
export class ClearDirectionalLightCascades extends System {
  lights = this.query((q) => q.current.with(DirectionalLight));

  constructor() {
    super();
    this.query((q) => q.using(Cascades).read);
  }

  execute(): void {
    this.lights.current.forEach((entity) => {
      const directional_light = entity.read(DirectionalLight);
      if (!directional_light.shadows_enabled) {
        return;
      }

      const cascades = entity.read(Cascades);
      cascades.cascades.clear();
    });
  }
}
