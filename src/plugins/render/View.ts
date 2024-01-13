import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  ColorGrading,
  InheritedVisibility,
  NoFrustumCulling,
  RenderLayers,
  ViewVisibility,
  Visibility,
  VisibleEntities,
} from '../../components';
import { VisibilityPlugin } from './Visibility';

/**
 * @see bevy_render ViewPlugin
 */
export class ViewPlugin implements Plugin {
  async build(app: App) {
    component(InheritedVisibility);
    component(ViewVisibility);
    component(NoFrustumCulling);
    component(RenderLayers);
    component(Visibility);
    component(VisibleEntities);
    component(ColorGrading);

    await new VisibilityPlugin().build(app);
  }
}
