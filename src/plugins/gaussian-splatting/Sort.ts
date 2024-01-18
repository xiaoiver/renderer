import { component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import { SortedEntries } from '../../components';
import { Update } from '../../systems';
import {
  AutoInsertSortedEntries,
  StdSort,
} from '../../systems/gaussian-splatting';

export class SortPlugin implements Plugin {
  async build(app: App) {
    component(SortedEntries);
    app.add_systems(Update, AutoInsertSortedEntries);
    app.add_systems(Update, StdSort);
  }
}
