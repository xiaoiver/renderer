import { App } from '../App';
import { Event } from '../Events';
import { Plugin } from '../Plugin';
import { Vec2 } from '../math';
import { Input } from '../resources/Input';
import {
  InitWindow,
  InputKeyCode,
  InputMouseButton,
  KeyCode,
  KeyboardInput,
  KeyboardInputSystem,
  MouseButton,
  MouseButtonInput,
  MouseButtonInputSystem,
  PreStartUp,
  PreUpdate,
} from '../systems';

export class MouseWheel extends Event {
  x: number;
  y: number;
}

export class MouseMotion extends Event {
  delta: Vec2;
}

/**
 * Provides input functionality
 */
export class InputPlugin implements Plugin {
  build(app: App) {
    app
      .add_systems(PreStartUp, InitWindow)
      // keyboard
      .add_event(KeyboardInput)
      .init_resource(InputKeyCode, new Input<KeyCode>())
      .add_systems(PreUpdate, KeyboardInputSystem)
      // mouse
      .add_event(MouseButtonInput)
      .add_event(MouseWheel)
      .add_event(MouseMotion)
      .init_resource(InputMouseButton, new Input<MouseButton>())
      .add_systems(PreUpdate, MouseButtonInputSystem);
  }
}
