import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { PostUpdate, PreUpdate } from '../../systems';
import {
  GaussianCloudPipeline,
  PrepareGaussianCloudUniforms,
} from '../../systems/gaussian-splatting';
import { MorphPlugin } from './Morph';
import { SortPlugin } from './Sort';

export class RenderPipelinePlugin implements Plugin {
  async build(app: App) {
    await new SortPlugin().build(app);
    await new MorphPlugin().build(app);
    app.add_systems(PreUpdate, PrepareGaussianCloudUniforms);
    app.add_systems(PostUpdate, GaussianCloudPipeline);
  }
}
