import { System } from '@lastolivegames/becsy';
import { AppConfig, FpsCameraController } from '../../components';
import { EventsReader } from '../../Events';
import { Vec2, Vec3 } from '../../math';
import { FpsControlEvent } from '../../plugins/render/FpsCamera';
import { MouseMotion } from '../../plugins/Input';
import { InputKeyCode, KeyCode } from '../input';
import { Input } from '../../resources/Input';

/**
 * Emit ControlEvent according to user input.
 */
export class EmitFpsControlEvent extends System {
  private appConfig = this.singleton.read(AppConfig);

  private orbitCameraController = this.query((q) =>
    q.current.with(FpsCameraController),
  );

  constructor() {
    super();
    this.query((q) => q.using(FpsCameraController).read);
  }

  execute(): void {
    const entity = this.orbitCameraController.current?.[0];
    if (entity) {
      const control = entity.read(FpsCameraController);
      if (control.enabled) {
        const { resources } = this.appConfig;
        const { mouse_rotate_sensitivity, translate_sensitivity } = control;

        const keyboard = resources.get(InputKeyCode) as Input<KeyCode>;
        const mouse_motion_events = resources.get(
          MouseMotion,
        ) as EventsReader<MouseMotion>;
        const reader = resources.get(
          FpsControlEvent,
        ) as EventsReader<FpsControlEvent>;

        const cursor_delta = Vec2.ZERO;
        for (const event of mouse_motion_events.read()) {
          cursor_delta.add_assign(event.delta);
        }

        reader.events.send(
          new FpsControlEvent.Rotate(
            mouse_rotate_sensitivity.mul(cursor_delta),
          ),
        );

        [
          ['KeyW', Vec3.Z],
          ['KeyA', Vec3.X],
          ['KeyS', Vec3.Z.neg()],
          ['KeyD', Vec3.X.neg()],
          ['ShiftLeft', Vec3.Y.neg()],
          ['Space', Vec3.Y],
        ].forEach(([key, dir]: [string, Vec3]) => {
          if (keyboard.pressed(key)) {
            reader.events.send(
              new FpsControlEvent.TranslateEye(dir.mul(translate_sensitivity)),
            );
          }
        });
      }
    }
  }
}
