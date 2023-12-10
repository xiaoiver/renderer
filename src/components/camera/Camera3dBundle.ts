import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Orthographic, Perspective } from './Projection';
import { Bundle } from '../Bundle';
import { ComputedCameraValues } from './ComputedCameraValues';
import { Frustum } from '../primitive/Frustum';
import { HalfSpace } from '../primitive/HalfSpace';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  computed: ComputedCameraValues;

  projection: Perspective | Orthographic;

  transform: Transform;

  global_transform: GlobalTransform;

  // frustum: Frustum;

  constructor(
    options?: Partial<{
      camera: Camera;
      computed: ComputedCameraValues;
      projection: Perspective | Orthographic;
      transform: Transform;
      global_transform: GlobalTransform;
      // frustum: Frustum;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      computed = new ComputedCameraValues(),
      transform,
      projection = new Perspective(),
      // frustum = new Frustum([
      //   new HalfSpace(),
      //   new HalfSpace(),
      //   new HalfSpace(),
      //   new HalfSpace(),
      //   new HalfSpace(),
      //   new HalfSpace(),
      // ]),
    } = options || {};

    this.camera = camera;
    this.computed = computed;
    this.transform = transform;
    this.projection = projection;
    // this.frustum = frustum;
  }

  // tonemapping: Tonemapping;
}
