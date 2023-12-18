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
  FogSettings,
  FogFalloff,
  Color,
  Vec3,
  ColorGrading,
  LookTransform,
  Smoother,
  OrbitCameraBundle,
  OrbitCameraController,
  OrbitCameraPlugin,
} from '../../src';
import { loadImage } from '../utils/image';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;
  const baseColorImage = await loadImage(
    'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ',
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
          Camera,
          ComputedCameraValues,
          Perspective,
          Fxaa,
          FogSettings,
          ColorGrading,
          LookTransform,
          OrbitCameraController,
          Smoother,
        ).write,
    );

    initialize(): void {
      camera = this.commands
        .spawn(
          new Camera3dBundle({
            camera: new Camera(),
            projection: new Perspective(),
          }),
          new OrbitCameraBundle({
            controller: new OrbitCameraController(),
            eye: new Vec3(-2.5, 2.0, 2.0),
            target: Vec3.ZERO,
            up: Vec3.Y,
          }),
          new Fxaa({
            enabled: true,
            edge_threshold: Sensitivity.High,
            edge_threshold_min: Sensitivity.High,
          }),
          new FogSettings({
            color: Color.BLUE,
            falloff: new FogFalloff.Linear({
              start: 0.0,
              end: 6,
            }),
          }),
        )
        .entity.hold();

      const mesh = Mesh.from(new Cube(1));
      const material = new Material({
        base_color_texture: baseColorImage,
      });
      this.commands.spawn(
        new PbrBundle({
          mesh,
          material,
          transform: Transform.from_xyz(0, 0, 0),
        }),
      );
      this.commands.execute();
    }
  }

  const app = new App({
    canvas: $canvas,
  })
    .add_plugins(...DefaultPlugins)
    .add_plugins(OrbitCameraPlugin)
    .add_systems(StartUp, StartUpSystem);
  app.run();

  return async () => {
    await app.exit();
  };
}
