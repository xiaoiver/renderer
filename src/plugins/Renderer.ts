/**
 * @see https://docs.rs/bevy/latest/bevy/render/struct.RenderPlugin.html
 */
import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import {
  MeshPipeline,
  PrepareViewUniforms,
  Update,
  PreUpdate,
  PreStartUp,
  RenderResource,
  ExtractMeshes,
  PrepareMaterial,
  PostUpdate,
  AddClusters,
  AssignLightsToClusters,
  ClearDirectionalLightCascades,
  BuildDirectionalLightCascades,
} from '../systems';
import {
  Cascade,
  CascadeShadowConfig,
  Cascades,
  ClusterConfig,
  Clusters,
  DirectionalLight,
  Material,
  PointLight,
} from '../components';
import { Mesh } from '../meshes';
import { CascadesFrusta } from '../components/primitive/CascadesFrusta';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Mesh);
    component(Material);
    component(ClusterConfig);
    component(Clusters);
    component(Cascade);
    component(Cascades);
    component(CascadesFrusta);
    component(CascadeShadowConfig);
    component(PointLight);
    component(DirectionalLight);

    app.add_systems(PreStartUp, RenderResource);
    app.add_systems(PreUpdate, PrepareViewUniforms);
    app.add_systems(PreUpdate, PrepareMaterial);
    app.add_systems(Update, ExtractMeshes);
    app.add_systems(Update, MeshPipeline);
    app.add_systems(PostUpdate, AddClusters);
    app.add_systems(PostUpdate, AssignLightsToClusters);
    app.add_systems(PostUpdate, ClearDirectionalLightCascades);
    app.add_systems(PostUpdate, BuildDirectionalLightCascades);
  }
}
