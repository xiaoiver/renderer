import { System, system } from '@lastolivegames/becsy';
import { Mat4, Vec3, Vec4 } from '../math';
import { ColorGrading } from '../components/render/ColorGrading';
import {
  ComputedCameraValues,
  GlobalTransform,
  Transform,
} from '../components';
import { RenderInst } from '../framegraph';
import { CameraSystem } from './Camera';

// binding = 0
const ViewUniformBufferBinding = 0;

// Used in view.wgsl
interface ViewUniform {
  view_proj: Mat4;
  unjittered_view_proj: Mat4;
  inverse_view_proj: Mat4;
  view: Mat4;
  inverse_view: Mat4;
  projection: Mat4;
  inverse_projection: Mat4;
  world_position: Vec3;
  // viewport(x_origin, y_origin, width, height)
  viewport: Vec4;
  frustum: [Vec4, Vec4, Vec4, Vec4, Vec4, Vec4];
  color_grading: ColorGrading;
  mip_bias: number;
}

export class PrepareViewUniforms extends System {
  /**
   * Used for extracting view uniforms from camera.
   */
  viewExtractor: (template: RenderInst) => void;

  private cameras = this.query(
    (q) => q.addedOrChanged.with(ComputedCameraValues).trackWrites,
  );

  constructor() {
    super();
    this.query((q) => q.using(Transform).read);
  }

  execute(): void {
    this.cameras.addedOrChanged.forEach((entity) => {
      const computed = entity.read(ComputedCameraValues);
      const transform = entity.read(Transform);

      // Becsy will trim undeclared fields and functions.
      const projection_matrix = Mat4.copy(computed.projection_matrix);

      // TODO: update global transform in Transform system.
      const view = new GlobalTransform();
      view.from(transform);

      const view_matrix = view.compute_matrix();
      const inverse_view_matrix = view_matrix.inverse();
      const view_proj_matrix = projection_matrix.mul(
        inverse_view_matrix,
      ) as Mat4;

      this.viewExtractor = (template) => {
        template.setUniforms(ViewUniformBufferBinding, [
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
            value: Vec3.ZERO.to_array(),
          },
          {
            name: 'viewport',
            value: Vec4.ZERO.to_array(),
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
            value: Vec4.ZERO.to_array(),
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
