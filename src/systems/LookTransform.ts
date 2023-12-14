import { System } from '@lastolivegames/becsy';
import { LookTransform, Smoother, Transform } from '../components';

export class LookTransformSystem extends System {
  private cameras = this.query(
    (q) => q.addedOrChanged.with(LookTransform).trackWrites,
  );

  constructor() {
    super();
    this.query(
      (q) => q.using(LookTransform).read.and.using(Smoother, Transform).write,
    );
  }

  execute(): void {
    for (const entity of this.cameras.addedOrChanged) {
      console.log('sync look transform');
      const look_transform = entity.read(LookTransform);
      const smoother = entity.write(Smoother);
      if (smoother.enabled) {
        const transform = entity.write(Transform);
        const { translation, rotation, scale } = LookTransform.to_transform(
          smoother.smooth_transform(look_transform),
        );
        transform.translation = translation;
        transform.rotation = rotation;
        transform.scale = scale;
      }
    }
  }
}
