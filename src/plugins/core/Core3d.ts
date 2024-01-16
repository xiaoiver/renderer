import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { SkyboxPlugin } from '../Skybox';
export class Core3dPlugin implements Plugin {
  async build(app: App) {
    await new SkyboxPlugin().build(app);
  }
}
