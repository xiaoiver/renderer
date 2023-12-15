import { App } from '../App';
import { Plugin } from '../Plugin';
import { PreUpdate } from '../systems';

/**
 * Provides input functionality
 */
export class InputPlugin implements Plugin {
  build(app: App) {
    // app.addSystems(PreUpdate, MouseButtonInput);
  }
}
