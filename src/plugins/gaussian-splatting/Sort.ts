import { component, system } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { Update } from '../../systems';

export class SortPlugin implements Plugin {
  async build(app: App) {
    // app.add_systems(Update, std_sort);
  }
}
