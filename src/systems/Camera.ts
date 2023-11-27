import { System } from '@lastolivegames/becsy';
import { Camera } from '../components';

/**
 * System in charge of updating a [`Camera`] when its window or projection changes.
 *
 * The system detects window creation and resize events to update the camera projection if
 * needed. It also queries any [`CameraProjection`] component associated with the same entity
 * as the [`Camera`] one, to automatically update the camera projection matrix.
 */
export class CameraSystem extends System {
  cameras = this.query((q) => q.using(Camera).write);

  execute(): void {}
}
