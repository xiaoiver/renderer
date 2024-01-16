import { component, system } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  Camera,
  ComputedCameraValues,
  Perspective,
  Orthographic,
  Viewport,
  Projection,
  LookTransform,
  Smoother,
} from '../../components';
import {
  CameraSystem,
  ExtractCameras,
  LookTransformSystem,
  PreUpdate,
  Update,
} from '../../systems';

export class CameraPlugin implements Plugin {
  async build(app: App) {
    component(Camera);
    component(Viewport);
    component(ComputedCameraValues);
    component(Projection)(Perspective);
    component(Projection)(Orthographic);
    component(LookTransform);
    component(Smoother);

    app.add_systems(PreUpdate, CameraSystem);
    app.add_systems(PreUpdate, ExtractCameras);
    app.add_systems(Update, LookTransformSystem);

    system((s) => s.afterWritersOf(Camera))(CameraSystem);
  }
}
