import { System } from '@lastolivegames/becsy';
import {
  Camera,
  ClusterConfig,
  Clusters,
  Frustum,
  PointLight,
} from '../../components';

export class AssignLightsToClusters extends System {
  point_lights_query = this.query(
    (q) => q.with(PointLight).addedOrChanged.trackWrites,
  );

  constructor() {
    super();
    this.query((q) => q.using(Camera, Clusters, ClusterConfig, Frustum).read);
  }

  execute(): void {
    this.point_lights_query.addedOrChanged.forEach((entity) => {});
  }
}
