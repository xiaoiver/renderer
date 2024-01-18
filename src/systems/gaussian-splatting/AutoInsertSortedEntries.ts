import { System } from '@lastolivegames/becsy';
import {
  GaussianCloud,
  GaussianCloudSettings,
  SortEntry,
  SortedEntries,
} from '../../components';

export class AutoInsertSortedEntries extends System {
  gaussian_clouds = this.query((q) =>
    q.current.with(GaussianCloud, GaussianCloudSettings).without(SortedEntries),
  );

  constructor() {
    super();
    this.query((q) => q.using(SortedEntries).write);
  }

  execute(): void {
    this.gaussian_clouds.current.forEach((entity) => {
      const gaussian_cloud = entity.read(GaussianCloud);
      const settings = entity.read(GaussianCloudSettings);

      const sorted = new Array(gaussian_cloud.len())
        .fill(undefined)
        .map((_, i) => {
          return new SortEntry({
            key: 1,
            index: i,
          });
        });

      entity.add(SortedEntries, { sorted });
    });
  }
}
