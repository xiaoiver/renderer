import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Orthographic, Perspective } from './Projection';
import { Bundle } from '../Bundle';
import { ComputedCameraValues } from './ComputedCameraValues';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  computed: ComputedCameraValues;

  projection: Perspective | Orthographic;

  transform: Transform;

  global_transform: GlobalTransform;

  constructor(
    options?: Partial<{
      camera: Camera;
      computed: ComputedCameraValues;
      projection: Perspective | Orthographic;
      transform: Transform;
      global_transform: GlobalTransform;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      computed = new ComputedCameraValues(),
      transform,
      projection = new Perspective(),
    } = options || {};

    this.camera = camera;
    this.computed = computed;
    this.transform = transform;
    this.projection = projection;
  }

  // tonemapping: Tonemapping;
}
