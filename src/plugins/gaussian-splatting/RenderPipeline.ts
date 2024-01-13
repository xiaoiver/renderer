import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { MorphPlugin } from './Morph';
import { SortPlugin } from './Sort';

export class RenderPipelinePlugin implements Plugin {
  async build(app: App) {
    await new SortPlugin().build(app);
    await new MorphPlugin().build(app);
  }
}
