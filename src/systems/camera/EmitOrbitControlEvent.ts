import { System } from '@lastolivegames/becsy';
import { AppConfig, OrbitCameraController } from '../../components';
import { EventsReader } from '../../Events';
import { Vec2 } from '../../math';
import { OrbitControlEvent } from '../../plugins/camera/OrbitCamera';
import { MouseMotion, MouseWheel } from '../../plugins/Input';
import { InputKeyCode, InputMouseButton, KeyCode, MouseButton } from '../input';
import { Input } from '../../resources/Input';

/**
 * Emit ControlEvent according to user input.
 */
export class EmitOrbitControlEvent extends System {
  private appConfig = this.singleton.read(AppConfig);

  private orbitCameraController = this.query((q) =>
    q.current.with(OrbitCameraController),
  );

  constructor() {
    super();
    this.query((q) => q.using(OrbitCameraController).read);
  }

  execute(): void {
    const entity = this.orbitCameraController.current?.[0];
    if (entity) {
      const control = entity.read(OrbitCameraController);
      if (control.enabled) {
        const { resources } = this.appConfig;
        const {
          mouse_rotate_sensitivity,
          mouse_translate_sensitivity,
          mouse_wheel_zoom_sensitivity,
          pixels_per_line,
        } = control;

        const mouse_buttons = resources.get(
          InputMouseButton,
        ) as Input<MouseButton>;
        const keyboard = resources.get(InputKeyCode) as Input<KeyCode>;
        const mouse_wheel_reader = resources.get(
          MouseWheel,
        ) as EventsReader<MouseWheel>;
        const mouse_motion_events = resources.get(
          MouseMotion,
        ) as EventsReader<MouseMotion>;
        const reader = resources.get(
          OrbitControlEvent,
        ) as EventsReader<OrbitControlEvent>;

        const cursor_delta = Vec2.ZERO;
        for (const event of mouse_motion_events.read()) {
          cursor_delta.add_assign(event.delta);
        }

        if (keyboard.pressed('ControlLeft')) {
          console.log('ControlLeft...');
          reader.events.send(
            new OrbitControlEvent.Orbit(
              cursor_delta.mul(mouse_rotate_sensitivity),
            ),
          );
        }

        if (mouse_buttons.pressed(MouseButton.Right)) {
          reader.events.send(
            new OrbitControlEvent.TranslateTarget(
              mouse_translate_sensitivity.mul(cursor_delta),
            ),
          );
        }

        let scalar = 1.0;
        for (const event of mouse_wheel_reader.read()) {
          const { y } = event;
          const scroll_amount = y / pixels_per_line;
          scalar *= 1.0 - scroll_amount * mouse_wheel_zoom_sensitivity;
        }
        if (scalar !== 1.0) {
          reader.events.send(new OrbitControlEvent.Zoom(scalar));
        }
      }
    }
  }
}
