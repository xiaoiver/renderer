import * as lil from 'lil-gui';
import {
  Entity,
  App,
  System,
  StartUp,
  Camera3dBundle,
  DefaultPlugins,
  Transform,
  Camera,
  ComputedCameraValues,
  Frustum,
  Fxaa,
  Sensitivity,
  PbrBundle,
  Mesh,
  Cube,
  Material,
  Perspective,
  Commands,
  Vec3,
  Tonemapping,
  ColorGrading,
  TonemappingMethod,
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
          Camera,
          ComputedCameraValues,
          Perspective,
          Frustum,
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

  const tonemappingFolder = gui.addFolder('tonemapping');
  const tonemappingConfig = {
    method: 'Reinhard',
  };
  const TonemappingMethodEnums = [
    TonemappingMethod.None,
    TonemappingMethod.Reinhard,
    TonemappingMethod.ReinhardLuminance,
    TonemappingMethod.AcesFitted,
  ];
  const TonemappingMethodLabels = [
    'None',
    'Reinhard',
    'ReinhardLuminance',
    'AcesFitted',
  ];
  tonemappingFolder
    .add(tonemappingConfig, 'method', TonemappingMethodLabels)
    .onChange((method: string) => {
      const tonemapping = camera.write(Tonemapping);
      tonemapping.method =
        TonemappingMethodEnums[TonemappingMethodLabels.indexOf(method)];

      const color_grading = camera.write(ColorGrading);
      if (tonemapping.method === TonemappingMethod.None) {
        color_grading.exposure = 0.0;
      } else if (
        tonemapping.method === TonemappingMethod.Reinhard ||
        tonemapping.method === TonemappingMethod.ReinhardLuminance
      ) {
        color_grading.exposure = 0.5;
      } else if (tonemapping.method === TonemappingMethod.AcesFitted) {
        color_grading.exposure = 0.35;
      }
      colorGradingConfig.exposure = color_grading.exposure;
    });

  const colorGradingFolder = gui.addFolder('color grading');
  const colorGradingConfig = {
    exposure: 0.0,
    gamma: 1.0,
    pre_saturation: 1.0,
    post_saturation: 1.0,
  };
  colorGradingFolder
    .add(colorGradingConfig, 'exposure', 0, 1)
    .onChange((exposure: number) => {
      const color_grading = camera.write(ColorGrading);
      color_grading.exposure = exposure;
    })
    .listen();
  colorGradingFolder
    .add(colorGradingConfig, 'gamma', 0, 8)
    .onChange((gamma: number) => {
      const color_grading = camera.write(ColorGrading);
      color_grading.gamma = gamma;
    });
  colorGradingFolder
    .add(colorGradingConfig, 'pre_saturation', 0, 2)
    .onChange((pre_saturation: number) => {
      const color_grading = camera.write(ColorGrading);
      color_grading.pre_saturation = pre_saturation;
    });
  colorGradingFolder
    .add(colorGradingConfig, 'post_saturation', 0, 2)
    .onChange((post_saturation: number) => {
      const color_grading = camera.write(ColorGrading);
      color_grading.post_saturation = post_saturation;
    });

  const debandDitheringFolder = gui.addFolder('deband dithering');
  const debandDitheringConfig = {
    enabled: true,
  };
  debandDitheringFolder
    .add(debandDitheringConfig, 'enabled')
    .onChange((enabled: boolean) => {
      const dither = camera.write(DebandDither);
      dither.enabled = enabled;
    });

  return async () => {
    await app.exit();
  };
}
