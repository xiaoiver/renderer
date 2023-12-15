import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Orthographic, Perspective } from './Projection';
import { Bundle } from '../Bundle';
import { ComputedCameraValues } from './ComputedCameraValues';
import { Frustum } from '../primitive/Frustum';
import { HalfSpace } from '../primitive/HalfSpace';
import { Tonemapping } from '../pipeline';
import { ColorGrading } from '../render';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  computed: ComputedCameraValues;

  projection: Perspective | Orthographic;

  transform: Transform;

  global_transform: GlobalTransform;

  // tonemapping: Tonemapping;

  // dither: DebandDither;
  color_grading: ColorGrading;

  // frustum: Frustum;

  constructor(
    options?: Partial<{
      camera: Camera;
      computed: ComputedCameraValues;
      projection: Perspective | Orthographic;
      transform: Transform;
      global_transform: GlobalTransform;
      // tonemapping: Tonemapping;
      color_grading: ColorGrading;
      // frustum: Frustum;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      computed = new ComputedCameraValues(),
      transform,
      projection = new Perspective(),
      // tonemapping = new Tonemapping.Reinhard(),
      color_grading = new ColorGrading(),
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
    // this.tonemapping = tonemapping;
    this.color_grading = color_grading;
    // this.frustum = frustum;
  }
}
