/**
 * @see https://docs.rs/bevy/latest/bevy/render/struct.RenderPlugin.html
 */
import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Renderer } from '../systems';
import { Renderable, Camera } from '../components';

export class RendererPlugin implements Plugin {
  async build(app: App) {
    component(Renderable);
    component(Camera);

    app.addSystems(Renderer);
  }
}
