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
  PbrBundle,
  Mesh,
  Cube,
  Material,
  Perspective,
  Frustum,
  Commands,
  Vec3,
  ColorGrading,
  Tonemapping,
  DebandDither,
} from '../../src';
import { loadImage } from '../utils/image';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';

/**
 * @see https://github.com/bevyengine/bevy/blob/main/examples/3d/split_screen.rs
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  const baseColorImage = await loadImage(
    'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ',
  );

  let cameraEntity: Entity;
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
          Frustum,
          ColorGrading,
          Tonemapping,
          DebandDither,
        ).write,
    );

    initialize(): void {
      cameraEntity = this.commands
        .spawn(
          new Camera3dBundle({
            camera: new Camera(),
            projection: new Perspective(),
            transform: Transform.from_xyz(-2.5, 1.5, 2.0).look_at(
              Vec3.ZERO,
              Vec3.Y,
            ),
          }),
        )
        .entity.hold();

      // this.commands.spawn(
      //   new Camera3dBundle({
      //     camera: new Camera({
      //       order: 1,
      //     }),
      //     projection: new Perspective(),
      //     transform: Transform.from_xyz(-2.5, 1.5, 2.0).look_at(
      //       Vec3.ZERO,
      //       Vec3.Y,
      //     ),
      //   }),
      // );

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
    shaderCompilerPath: glsl_wgsl_compiler_bg,
  })
    .add_plugins(...DefaultPlugins)
    .add_systems(StartUp, StartUpSystem);
  app.run();

  const viewportFolder = gui.addFolder('viewport');
  const viewConfig = {
    width: 6,
    height: 0,
  };
  viewportFolder.add(viewConfig, 'width', 50, 500).onChange((width: number) => {
    const camera = cameraEntity.write(Camera);
    camera.viewport;
  });

  return async () => {
    await app.exit();
  };
}
