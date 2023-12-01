import { System, system } from '@lastolivegames/becsy';
import { Mat4, Vec3, Vec4 } from '../math';
import { ColorGrading } from '../components/render/ColorGrading';
import { Camera, GlobalTransform, Projection, Transform } from '../components';
import { CameraSystem } from './Camera';
import { RenderInst } from '../framegraph';

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

@system((s) => s.after(CameraSystem))
export class PrepareViewUniforms extends System {
  /**
   * Used for extracting view uniforms from camera.
   */
  viewExtractor: (template: RenderInst) => void;

  private cameras = this.query(
    (q) => q.addedOrChanged.with(Camera).trackWrites,
  );

  constructor() {
    super();
    this.query((q) => q.using(Camera, Transform).read);
  }

  execute(): void {
    this.cameras.addedOrChanged.forEach((entity) => {
      const camera = entity.read(Camera);
      const transform = entity.read(Transform);

      const { projection_matrix } = camera.computed;

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
