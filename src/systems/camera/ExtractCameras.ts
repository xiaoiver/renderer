import { System } from '@lastolivegames/becsy';
import { Camera } from '../../components';

// TODO: support multi view
export class ExtractCameras extends System {
  cameras = this.query((q) => q.using(Camera).read);

  execute(): void {
    // this.cameras;
  }
}
