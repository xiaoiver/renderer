import { component, system } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { FogPlugin } from '../Fog';
import { SkyboxPlugin } from '../Skybox';
import {
  AmbientLight,
  DirectionalLight,
  ExtractedDirectionalLight,
  PointLight,
  Cascade,
  CascadeShadowConfig,
  Cascades,
  ClusterConfig,
  Clusters,
  CascadesFrusta,
  DirectionalLightShadowMap,
} from '../../components';
import {
  ExtractLights,
  PreUpdate,
  PrepareLights,
  PostUpdate,
  AddClusters,
  AssignLightsToClusters,
  ClearDirectionalLightCascades,
  BuildDirectionalLightCascades,
  Update,
  UpdateDirectionalLightFrusta,
} from '../../systems';

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
    component(ClusterConfig);
    component(Clusters);
    component(Cascade);
    component(Cascades);
    component(CascadeShadowConfig);
    component(AmbientLight);
    component(PointLight);
    component(DirectionalLight);
    component(ExtractedDirectionalLight);

    app.init_resource(
      DirectionalLightShadowMap,
      new DirectionalLightShadowMap(),
    );

    await new FogPlugin().build(app);
    await new SkyboxPlugin().build(app);

    app.add_systems(PreUpdate, ExtractLights);
    app.add_systems(PreUpdate, PrepareLights);
    app.add_systems(PostUpdate, AddClusters);
    app.add_systems(PostUpdate, AssignLightsToClusters);
    app.add_systems(PostUpdate, ClearDirectionalLightCascades);
    app.add_systems(PostUpdate, BuildDirectionalLightCascades);
    system((s) => s.afterWritersOf(Cascades))(BuildDirectionalLightCascades);
    app.add_systems(PostUpdate, UpdateDirectionalLightFrusta);
  }
}
