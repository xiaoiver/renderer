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
} from '../components';
import { CameraSystem, PreUpdate } from '../systems';

export class CameraPlugin implements Plugin {
  async build(app: App) {
    component(Camera);
    component(ComputedCameraValues);
    component(Viewport);
    component(Projection)(Perspective);
    component(Projection)(Orthographic);

    app.addSystems(PreUpdate, CameraSystem);
  }
}
