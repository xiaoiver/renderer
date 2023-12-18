import { component } from '@lastolivegames/becsy';
import { Plugin } from '../../Plugin';
import { App } from '../../App';
import { Tonemapping } from '../../components';
import { PreUpdate, TonemappingPipeline } from '../../systems';

/**
 * 3D LUT (look up table) textures used for tonemapping
 */
export class TonemappingPlugin implements Plugin {
  async build(app: App) {
    component(Tonemapping);
    // TODO: Load luts
    app.add_systems(PreUpdate, TonemappingPipeline);
  }
}
