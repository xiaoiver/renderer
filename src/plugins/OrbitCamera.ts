import { component, system } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { OrbitCameraController } from '../components';
import { LookTransformSystem, OrbitControl, Update } from '../systems';

export class OrbitCameraPlugin implements Plugin {
  build(app: App) {
    component(OrbitCameraController);

    app.addSystems(Update, OrbitControl);

    system((s) => s.before(LookTransformSystem))(OrbitControl);
  }
}
