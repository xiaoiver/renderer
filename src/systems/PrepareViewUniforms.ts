import { System } from '@lastolivegames/becsy';
import { Mat4, Vec3, Vec4 } from '../math';
import { ColorGrading } from '../components/render/ColorGrading';
import {
  ComputedCameraValues,
  GlobalTransform,
  Transform,
} from '../components';
import { RenderInst } from '../framegraph';
import { MeshPipeline } from './MeshPipeline';

// binding = 0
const ViewUniformBufferBinding = 0;

export class PrepareViewUniforms extends System {
  /**
   * Used for extracting view uniforms from camera.
   */
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private cameras = this.query(
    (q) =>
      q.addedOrChanged.with(ComputedCameraValues, Transform, ColorGrading)
        .trackWrites,
  );

  constructor() {
    super();
    this.query((q) => q.using(Transform).read);
  }

  execute(): void {
    this.cameras.addedOrChanged.forEach((entity) => {
      const computed = entity.read(ComputedCameraValues);
      const transform = entity.read(Transform);
      const color_grading = entity.read(ColorGrading);
      const { exposure, gamma, pre_saturation, post_saturation } =
        color_grading;

      this.pipeline.passesChanged = true;

      // Becsy will trim undeclared fields and functions.
      const projection_matrix = Mat4.copy(computed.projection_matrix);

      const viewport_size = computed.target_info_physical_size;

      // TODO: update global transform in Transform system.
      const view = new GlobalTransform();
      view.from(transform);
      const world_position = Vec3.copy(view.translation);

      // const world_position = view.translation;
      const view_matrix = view.compute_matrix();
      const inverse_view_matrix = view_matrix.inverse();
      const view_proj_matrix = projection_matrix.mul(
        inverse_view_matrix,
      ) as Mat4;

      this.prepareUniforms = (template, binding = ViewUniformBufferBinding) => {
        template.setUniforms(binding, [
          {
            name: 'view_proj',
            value: view_proj_matrix.to_cols_array_2d(),
          },
          {
            name: 'unjittered_view_proj',
            value: view_proj_matrix.to_cols_array_2d(),
          },
          {
            name: 'inverse_view_proj',
            value: view_proj_matrix.inverse().to_cols_array_2d(),
          },
          {
            name: 'view',
            value: view_matrix.to_cols_array_2d(),
          },
          {
            name: 'inverse_view',
            value: inverse_view_matrix.to_cols_array_2d(),
          },
          {
            name: 'projection',
            value: projection_matrix.to_cols_array_2d(),
          },
          {
            name: 'inverse_projection',
            value: projection_matrix.inverse().to_cols_array_2d(),
          },
          {
            name: 'world_position',
            value: world_position.to_array(),
          },
          {
            name: 'viewport',
            value: [0, 0, viewport_size[0], viewport_size[1]],
          },
          {
            name: 'frustum',
            value: [
              ...Vec4.ZERO.to_array(),
              ...Vec4.ZERO.to_array(),
              ...Vec4.ZERO.to_array(),
              ...Vec4.ZERO.to_array(),
              ...Vec4.ZERO.to_array(),
              ...Vec4.ZERO.to_array(),
            ],
          },
          {
            name: 'color_grading',
            value: [exposure, gamma, pre_saturation, post_saturation],
          },
          {
            name: 'mip_bias',
            value: 0,
          },
        ]);
      };
    });
  }
}
