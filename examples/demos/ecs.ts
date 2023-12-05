import * as lil from 'lil-gui';
import {
  Entity,
  App,
  System,
  StartUp,
  Camera3dBundle,
  DefaultPlugins,
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
  BloomSettings,
} from '../../src';
import { Vec3 } from '../../src/math';
import { Cube } from '../../src/meshes/Cube';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;

  class StartUpSystem extends System {
    commands = new Commands(this);

    q = this.query(
      (q) =>
        q.using(
          Mesh,
          Material,
          Transform,
          GlobalTransform,
          // Parent,
          // Children,
          Camera,
          Perspective,
          Fxaa,
          BloomSettings,
        ).write,
    );

    initialize(): void {
      camera = this.commands
        .spawn(
          new Camera3dBundle({
            camera: new Camera(),
            projection: new Perspective(),
            transform: Transform.from_xyz(-2.5, 2.5, 1.0).look_at(
              Vec3.ZERO,
              Vec3.Y,
            ),
          }),
          BloomSettings.NATURAL,
          new Fxaa({
            enabled: true,
            edge_threshold: Sensitivity.Extreme,
            edge_threshold_min: Sensitivity.Extreme,
          }),
        )
        .entity.hold();

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
  //   );

  // const parent = commands
  //   .spawn_empty()
  //   .insert(
  //     Transform.from_xyz(1, 2, 3),
  //     new GlobalTransform(),
  //   )
  //   .add_child(child.id());

  new App({
    canvas: $canvas,
  })
    .addPlugins(...DefaultPlugins)
    .addSystems(StartUp, StartUpSystem)
    .run();

  const fxaaFolder = gui.addFolder('fxaa');
  const fxaaConfig = {
    enabled: true,
  };
  fxaaFolder.add(fxaaConfig, 'enabled').onChange((enabled: boolean) => {
    const fxaa = camera.write(Fxaa);
    fxaa.enabled = enabled;
  });
  fxaaFolder.open();
}
