import { Vec3 } from '../../math';
import { Bundle } from '../Bundle';
import { Transform } from '../transform';
import { LookTransform, LookTransformBundle, Smoother } from './LookTransform';
import { FpsCameraController } from './FpsCameraController';

export class FpsCameraBundle extends Bundle {
  controller: FpsCameraController;
  look_transform: LookTransformBundle;
  transform: Transform;

  constructor(options: {
    controller: FpsCameraController;
    eye: Vec3;
    target: Vec3;
    up: Vec3;
  }) {
    super();

    const { controller, eye, target, up } = options;

    const transform = Transform.from_translation(eye).look_at(target, up);
    this.controller = controller;
    this.look_transform = new LookTransformBundle({
      transform: new LookTransform({
        eye,
        target,
        up,
      }),
      smoother: new Smoother({
        lag_weight: controller.smoothing_weight,
      }),
    });
    this.transform = transform;
  }
}
