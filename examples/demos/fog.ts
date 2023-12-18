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
  BloomSettings,
  FogSettings,
  FogFalloff,
  Color,
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
          BloomSettings,
          FogSettings,
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
    shaderCompilerPath: glsl_wgsl_compiler_bg,
  })
    .add_plugins(...DefaultPlugins)
    .add_systems(StartUp, StartUpSystem);
  app.run();

  const fogFolder = gui.addFolder('fog');
  const fogConfig = {
    color: '#0000ff',
    falloff: 'Linear',
    start: 0,
    end: 6,
    density: 0,
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
    .onChange((falloff: string) => {
      const fog = camera.write(FogSettings);
      if (falloff === 'Linear') {
        fog.falloff = new FogFalloff.Linear({
          start: fogConfig.start,
          end: fogConfig.end,
        });
      } else if (falloff === 'Exponential') {
        fog.falloff = new FogFalloff.Exponential({
          density: fogConfig.density,
        });
      } else if (falloff === 'ExponentialSquared') {
        fog.falloff = new FogFalloff.ExponentialSquared({
          density: fogConfig.density,
        });
      } else if (falloff === 'Atmospheric') {
        fog.falloff = new FogFalloff.Atmospheric({
          extinction: Vec3.splat(fogConfig.density),
          inscattering: Vec3.splat(fogConfig.density),
        });
      }
    });
  fogFolder.add(fogConfig, 'start', 0, 10).onChange((start: number) => {
    const fog = camera.write(FogSettings);
    fog.falloff = new FogFalloff.Linear({
      start,
      end: fogConfig.end,
    });
  });
  fogFolder.add(fogConfig, 'end', 0, 10).onChange((end: number) => {
    const fog = camera.write(FogSettings);
    fog.falloff = new FogFalloff.Linear({
      start: fogConfig.start,
      end,
    });
  });
  fogFolder.add(fogConfig, 'density', 0, 1).onChange((density: number) => {
    const fog = camera.write(FogSettings);
    if (fogConfig.falloff === 'Exponential') {
      fog.falloff = new FogFalloff.Exponential({
        density,
      });
    } else if (fogConfig.falloff === 'ExponentialSquared') {
      fog.falloff = new FogFalloff.ExponentialSquared({
        density,
      });
    } else if (fogConfig.falloff === 'Atmospheric') {
      fog.falloff = new FogFalloff.Atmospheric({
        extinction: Vec3.splat(density),
        inscattering: Vec3.splat(density),
      });
    }
  });
  fogFolder.open();

  return async () => {
    await app.exit();
  };
}
