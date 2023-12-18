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
  Vec3,
  ColorGrading,
  Tonemapping,
  DebandDither,
} from '../../src';
import { loadImage } from '../utils/image';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';

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
          ColorGrading,
          Tonemapping,
          DebandDither,
        ).write,
    );

    initialize(): void {
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
          new Fxaa({
            enabled: true,
            edge_threshold: Sensitivity.High,
            edge_threshold_min: Sensitivity.High,
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
    shaderCompilerPath: glsl_wgsl_compiler_bg,
  })
    .add_plugins(...DefaultPlugins)
    .add_systems(StartUp, StartUpSystem);
  app.run();

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

  return async () => {
    await app.exit();
  };
}
