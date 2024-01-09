import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { CalculateBounds, PostUpdate, UpdateFrusta } from '../../systems';

export class VisibilityPlugin implements Plugin {
  async build(app: App) {
    app.add_systems(PostUpdate, CalculateBounds);
    app.add_systems(PostUpdate, UpdateFrusta);
  }
}
