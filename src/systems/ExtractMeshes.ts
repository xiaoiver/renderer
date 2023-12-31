import { Buffer, BufferUsage, Device } from '@antv/g-device-api';
import { System } from '@lastolivegames/becsy';
import { RenderResource } from './RenderResource';
import { Mesh } from '../meshes';
import { GlobalTransform } from '../components';

/**
 * We use `@group(2)` in device api for now.
 */
export const MESH_BINDING = 0;

/**
 * Extract meshes and generate a storage buffer.
 */
export class ExtractMeshes extends System {
  /**
   * Mesh storage buffer.
   */
  meshStorageBuffer: Buffer;

  private rendererResource = this.attach(RenderResource);
  private device: Device;

  private renderables = this.query(
    (q) => q.addedOrChanged.with(Mesh, GlobalTransform).trackWrites,
  );

  async prepare() {
    this.device = this.rendererResource.device;
  }

  initialize(): void {
    this.meshStorageBuffer = this.device.createBuffer({
      viewOrSize: new Float32Array(1000),
      usage: BufferUsage.STORAGE,
    });
  }

  execute(): void {
    const meshStorageBufferData = [];
    let previous_transform: number[] = new Array(12).fill(0);
    for (const renderable of this.renderables.addedOrChanged) {
      const affine = GlobalTransform.copy(renderable.read(GlobalTransform));
      const transform = affine
        .to_transpose()
        .map((v) => v.to_array())
        .flat();
      previous_transform = transform;
      const [inverse_transpose_model_a, inverse_transpose_model_b] =
        affine.inverse_transpose_3x3();

      meshStorageBufferData.push(
        ...transform,
        ...previous_transform,
        ...inverse_transpose_model_a,
        inverse_transpose_model_b,
        0,
      );

      // pub struct MeshFlags: u32 {
      //   const SHADOW_RECEIVER             = (1 << 0);
      //   const TRANSMITTED_SHADOW_RECEIVER = (1 << 1);
      //   // Indicates the sign of the determinant of the 3x3 model matrix. If the sign is positive,
      //   // then the flag should be set, else it should not be set.
      //   const SIGN_DETERMINANT_MODEL_3X3  = (1 << 31);
      //   const NONE                        = 0;
      //   const UNINITIALIZED               = 0xFFFF;
      // }
      // flags: mesh_transforms.flags,
    }

    if (this.renderables.addedOrChanged.length) {
      // Set mesh storage buffer
      this.meshStorageBuffer.setSubData(
        0,
        new Uint8Array(new Float32Array(meshStorageBufferData).buffer),
      );
    }
  }
}
