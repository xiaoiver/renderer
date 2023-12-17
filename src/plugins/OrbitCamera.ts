import { component, system } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { OrbitCameraController } from '../components';
import {
  EmitControlEvent,
  LookTransformSystem,
  OrbitControl,
  Update,
} from '../systems';
import { Vec2 } from '../math';
import { Event } from '../Events';

export class ControlEvent extends Event {
  constructor() {
    super();
  }
}
export namespace ControlEvent {
  export class Orbit extends ControlEvent {
    constructor(public value: Vec2) {
      super();
    }
  }
  export class TranslateTarget extends ControlEvent {
    constructor(public value: Vec2) {
      super();
    }
  }
  export class Zoom extends ControlEvent {
    constructor(public value: number) {
      super();
    }
  }
}

export class OrbitCameraPlugin implements Plugin {
  build(app: App) {
    component(OrbitCameraController);

    app.add_event(ControlEvent);
    // app.add_systems(PreUpdate, OnControlEnabledChanged);
    app.add_systems(Update, OrbitControl);
    app.add_systems(Update, EmitControlEvent);

    system((s) => s.before(LookTransformSystem))(OrbitControl);
  }
}
