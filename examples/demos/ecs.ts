import {
  App,
  System,
  DefaultPlugins,
  Renderable,
  Transform,
  GlobalTransform,
  Parent,
  Children,
  Camera,
  Fxaa,
  Sensitivity,
} from '../../src';
import { Vec3 } from '../../src/math';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement) {
  class Startup extends System {
    q1 = this.query(
      (q) => q.using(Transform, GlobalTransform, Camera, Fxaa).write,
    );
    q2 = this.query((q) => q.using(Renderable).write);
    q3 = this.query((q) => q.using(Parent).write);
    q4 = this.query((q) => q.using(Children).write);

    initialize(): void {
      const camera = this.createEntity();
      camera.add(
        Transform,
        Transform.from_xyz(10.0, 12.0, 16.0).look_at(Vec3.ZERO, Vec3.Y),
      );
      camera.add(GlobalTransform);
      camera.add(Camera);
      camera.add(Fxaa, {
        enabled: true,
        edge_threshold: Sensitivity.High,
        edge_threshold_min: Sensitivity.High,
      });

      const parent = this.createEntity();
      parent.add(Transform, Transform.from_xyz(1, 2, 3));
      parent.add(GlobalTransform);
      parent.add(Renderable);

      const child = this.createEntity();
      child.add(Transform, Transform.from_xyz(1, 2, 3));
      child.add(GlobalTransform);
      child.add(Renderable);

      child.add(Children, {
        parent,
      });
    }
  }
  class Update extends System {
    execute(): void {
      console.log('tick');
    }
  }

  new App({
    canvas: $canvas,
  })
    .addPlugins(...DefaultPlugins)
    .addSystems(Startup, Update)
    .run();
}
