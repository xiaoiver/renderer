import { field } from '@lastolivegames/becsy';
import { Mat3, Vec3, v3Type } from '../../math';
import { Transform } from '../transform';
import { Bundle } from '../Bundle';

function eye_look_at_target_transform(
  eye: Vec3,
  target: Vec3,
  up: Vec3,
): Transform {
  // If eye and target are very close, we avoid imprecision issues by keeping the look vector a unit vector.
  const look_vector = target.sub(eye).normalize();
  const look_at = eye.add(look_vector);

  return Transform.from_translation(eye).look_at(look_at, up);
}

/**
 * An eye and the target it's looking at. As a component, this can be modified in place of bevy's `Transform`,
 * and the two will stay in sync.
 */
export class LookTransform {
  @field(v3Type) declare eye: Vec3;
  @field(v3Type) declare target: Vec3;
  @field(v3Type) declare up: Vec3;

  static to_transform(t: LookTransform) {
    return eye_look_at_target_transform(t.eye, t.target, t.up);
  }

  constructor(
    options: {
      eye?: Vec3;
      target?: Vec3;
      up?: Vec3;
    } = {},
  ) {
    this.eye = options.eye ?? Vec3.ZERO;
    this.target = options.target ?? Vec3.ZERO;
    this.up = options.up ?? Vec3.Y;
  }

  radius() {
    return this.target.sub(this.eye)._length();
  }

  look_direction() {
    return this.target.sub(this.eye).normalize();
  }
}

/**
 * Preforms exponential smoothing on a `LookTransform`.
 * Set the `lag_weight` between `0.0` and `1.0`, where higher is smoother.
 */
export class Smoother {
  @field.float32 declare lag_weight: number;
  @field.object declare lerp_tfm: LookTransform;
  @field.boolean declare enabled: boolean;

  constructor(
    options: {
      lag_weight?: number;
      lerp_tfm?: LookTransform;
      enabled?: boolean;
    } = {},
  ) {
    this.lag_weight = options.lag_weight ?? 0.9;
    this.lerp_tfm = options.lerp_tfm;
    this.enabled = options.enabled ?? true;
  }

  set_enabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.enabled) {
      // To prevent camera jumping from last lerp before disabling to the current position, reset smoother state
      this.reset();
    }
  }

  set_lag_weight(lag_weight: number) {
    this.lag_weight = lag_weight;
  }

  smooth_transform(new_tfm: LookTransform) {
    const old_lerp_tfm = this.lerp_tfm ?? new_tfm;

    const lead_weight = 1.0 - this.lag_weight;
    const lerp_tfm = new LookTransform({
      eye: old_lerp_tfm.eye
        .mul(this.lag_weight)
        .add(new_tfm.eye.mul(lead_weight)),
      target: old_lerp_tfm.target
        .mul(this.lag_weight)
        .add(new_tfm.target.mul(lead_weight)),
      up: new_tfm.up,
    });

    this.lerp_tfm = lerp_tfm;

    return lerp_tfm;
  }

  reset() {
    this.lerp_tfm = undefined;
  }
}

export class LookTransformBundle extends Bundle {
  transform: LookTransform;
  smoother: Smoother;

  constructor(
    options: Partial<{
      transform: LookTransform;
      smoother: Smoother;
    }> = {},
  ) {
    super();

    const { transform = undefined, smoother = undefined } = options;

    this.transform = transform;
    this.smoother = smoother;
  }
}
