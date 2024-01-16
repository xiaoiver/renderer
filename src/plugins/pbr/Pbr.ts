import { System, component, system } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { FogPlugin } from '../Fog';
import {
  AmbientLight,
  DirectionalLight,
  ExtractedDirectionalLight,
  PointLight,
  Cascade,
  CascadeShadowConfig,
  CascadesVisibleEntities,
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
  CheckLightMeshVisibility,
} from '../../systems';
import { SimulationLightSystems } from './Light';

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
export class PbrPlugin implements Plugin {
  async build(app: App) {
    component(ClusterConfig);
    component(Clusters);
    component(Cascade);
    component(Cascades);
    component(CascadeShadowConfig);
    component(CascadesVisibleEntities);
    component(AmbientLight);
    component(PointLight);
    component(DirectionalLight);
    component(ExtractedDirectionalLight);

    app.init_resource(
      DirectionalLightShadowMap,
      new DirectionalLightShadowMap(),
    );

    await new FogPlugin().build(app);

    app.add_systems(PreUpdate, ExtractLights);
    app.add_systems(PreUpdate, PrepareLights);
    app.add_systems(SimulationLightSystems.AddClusters, AddClusters);
    app.add_systems(
      SimulationLightSystems.AddClustersFlush,
      class AddClustersFlushPlaceHolder extends System {},
    );
    app.add_systems(
      SimulationLightSystems.AssignLightsToClusters,
      AssignLightsToClusters,
    );

    app.add_systems(
      SimulationLightSystems.UpdateDirectionalLightCascades,
      ClearDirectionalLightCascades,
      BuildDirectionalLightCascades,
    );
    app.add_systems(
      SimulationLightSystems.UpdateLightFrusta,
      UpdateDirectionalLightFrusta,
    );
    app.add_systems(
      SimulationLightSystems.CheckLightVisibility,
      CheckLightMeshVisibility,
    );
  }
}
