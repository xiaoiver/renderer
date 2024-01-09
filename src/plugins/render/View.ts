import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  ColorGrading,
  NoFrustumCulling,
  ViewVisibility,
  Visibility,
} from '../../components';
import { VisibilityPlugin } from './Visibility';

/**
 * @see bevy_render ViewPlugin
 */
export class ViewPlugin implements Plugin {
  async build(app: App) {
    component(ViewVisibility);
    component(NoFrustumCulling);
    component(Visibility);
    component(ColorGrading);

    await new VisibilityPlugin().build(app);
  }
}
