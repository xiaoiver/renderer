/**
 * @see https://docs.rs/bevy/latest/bevy/render/struct.RenderPlugin.html
 */
import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { FxaaPipeline, TonemappingPipeline, Renderer } from '../systems';
import { Renderable, Camera, Fxaa } from '../components';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Renderable);
    component(Fxaa);

    app.addSystems(Renderer);
    app.addSystems(TonemappingPipeline);
    app.addSystems(FxaaPipeline);
  }
}
