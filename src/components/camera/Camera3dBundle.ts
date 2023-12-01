import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Orthographic, Perspective } from './Projection';
import { Bundle } from '../Bundle';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  projection: Perspective | Orthographic;

  transform: Transform;

  global_transform: GlobalTransform;

  constructor(
    options?: Partial<{
      camera: Camera;
      projection: Perspective | Orthographic;
      transform: Transform;
      global_transform: GlobalTransform;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      transform,
      projection = new Perspective(),
    } = options || {};

    this.camera = camera;
    this.transform = transform;
    this.projection = projection;
  }

  // tonemapping: Tonemapping;
}
