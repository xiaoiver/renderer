import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Orthographic, Perspective } from './Projection';
import { Bundle } from '../Bundle';
import { ComputedCameraValues } from './ComputedCameraValues';
import { Frustum } from '../primitive/Frustum';
import { Tonemapping } from '../pipeline';
import { ColorGrading, DebandDither } from '../render';

export class Camera3dBundle extends Bundle {
  camera: Camera;

  computed: ComputedCameraValues;

  projection: Perspective | Orthographic;

  transform: Transform;

  global_transform: GlobalTransform;

  tonemapping: Tonemapping;

  dither: DebandDither;

  color_grading: ColorGrading;

  frustum: Frustum;

  constructor(
    options?: Partial<{
      camera: Camera;
      computed: ComputedCameraValues;
      projection: Perspective | Orthographic;
      transform: Transform;
      global_transform: GlobalTransform;
      tonemapping: Tonemapping;
      color_grading: ColorGrading;
      dither: DebandDither;
      frustum: Frustum;
    }>,
  ) {
    super();

    const {
      camera = new Camera(),
      computed = new ComputedCameraValues(),
      transform,
      global_transform = new GlobalTransform(),
      projection = new Perspective(),
      tonemapping = new Tonemapping(),
      color_grading = new ColorGrading(),
      dither = new DebandDither(),
      frustum = new Frustum(),
    } = options || {};

    this.camera = camera;
    this.computed = computed;
    this.transform = transform;
    this.global_transform = global_transform;
    this.projection = projection;
    this.tonemapping = tonemapping;
    this.color_grading = color_grading;
    this.dither = dither;
    this.frustum = frustum;
  }
}
