import { System } from '@lastolivegames/becsy';
import { RenderInst } from '../../framegraph';
import {
  GaussianCloud,
  GaussianCloudSettings,
  GlobalTransform,
} from '../../components';
import { MeshPipeline } from '../MeshPipeline';

export class PrepareGaussianCloudUniforms extends System {
  prepareUniforms: (template: RenderInst, binding?: number) => void;

  private pipeline = this.attach(MeshPipeline);

  private settings = this.query(
    (q) =>
      q.addedOrChanged.with(GaussianCloud, GaussianCloudSettings).trackWrites,
  );

  async prepare() {
    this.prepareUniforms = (template, binding) => {
      template.setUniforms(binding, [
        { name: 'padding', value: new Array(20).fill(0) },
      ]);
    };
  }

  execute(): void {
    this.settings.addedOrChanged.forEach((entity) => {
      this.pipeline.passesChanged = true;
      const cloud = entity.read(GaussianCloud);
      const settings = entity.read(GaussianCloudSettings);
      const { global_transform, global_scale } = settings;
      const count = cloud.len();
      const count_root_ceil = cloud.len_sqrt_ceil();
      const transform = GlobalTransform.copy(global_transform)
        .compute_matrix()
        .to_cols_array_2d();

      this.prepareUniforms = (template, binding) => {
        template.setUniforms(binding, [
          {
            name: 'transform',
            value: transform,
          },
          {
            name: 'global_scale',
            value: global_scale,
          },
          {
            name: 'count',
            value: count,
          },
          {
            name: 'count_root_ceil',
            value: count_root_ceil,
          },
        ]);
      };
    });
  }
}
