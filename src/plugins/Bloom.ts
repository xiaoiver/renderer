import { component } from '@lastolivegames/becsy';
import { Plugin } from '../Plugin';
import { BloomSettings } from '../components';
import { App } from '../App';
import { BloomPipeline, PreUpdate, Update } from '../systems';

/**
 * Adds support for Fast Approximate Anti-Aliasing (FXAA)
 */
export class BloomPlugin implements Plugin {
  async build(app: App) {
    component(BloomSettings);

    app.addSystems(PreUpdate, BloomPipeline);
  }
}
