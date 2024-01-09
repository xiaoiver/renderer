import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  CascadesFrusta,
  CubemapFrusta,
  Frustum,
  Aabb,
  Color,
} from '../../components';
import { CameraPlugin } from './Camera';
import { ViewPlugin } from './View';

/**
 * bevy_render
 */
export class RenderPlugin implements Plugin {
  async build(app: App) {
    // component(Color);
    component(Frustum);
    component(CascadesFrusta);
    component(CubemapFrusta);
    component(Aabb);

    await new CameraPlugin().build(app);
    await new ViewPlugin().build(app);
  }
}
