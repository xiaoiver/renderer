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
} from '../systems';
import { Material } from '../components';
import { Mesh } from '../meshes';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Mesh);
    component(Material);

    app.addSystems(PreStartUp, RenderResource);
    app.addSystems(PreUpdate, PrepareViewUniforms);
    app.addSystems(Update, ExtractMeshes);
    app.addSystems(Update, MeshPipeline);
  }
}
