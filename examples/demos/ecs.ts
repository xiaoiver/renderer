import {
  App,
  System,
  StartUp,
  Camera3dBundle,
  DefaultPlugins,
  Renderable,
  Transform,
  GlobalTransform,
  Parent,
  Children,
  Camera,
  Fxaa,
  Sensitivity,
  PbrBundle,
  Mesh,
  Box,
  Material,
  Perspective,
  Commands,
} from '../../src';
import { Vec3 } from '../../src/math';
import { Cube } from '../../src/meshes/Cube';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement) {
  class StartUpSystem extends System {
    commands = new Commands(this);

    q = this.query(
      (q) =>
        q.using(
          Mesh,
          Material,
          Transform,
          GlobalTransform,
          Renderable,
          Parent,
          Children,
          Camera,
          Perspective,
          Fxaa,
        ).write,
    );

    initialize(): void {
      this.commands.spawn(
        new Camera3dBundle({
          camera: new Camera(),
          projection: new Perspective(),
          transform: Transform.from_xyz(-2.5, 4.5, 5.0).look_at(
            Vec3.ZERO,
            Vec3.Y,
          ),
        }),
        new Fxaa(),
      );

      this.commands.spawn(
        new PbrBundle({
          mesh: Mesh.from(new Cube(1)),
          material: new Material(),
          transform: Transform.from_xyz(0, 0.5, 0),
        }),
      );

      this.commands.execute();
    }
  }

  // const child = commands
  //   .spawn_empty()
  //   .insert(
  //     Transform.from_xyz(1, 2, 3),
  //     new GlobalTransform(),
  //     new Renderable(),
  //   );

  // const parent = commands
  //   .spawn_empty()
  //   .insert(
  //     Transform.from_xyz(1, 2, 3),
  //     new GlobalTransform(),
  //     new Renderable(),
  //   )
  //   .add_child(child.id());

  new App({
    canvas: $canvas,
  })
    .addPlugins(...DefaultPlugins)
    .addSystems(StartUp, StartUpSystem)
    .run();
}
