import { System } from '@lastolivegames/becsy';
import {
  AppConfig,
  Camera,
  ComputedCameraValues,
  Orthographic,
  Perspective,
} from '../../components';
import { Vec2 } from '../../math';

// export class ExtractCameras extends System {
//   private cameras = this.query(
//     (q) => q.added.with(Camera).trackWrites,
//   );

//   execute(): void {
//     const { canvas } = this.appConfig;
//     const { width, height } = canvas;
//     this.cameras.added.forEach((entity) => {
//       const camera = entity.read(Camera);
//       if (!camera.is_active) {
//         return;
//       }

//       entity.add(ExtractedCamera, {})

//       camera.physical_viewport_rect()
//     });
//   }
// }

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
export class CameraSystem extends System {
  private appConfig = this.singleton.read(AppConfig);

  constructor() {
    super();
    this.query(
      (q) => q.using(ComputedCameraValues, Perspective, Orthographic).write,
    );
  }

  private cameras = this.query(
    (q) => q.addedOrChanged.with(Camera).trackWrites,
  );

  execute(): void {
    const { canvas } = this.appConfig;
    const { width, height } = canvas;
    this.cameras.addedOrChanged.forEach((entity) => {
      const camera = entity.read(Camera);
      const computed = entity.write(ComputedCameraValues);
      const viewport_size = camera.viewport?.physical_size;

      computed.target_info_physical_size = new Vec2(width, height);
      computed.target_info_scale_factor = 1;

      let projection: Orthographic | Perspective;
      const size = camera.logical_viewport_size(computed);
      if (entity.has(Orthographic)) {
        projection = entity.write(Orthographic);
      } else if (entity.has(Perspective)) {
        projection = entity.write(Perspective);
      }
      projection.update(size.x, size.y);
      computed.projection_matrix = projection.get_projection_matrix();

      if (viewport_size && !computed.old_viewport_size?.eq(viewport_size)) {
        computed.old_viewport_size = viewport_size;
      }
    });
  }
}
