import { System } from '@lastolivegames/becsy';
import { Camera, ClusterConfig, Clusters } from '../../components';

/**
 * Update Frustum
 */
export class AddClusters extends System {
  configs = this.query(
    (q) => q.with(Camera).addedOrChanged.with(ClusterConfig).trackWrites,
  );

  constructor() {
    super();
    this.query((q) => q.using(Clusters).write);
  }

  execute(): void {
    this.configs.addedOrChanged.forEach((entity) => {
      const camera = entity.read(Camera);
      if (!camera.is_active) {
        return;
      }

      const config = entity.read(ClusterConfig);
      console.log(config);

      const { tile_size, dimensions, near, far } = new Clusters();
      if (!entity.has(Clusters)) {
        entity.add(Clusters, { tile_size, dimensions, near, far });
      } else {
        const clusters = entity.write(Clusters);
        clusters.tile_size = tile_size;
        clusters.dimensions = dimensions;
        clusters.near = near;
        clusters.far = far;
      }
    });
  }
}
