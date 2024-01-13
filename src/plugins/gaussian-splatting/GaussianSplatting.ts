import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  SphericalHarmonicCoefficients,
  GaussianCloud,
  GaussianCloudSettings,
  Gaussian,
} from '../../components';
import { RenderPipelinePlugin } from './RenderPipeline';

export class GaussianSplattingPlugin implements Plugin {
  async build(app: App) {
    component(SphericalHarmonicCoefficients);
    component(Gaussian);
    component(GaussianCloud);
    component(GaussianCloudSettings);

    await new RenderPipelinePlugin().build(app);
  }
}
