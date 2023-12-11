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
  // Parent,
  // Children,
  Camera,
  ComputedCameraValues,
  Fxaa,
  Sensitivity,
  PbrBundle,
  Mesh,
  Cube,
  Material,
  Perspective,
  Commands,
  BloomSettings,
  Skybox,
  FogSettings,
  Linear,
  Color,
  Vec3,
} from '../../src';
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
          FogSettings,
        ).write,
    );

    initialize(): void {
      // const image_handle = this.commands.insert_resource(imageBitmaps);
      const image_handle = imageBitmaps;

      camera = this.commands
        .spawn(
          new Camera3dBundle({
            camera: new Camera(),
            projection: new Perspective(),
            transform: Transform.from_xyz(-2.5, 1.5, 2.0).look_at(
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
          new Skybox({
            image_handle,
          }),
          new FogSettings({
            color: Color.BLUE,
            falloff: new Linear({
              start: 0.0,
              end: 6,
            }),
          }),
        )
        .entity.hold();

      const mesh = Mesh.from(new Cube(1));
      mesh.insert_attribute(
        Mesh.ATTRIBUTE_COLOR,
        mesh.attribute(Mesh.ATTRIBUTE_POSITION).map(() => [1, 0, 0, 1]),
      );
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
    edge_threshold: 'High',
    edge_threshold_min: 'High',
  };
  fxaaFolder.add(fxaaConfig, 'enabled').onChange((enabled: boolean) => {
    const fxaa = camera.write(Fxaa);
    fxaa.enabled = enabled;
  });
  const SensitivityLabels = ['Low', 'Medium', 'High', 'Ultra', 'Extreme'];
  fxaaFolder
    .add(fxaaConfig, 'edge_threshold', SensitivityLabels)
    .onChange((edge_threshold: string) => {
      const fxaa = camera.write(Fxaa);
      fxaa.edge_threshold = SensitivityLabels.indexOf(edge_threshold);
    });
  fxaaFolder
    .add(fxaaConfig, 'edge_threshold_min', SensitivityLabels)
    .onChange((edge_threshold_min: string) => {
      const fxaa = camera.write(Fxaa);
      fxaa.edge_threshold_min = SensitivityLabels.indexOf(edge_threshold_min);
    });
  fxaaFolder.open();

  const fogFolder = gui.addFolder('fog');
  const fogConfig = {
    color: '#0000ff',
    falloff: 'Linear',
    start: 0,
    end: 6,
  };
  fogFolder.addColor(fogConfig, 'color').onChange((color) => {
    const fog = camera.write(FogSettings);
    fog.color = Color.hex(color);
  });
  fogFolder
    .add(fogConfig, 'falloff', [
      'Linear',
      'Exponential',
      'ExponentialSquared',
      'Atmospheric',
    ])
    .onChange((start: number) => {
      const fog = camera.write(FogSettings);
      fog.falloff = new Linear({
        start,
        end: fogConfig.end,
      });
    });
  fogFolder.add(fogConfig, 'start', 0, 10).onChange((start: number) => {
    const fog = camera.write(FogSettings);
    fog.falloff = new Linear({
      start,
      end: fogConfig.end,
    });
  });
  fogFolder.add(fogConfig, 'end', 0, 10).onChange((end: number) => {
    const fog = camera.write(FogSettings);
    fog.falloff = new Linear({
      start: fogConfig.start,
      end,
    });
  });
  fogFolder.open();
}
