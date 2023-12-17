import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Skybox } from '../components';
import { PreUpdate, SkyboxPipeline } from '../systems';

export class SkyboxPlugin implements Plugin {
  async build(app: App) {
    component(Skybox);

    app.add_systems(PreUpdate, SkyboxPipeline);
  }
}
