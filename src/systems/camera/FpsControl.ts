import { System } from '@lastolivegames/becsy';
import {
  AppConfig,
  FpsCameraController,
  LookAngles,
  LookTransform,
  Transform,
} from '../../components';
import { FpsControlEvent } from '../../plugins/camera/FpsCamera';
import { EventsReader } from '../../Events';
import { Quat, Vec3 } from '../../math';

export class FpsControl extends System {
  private appConfig = this.singleton.read(AppConfig);

  private controls = this.query((q) => q.current.with(FpsCameraController));

  constructor() {
    super();
    this.query((q) => q.using(LookTransform).write.and.using(Transform).read);
  }

  execute(): void {
    for (const entity of this.controls.current) {
      const control = entity.read(FpsCameraController);
      const reader = this.appConfig.resources.get(
        FpsControlEvent,
      ) as EventsReader<FpsControlEvent>;

      if (control.enabled && reader.len()) {
        const transform = entity.write(LookTransform);
        // const scene_transform = entity.read(Transform);

        const look_vector = transform.look_direction();
        const look_angles = LookAngles.from_vector(look_vector);

        const yaw_rot = Quat.from_axis_angle(Vec3.Y, look_angles.get_yaw());
        const rot_x = yaw_rot.mul(Vec3.X);
        const rot_y = yaw_rot.mul(Vec3.Y);
        const rot_z = yaw_rot.mul(Vec3.Z);

        const dt = this.delta;
        for (const event of reader.read()) {
          if (event instanceof FpsControlEvent.Rotate) {
            // Rotates with pitch and yaw.
            const delta = event.value;
            look_angles.add_yaw(dt * -delta.x);
            look_angles.add_pitch(dt * -delta.y);
          } else if (event instanceof FpsControlEvent.TranslateEye) {
            const delta = event.value;
            // Translates up/down (Y) left/right (X) and forward/back (Z).
            transform.eye.add_assign(
              rot_x
                .mul(dt * delta.x)
                .add(rot_y.mul(dt * delta.y))
                .add(rot_z.mul(dt * delta.z)),
            );
          }
        }

        transform.target = transform.eye.add(
          look_angles.unit_vector().mul(transform.radius()),
        );

        return;
      }
    }
  }
}
