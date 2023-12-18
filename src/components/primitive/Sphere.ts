import { field } from '@lastolivegames/becsy';
import { Affine3, Vec3, v3Type } from '../../math';
import { Aabb } from './Aabb';

export class Sphere {
  @field(v3Type) declare center: Vec3;

  @field.float32 declare radius: number;

  constructor(center: Vec3 = Vec3.ZERO, radius: number = 0) {
    this.center = center;
    this.radius = radius;
  }

  intersects_obb(aabb: Aabb, local_to_world: Affine3) {
    const aabb_center_world = local_to_world.transform_point3(aabb.center);
    const v = aabb_center_world.sub(this.center);
    const d = v._length();
    const relative_radius = aabb.relative_radius(
      v.div(d),
      local_to_world.matrix3,
    );
    return d < this.radius + relative_radius;
  }
}
