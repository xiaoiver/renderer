import { Mat3, Vec3 } from '../../math';

/**
 * A (yaw, pitch) pair representing a direction.
 */
export class LookAngles {
  static from_vector(v: Vec3) {
    const p = new LookAngles();
    p.set_direction(v);
    return p;
  }

  // The fields are protected to keep them in an allowable range for the camera transform.
  yaw: number;
  pitch: number;

  constructor(
    options: Partial<{
      yaw: number;
      pitch: number;
    }> = {},
  ) {
    this.yaw = options.yaw ?? 0.0;
    this.pitch = options.pitch ?? 0.0;
  }

  unit_vector() {
    return unit_vector_from_yaw_and_pitch(this.yaw, this.pitch);
  }

  set_direction(v: Vec3) {
    const [yaw, pitch] = yaw_and_pitch_from_vector(v);
    this.set_yaw(yaw);
    this.set_pitch(pitch);
  }

  set_yaw(yaw: number) {
    this.yaw = yaw % (2.0 * Math.PI);
  }

  get_yaw() {
    return this.yaw;
  }

  add_yaw(delta: number) {
    this.set_yaw(this.get_yaw() + delta);
  }

  set_pitch(pitch: number) {
    // Things can get weird if we are parallel to the UP vector.
    const up_eps = 0.01;
    this.pitch = Math.max(
      Math.min(pitch, Math.PI / 2.0 - up_eps),
      -Math.PI / 2.0 + up_eps,
    );
  }

  get_pitch() {
    return this.pitch;
  }

  add_pitch(delta: number) {
    this.set_pitch(this.get_pitch() + delta);
  }
}

function yaw_and_pitch_from_vector(v: Vec3): [number, number] {
  const y = Vec3.Y;
  const z = Vec3.Z;
  const v_xz = new Vec3(v.x, 0.0, v.z);

  if (v_xz.eq(Vec3.ZERO)) {
    if (v.dot(y) > 0.0) {
      return [0.0, Math.PI / 2.0];
    } else {
      return [0.0, -Math.PI / 2.0];
    }
  }

  let yaw = v_xz.angle_between(z);
  if (v.x < 0.0) {
    yaw *= -1.0;
  }

  let pitch = v_xz.angle_between(v);
  if (v.y < 0.0) {
    pitch *= -1.0;
  }

  return [yaw, pitch];
}

function unit_vector_from_yaw_and_pitch(yaw: number, pitch: number): Vec3 {
  let ray = Mat3.from_rotation_y(yaw).mul_vec3(Vec3.Z);
  let pitch_axis = ray.cross(Vec3.Y);

  return Mat3.from_axis_angle(pitch_axis, pitch).mul_vec3(ray);
}
