import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import {
  Camera,
  ComputedCameraValues,
  Perspective,
  Orthographic,
  Viewport,
  Projection,
  LookTransform,
  Smoother,
} from '../components';
import {
  CameraSystem,
  Control,
  LookTransformSystem,
  PreStartUp,
  PreUpdate,
  Update,
} from '../systems';

export class CameraPlugin implements Plugin {
  async build(app: App) {
    component(Camera);
    component(ComputedCameraValues);
    component(Viewport);
    component(Projection)(Perspective);
    component(Projection)(Orthographic);
    component(LookTransform);
    component(Smoother);

    app.addSystems(PreStartUp, Control);
    app.addSystems(PreUpdate, CameraSystem);
    app.addSystems(Update, LookTransformSystem);
  }
}
