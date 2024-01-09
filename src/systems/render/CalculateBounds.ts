import { System } from '@lastolivegames/becsy';
import { Aabb, NoFrustumCulling } from '../../components';
import { Mesh } from '../../meshes';

export class CalculateBounds extends System {
  without_aabb = this.query(
    (q) => q.with(Mesh).without(Aabb, NoFrustumCulling).current,
  );

  constructor() {
    super();
    this.query((q) => q.using(Aabb).write);
  }

  execute(): void {
    this.without_aabb.current.forEach((entity) => {
      const mesh = entity.read(Mesh);
      const aabb = mesh.compute_aabb();
      entity.add(Aabb, aabb);
    });
  }
}
