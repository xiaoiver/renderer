import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Camera, Viewport } from '../components';
import { CameraSystem } from '../systems';

export class CameraPlugin implements Plugin {
  async build(app: App) {
    component(Camera);
    component(Viewport);

    app.addSystems(CameraSystem);
  }
}
