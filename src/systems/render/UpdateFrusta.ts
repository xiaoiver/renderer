import { System } from '@lastolivegames/becsy';
import {
  ComputedCameraValues,
  GlobalTransform,
  Orthographic,
  Perspective,
  Transform,
} from '../../components';
import { Frustum } from '../../components/primitive/Frustum';
import { Mat4 } from '../../math';

/**
 * Update Frustum
 */
export class UpdateFrusta extends System {
  views = this.query(
    (q) => q.addedOrChanged.with(ComputedCameraValues).trackWrites,
  );

  constructor() {
    super();
    this.query(
      (q) =>
        q
          .using(GlobalTransform, Perspective, Orthographic)
          .read.and.using(Frustum).write,
    );
  }

  execute(): void {
    this.views.addedOrChanged.forEach((entity) => {
      const transform = entity.read(GlobalTransform);
      const frustum = entity.write(Frustum);

      let projection: Orthographic | Perspective;
      if (entity.has(Orthographic)) {
        projection = entity.read(Orthographic);
      } else if (entity.has(Perspective)) {
        projection = entity.read(Perspective);
      }

      const mat = Mat4.copy(transform.compute_matrix());
      const view_projection = projection
        .get_projection_matrix()
        .mul(mat.inverse());
      const copied_transform = Transform.from_matrix(mat);

      const { half_spaces } = Frustum.from_view_projection_custom_far(
        view_projection,
        copied_transform.translation,
        copied_transform.back(),
        projection.far,
      );

      frustum.half_spaces = half_spaces;
    });
  }
}
