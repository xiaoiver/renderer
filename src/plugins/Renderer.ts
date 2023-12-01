/**
 * @see https://docs.rs/bevy/latest/bevy/render/struct.RenderPlugin.html
 */
import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import {
  FxaaPipeline,
  TonemappingPipeline,
  Renderer,
  PrepareViewUniforms,
  Update,
  PreUpdate,
} from '../systems';
import { Renderable, Material, Fxaa } from '../components';
import { Mesh } from '../meshes';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Renderable);
    component(Mesh);
    component(Material);
    component(Fxaa);

    app.addSystems(PreUpdate, PrepareViewUniforms);
    app.addSystems(Update, Renderer);
    app.addSystems(Update, TonemappingPipeline);
    app.addSystems(Update, FxaaPipeline);
  }
}
