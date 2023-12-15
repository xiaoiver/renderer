import { System } from '@lastolivegames/becsy';
import {
  AppConfig,
  LookAngles,
  LookTransform,
  OrbitCameraController,
  Transform,
} from '../components';
import { Vec2, Vec3 } from '../math';
import { UpdateControlEvents } from './UpdateControlEvents';

export type ControlEvent =
  | ControlEvent.Orbit
  | ControlEvent.TranslateTarget
  | ControlEvent.Zoom;
export namespace ControlEvent {
  export class Orbit {
    constructor(public value: Vec2) {}
  }
  export class TranslateTarget {
    constructor(public value: Vec2) {}
  }
  export class Zoom {
    constructor(public value: number) {}
  }
}

export class OrbitControl extends System {
  private events = this.attach(UpdateControlEvents);

  /**
   * Global app config.
   */
  private appConfig = this.singleton.read(AppConfig);

  private controls = this.query((q) => q.current.with(OrbitCameraController));

  constructor() {
    super();
    this.query((q) => q.using(LookTransform).write.and.using(Transform).read);
  }

  initialize(): void {
    const {
      resources: { keyboard },
    } = this.appConfig;
  }

  execute(): void {
    for (const entity of this.controls.current) {
      const control = entity.read(OrbitCameraController);
      if (control.enabled && this.events.reader.len()) {
        const transform = entity.write(LookTransform);
        const scene_transform = entity.read(Transform);

        const look_angles = LookAngles.from_vector(
          transform.look_direction().neg(),
        );
        let radius_scalar = 1.0;
        const radius = transform.radius();

        const dt = this.delta;
        for (const event of this.events.reader.read()) {
          if (event instanceof ControlEvent.Orbit) {
            const delta = event.value;
            look_angles.add_yaw(dt * -delta.x);
            look_angles.add_pitch(dt * delta.y);
          } else if (event instanceof ControlEvent.TranslateTarget) {
            const delta = event.value;
            const right_dir = scene_transform.rotation.mul_vec3(Vec3.X.neg());
            const up_dir = scene_transform.rotation.mul_vec3(Vec3.Y);
            transform.target.add_assign(
              right_dir.mul(dt * delta.x).add(up_dir.mul(dt * delta.y)),
            );
          } else if (event instanceof ControlEvent.Zoom) {
            radius_scalar *= event.value;
          }
        }

        // look_angles.assert_not_looking_up();

        const new_radius = Math.max(
          Math.min(radius_scalar * radius, 1000000.0),
          0.001,
        );
        transform.eye = transform.target.add(
          look_angles.unit_vector().mul(new_radius),
        );

        // Can only control one camera at a time.
        return;
      }
    }
  }
}
