import { component, system } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { OrbitCameraController } from '../../components';
import {
  EmitOrbitControlEvent,
  LookTransformSystem,
  OrbitControl,
  Update,
} from '../../systems';
import { Vec2, Vec3 } from '../../math';
import { Event } from '../../Events';

export class OrbitControlEvent extends Event {
  constructor() {
    super();
  }
}
export namespace OrbitControlEvent {
  export class Orbit extends OrbitControlEvent {
    constructor(public value: Vec2) {
      super();
    }
  }
  export class TranslateTarget extends OrbitControlEvent {
    constructor(public value: Vec2) {
      super();
    }
  }
  export class Zoom extends OrbitControlEvent {
    constructor(public value: number) {
      super();
    }
  }
}

export class OrbitCameraPlugin implements Plugin {
  build(app: App) {
    component(OrbitCameraController);

    app.add_event(OrbitControlEvent);
    // app.add_systems(PreUpdate, OnControlEnabledChanged);
    app.add_systems(Update, OrbitControl);
    app.add_systems(Update, EmitOrbitControlEvent);

    system((s) => s.before(LookTransformSystem))(OrbitControl);
  }
}
