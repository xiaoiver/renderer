import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { FogPlugin } from '../Fog';
import { SkyboxPlugin } from '../Skybox';
import { AmbientLight, ExtractedDirectionalLight } from '../../components';
import { ExtractLights, PreUpdate, PrepareLights } from '../../systems';

/**
 * PREPASS,
  DEFERRED_PREPASS,
  COPY_DEFERRED_LIGHTING_ID,
  END_PREPASSES,
  START_MAIN_PASS,
  MAIN_OPAQUE_PASS,
  MAIN_TRANSMISSIVE_PASS,
  MAIN_TRANSPARENT_PASS,
  END_MAIN_PASS,
  TONEMAPPING,
  END_MAIN_PASS_POST_PROCESSING,
  UPSCALING,
 */
export class Core3dPlugin implements Plugin {
  async build(app: App) {
    component(AmbientLight);
    component(ExtractedDirectionalLight);

    await new FogPlugin().build(app);
    await new SkyboxPlugin().build(app);

    app.add_systems(PreUpdate, ExtractLights);
    app.add_systems(PreUpdate, PrepareLights);
  }
}
