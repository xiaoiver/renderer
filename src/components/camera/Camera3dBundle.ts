import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Projection } from './Projection';
import { Bundle } from '../Bundle';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  projection: typeof Projection;

  transform: Transform;

  global_transform: GlobalTransform;

  constructor(
    options?: Partial<{
      camera: Camera;
      projection: typeof Projection;
      transform: Transform;
      global_transform: GlobalTransform;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      transform,
      // projection = Projection
    } = options || {};

    this.camera = camera;
    this.transform = transform;
  }

  // tonemapping: Tonemapping;
}
