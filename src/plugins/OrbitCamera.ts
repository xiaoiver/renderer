import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { OrbitCameraController } from '../components';
import {
  OrbitControl,
  PreStartUp,
  Update,
  UpdateControlEvents,
} from '../systems';

export class OrbitCameraPlugin implements Plugin {
  build(app: App) {
    component(OrbitCameraController);

    app.addSystems(PreStartUp, UpdateControlEvents);
    app.addSystems(Update, OrbitControl);
  }
}
