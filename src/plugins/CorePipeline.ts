import { component } from '@lastolivegames/becsy';
import { Plugin } from '../Plugin';
import { App } from '../App';
import { Core3dPlugin } from './Core3d';
import { FxaaPlugin } from './Fxaa';
import { TonemappingPlugin } from './Tonemapping';
import { BloomPlugin } from './Bloom';
import { ClearColor, ColorGrading, PipelineDirty } from '../components';

/**
 * Provides a core render pipeline.
 */
export class CorePipeline implements Plugin {
  async build(app: App) {
    component(ClearColor);
    component(ColorGrading);
    component(PipelineDirty);

    await new Core3dPlugin().build(app);
    // await new TonemappingPlugin().build(app);
    await new BloomPlugin().build(app);
    await new FxaaPlugin().build(app);
  }
}
