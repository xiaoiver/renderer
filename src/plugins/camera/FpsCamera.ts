import { component, system } from '@lastolivegames/becsy';
import { Vec2, Vec3 } from '../../math';
import { App } from '../../App';
import { Event } from '../../Events';
import { Plugin } from '../../Plugin';
import {
  EmitFpsControlEvent,
  FpsControl,
  LookTransformSystem,
  Update,
} from '../../systems';
import { FpsCameraController } from '../../components';

export class FpsControlEvent extends Event {
  constructor() {
    super();
  }
}
export namespace FpsControlEvent {
  export class Rotate extends FpsControlEvent {
    constructor(public value: Vec2) {
      super();
    }
  }

  export class TranslateEye extends FpsControlEvent {
    constructor(public value: Vec3) {
      super();
    }
  }
}

export class FpsCameraPlugin implements Plugin {
  build(app: App) {
    component(FpsCameraController);

    app.add_event(FpsControlEvent);
    // app.add_systems(PreUpdate, OnControlEnabledChanged);
    app.add_systems(Update, FpsControl);
    app.add_systems(Update, EmitFpsControlEvent);

    system((s) => s.before(LookTransformSystem))(FpsControl);
  }
}
