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
  ComputedCameraValues,
  Fxaa,
  Sensitivity,
  PbrBundle,
  Mesh,
  Box,
  Material,
  Perspective,
  Commands,
  BloomSettings,
  Skybox,
} from '../../src';
import { Vec3 } from '../../src/math';
import { Cube } from '../../src/meshes/Cube';
import { loadImage } from '../utils/image';
import posx from '../public/images/posx.jpg';
import negx from '../public/images/negx.jpg';
import posy from '../public/images/posy.jpg';
import negy from '../public/images/negy.jpg';
import posz from '../public/images/posz.jpg';
import negz from '../public/images/negz.jpg';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;

  // The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
  const imageBitmaps = await Promise.all(
    [posx, negx, posy, negy, posz, negz].map(async (src) => loadImage(src)),
  );

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
          ComputedCameraValues,
          Perspective,
          Fxaa,
          BloomSettings,
          Skybox,
        ).write,
    );

    initialize(): void {
      this.commands.insert_resource(imageBitmaps);

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
            edge_threshold: Sensitivity.High,
            edge_threshold_min: Sensitivity.High,
          }),
          new Skybox(),
        )
        .entity.hold();

      const mesh = Mesh.from(new Cube(1));
      const material = new Material();
      this.commands.spawn(
        new PbrBundle({
          mesh,
          material,
          transform: Transform.from_xyz(0, 0, 0),
        }),
      );
      // this.commands.spawn(
      //   new PbrBundle({
      //     mesh,
      //     material,
      //     transform: Transform.from_xyz(0.5, 0.5, 0.5),
      //   }),
      // );

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
    edge_threshold: Sensitivity.High,
    edge_threshold_min: Sensitivity.High,
  };
  fxaaFolder.add(fxaaConfig, 'enabled').onChange((enabled: boolean) => {
    const fxaa = camera.write(Fxaa);
    fxaa.enabled = enabled;
  });
  fxaaFolder
    .add(fxaaConfig, 'edge_threshold', [
      Sensitivity.Low,
      Sensitivity.Medium,
      Sensitivity.High,
      Sensitivity.Ultra,
      Sensitivity.Extreme,
    ])
    .onChange((edge_threshold: Sensitivity) => {
      const fxaa = camera.write(Fxaa);
      fxaa.edge_threshold = edge_threshold;
    });
  fxaaFolder
    .add(fxaaConfig, 'edge_threshold_min', [
      Sensitivity.Low,
      Sensitivity.Medium,
      Sensitivity.High,
      Sensitivity.Ultra,
      Sensitivity.Extreme,
    ])
    .onChange((edge_threshold_min: Sensitivity) => {
      const fxaa = camera.write(Fxaa);
      fxaa.edge_threshold_min = edge_threshold_min;
    });
  fxaaFolder.open();
}
