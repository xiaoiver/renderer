import { component } from '@lastolivegames/becsy';
import { Plugin } from '../../Plugin';
import { App } from '../../App';
import { Core3dPlugin, FxaaPlugin, BloomPlugin, TonemappingPlugin } from '.';
import {
  ClearColor,
  ColorGrading,
  DebandDither,
  PipelineDirty,
} from '../../components';

/**
 * Provides a core render pipeline.
 */
export class CorePipeline implements Plugin {
  async build(app: App) {
    component(ClearColor);
    component(DebandDither);
    component(PipelineDirty);

    await new Core3dPlugin().build(app);
    await new TonemappingPlugin().build(app);
    await new BloomPlugin().build(app);
    await new FxaaPlugin().build(app);
  }
}
