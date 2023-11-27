import { Quat } from './Quat';

/**
 * Conversion from quaternions to Euler rotation sequences.
 * From: http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
 */
export class EulerRot {
  seq = EulerRotSeq.YXZ;

  /**
   * Create the rotation quaternion for the three angles of this euler rotation sequence.
   */
  new_quat(u: number, v: number, w: number) {
    if (this.seq === EulerRotSeq.ZYX) {
      return this.rot_z(w).mul_quat(this.rot_y(v).mul_quat(this.rot_x(u)));
    } else if (this.seq === EulerRotSeq.ZXY) {
      return this.rot_z(w).mul_quat(this.rot_x(v).mul_quat(this.rot_y(u)));
    } else if (this.seq === EulerRotSeq.YXZ) {
      return this.rot_y(w).mul_quat(this.rot_x(v).mul_quat(this.rot_z(u)));
    } else if (this.seq === EulerRotSeq.YZX) {
      return this.rot_y(w).mul_quat(this.rot_z(v).mul_quat(this.rot_x(u)));
    } else if (this.seq === EulerRotSeq.XYZ) {
      return this.rot_x(w).mul_quat(this.rot_y(v).mul_quat(this.rot_z(u)));
    } else if (this.seq === EulerRotSeq.XZY) {
      return this.rot_x(w).mul_quat(this.rot_z(v).mul_quat(this.rot_y(u)));
    }
  }

  rot_x(a: number) {
    return Quat.from_rotation_x(a);
  }
  rot_y(a: number) {
    return Quat.from_rotation_y(a);
  }
  rot_z(a: number) {
    return Quat.from_rotation_z(a);
  }
}

/* Euler rotation sequences.
 * The angles are applied starting from the right.
 *
 * E.g. XYZ will first apply the z-axis rotation.
 * YXZ can be used for yaw (y-axis), pitch (x-axis), roll (z-axis).
 */
enum EulerRotSeq {
  /// Intrinsic three-axis rotation ZYX
  ZYX,
  /// Intrinsic three-axis rotation ZXY
  ZXY,
  /// Intrinsic three-axis rotation YXZ
  YXZ,
  /// Intrinsic three-axis rotation YZX
  YZX,
  /// Intrinsic three-axis rotation XYZ
  XYZ,
  /// Intrinsic three-axis rotation XZY
  XZY,
}
