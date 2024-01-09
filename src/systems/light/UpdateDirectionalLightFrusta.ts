import { Entity, System } from '@lastolivegames/becsy';
import {
  Cascades,
  CascadesFrusta,
  DirectionalLight,
  Frustum,
} from '../../components';

/**
 * update_directional_light_frusta
 */
export class UpdateDirectionalLightFrusta extends System {
  views = this.query((q) => q.with(Cascades, DirectionalLight).current);

  constructor() {
    super();
    this.query((q) => q.using(CascadesFrusta).write);
  }

  execute(): void {
    this.views.current.forEach((entity) => {
      const directional_light = entity.read(DirectionalLight);
      if (!directional_light.shadows_enabled) {
        return;
      }
      const frusta = entity.write(CascadesFrusta);
      const cascades = entity.read(Cascades);
      const map = new Map<Entity, Frustum[]>();
      cascades.cascades.forEach((cascades, view_entity) => {
        map.set(
          view_entity,
          cascades.map((c) => Frustum.from_view_projection(c.view_projection)),
        );
      });
      frusta.frusta = map;
    });
  }
}
