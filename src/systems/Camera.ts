import { System, system } from '@lastolivegames/becsy';
import { Camera, Orthographic, Perspective, Projection } from '../components';
import { ComputedCameraValues } from '../components/camera/Camera';

/**
 * System in charge of updating a [`Camera`] when its window or projection changes.
 *
 * The system detects window creation and resize events to update the camera projection if
 * needed. It also queries any [`CameraProjection`] component associated with the same entity
 * as the [`Camera`] one, to automatically update the camera projection matrix.
 *
 * The system function is generic over the camera projection type, and only instances of
 * [`OrthographicProjection`] and [`PerspectiveProjection`] are automatically added to
 * the app, as well as the runtime-selected [`Projection`].
 */
@system((s) => s.afterWritersOf(Camera))
export class CameraSystem extends System {
  constructor() {
    super();
    this.query((q) => q.using(Camera).write);
  }

  private cameras = this.query(
    (q) => q.addedOrChanged.with(Camera).and.withAny(Projection).trackWrites,
  );

  execute(): void {
    this.cameras.addedOrChanged.forEach((entity) => {
      const camera = entity.write(Camera);
      if (entity.has(Orthographic)) {
      } else if (entity.has(Perspective)) {
        const perspective = entity.read(Perspective);
        const proj_mat = perspective.get_projection_matrix();
        camera.computed = {
          projection_matrix: proj_mat,
          target_info: {},
          old_viewport_size: [],
        } as ComputedCameraValues;
      }
    });
  }
}
