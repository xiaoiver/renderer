import { component } from '@lastolivegames/becsy';
import { Plugin } from '../Plugin';
import { App } from '../App';
import { Tonemapping } from '../components';
import { PreUpdate, TonemappingPipeline } from '../systems';

/**
 * 3D LUT (look up table) textures used for tonemapping
 */
export class TonemappingPlugin implements Plugin {
  async build(app: App) {
    component(Tonemapping.None);
    component(Tonemapping.Reinhard);
    component(Tonemapping.ReinhardLuminance);
    component(Tonemapping.AcesFitted);
    component(Tonemapping.AgX);
    component(Tonemapping.SomewhatBoringDisplayTransform);
    component(Tonemapping.TonyMcMapface);
    component(Tonemapping.BlenderFilmic);

    // TODO: Load luts
    // await app.addResource()
    app.add_systems(PreUpdate, TonemappingPipeline);
  }
}
