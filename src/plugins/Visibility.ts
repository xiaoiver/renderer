import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { PostUpdate, UpdateFrusta } from '../systems';
import { Frustum } from '../components/primitive/Frustum';

export class VisibilityPlugin implements Plugin {
  async build(app: App) {
    component(Frustum);
    app.add_systems(PostUpdate, UpdateFrusta);
  }
}
