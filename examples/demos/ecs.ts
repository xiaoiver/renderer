import {
  App,
  System,
  DefaultPlugins,
  Renderable,
  Transform,
  Parent,
  Children,
} from '../../src';
import { GlobalTransform } from '../../src/components';
import { Vec3 } from '../../src/math';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement) {
  class Startup extends System {
    q1 = this.query((q) => q.using(Transform, GlobalTransform).write);
    q2 = this.query((q) => q.using(Renderable).write);
    q3 = this.query((q) => q.using(Parent).write);
    q4 = this.query((q) => q.using(Children).write);

    initialize(): void {
      const parent = this.createEntity();
      parent.add(Transform, { translation: new Vec3(1, 2, 3) });
      parent.add(GlobalTransform);
      parent.add(Renderable);

      const child = this.createEntity();
      child.add(Transform, { translation: new Vec3(1, 2, 3) });
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
