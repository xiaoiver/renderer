import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Skybox } from '../components';

export class SkyboxPlugin implements Plugin {
  async build(app: App) {
    component(Skybox);
  }
}
