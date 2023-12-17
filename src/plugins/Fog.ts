import { component } from '@lastolivegames/becsy';
import { Plugin } from '../Plugin';
import { FogSettings } from '../components';
import { App } from '../App';
import { PrepareFog, PreUpdate } from '../systems';

/**
 * A plugin that consolidates fog extraction, preparation and related resources/assets
 */
export class FogPlugin implements Plugin {
  async build(app: App) {
    component(FogSettings);

    app.add_systems(PreUpdate, PrepareFog);
  }
}
