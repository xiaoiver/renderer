import { System, system } from '@lastolivegames/becsy';
import {
  Camera,
  GaussianCloud,
  GaussianCloudSettings,
  GlobalTransform,
  SortMode,
  SortedEntries,
} from '../../components';
import { Vec3 } from '../../math';

@system((s) => s.afterWritersOf(SortedEntries))
export class StdSort extends System {
  gaussian_clouds = this.query((q) =>
    q.current.with(GaussianCloud, GaussianCloudSettings, SortedEntries),
  );
  cameras = this.query((q) => q.current.with(Camera, GlobalTransform));

  constructor() {
    super();
    this.query((q) => q.using(SortedEntries).write);
  }

  private last_camera_position: Vec3 = Vec3.ZERO;
  private sort_done: boolean;
  private camera_debounce: boolean;

  execute(): void {
    // TODO: avoid polling camera's position
    this.cameras.current.forEach((entity) => {
      const camera_transform = GlobalTransform.copy(
        entity.read(GlobalTransform),
      );
      let camera_position = camera_transform.compute_transform().translation;
      let camera_movement = !this.last_camera_position.eq(camera_position);

      if (camera_movement) {
        this.sort_done = false;
        this.camera_debounce = true;
      } else {
        if (this.sort_done) {
          return;
        }
      }

      if (this.camera_debounce) {
        this.last_camera_position = camera_position;
        this.camera_debounce = false;
        return;
      }

      this.gaussian_clouds.current.forEach((entity) => {
        const gaussian_cloud = entity.read(GaussianCloud);
        const settings = entity.read(GaussianCloudSettings);
        const sorted_entries = entity.write(SortedEntries);

        if (settings.sort_mode != SortMode.Std) {
          return;
        }

        this.sort_done = true;

        gaussian_cloud.position_visibility.forEach(
          (position_visibility, idx) => {
            const sort_entry = sorted_entries.sorted[idx];

            const position = position_visibility.position;
            const delta = camera_position.sub(Vec3.from_array(position));

            sort_entry.key = delta.length_squared();
            sort_entry.index = idx;
          },
        );

        sorted_entries.sorted.sort(function (a, b) {
          return b.key - a.key;
        });
      });
    });
  }
}
