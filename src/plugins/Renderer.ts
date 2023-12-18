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
} from '../systems';
import { ClusterConfig, Clusters, Material } from '../components';
import { Mesh } from '../meshes';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Mesh);
    component(Material);
    component(ClusterConfig);
    component(Clusters);

    app.add_systems(PreStartUp, RenderResource);
    app.add_systems(PreUpdate, PrepareViewUniforms);
    app.add_systems(PreUpdate, PrepareMaterial);
    app.add_systems(Update, ExtractMeshes);
    app.add_systems(Update, MeshPipeline);
    app.add_systems(PostUpdate, AddClusters);
  }
}
