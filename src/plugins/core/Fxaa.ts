import { component } from '@lastolivegames/becsy';
import { Plugin } from '../../Plugin';
import { Fxaa } from '../../components';
import { App } from '../../App';
import { FxaaPipeline, PreUpdate } from '../../systems';

/**
 * Adds support for Fast Approximate Anti-Aliasing (FXAA)
 */
export class FxaaPlugin implements Plugin {
  async build(app: App) {
    component(Fxaa);

    app.add_systems(PreUpdate, FxaaPipeline);
  }
}
