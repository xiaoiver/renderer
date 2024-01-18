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
  Mesh,
  Material,
  Perspective,
  Commands,
  Vec3,
  Tonemapping,
  ColorGrading,
  TonemappingMethod,
  DebandDither,
  GaussianSplattingPlugin,
  Gaussian,
  SphericalHarmonicCoefficients,
  GaussianCloud,
  VisibleEntities,
  Visibility,
  InheritedVisibility,
  ViewVisibility,
  GaussianSplattingBundle,
  GaussianCloudSettings,
  Cube,
  PbrBundle,
} from '../../src';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';
import { parse } from '@loaders.gl/core';
import { PLYLoader } from '@loaders.gl/ply';
import {
  PositionVisibility,
  Rotation,
  ScaleOpacity,
} from '../../src/components/gaussian-splatting/f32';

const MAX_SIZE_VARIANCE = 5.0;

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;

  const result = await parse(fetch('/icecream.ply'), PLYLoader);
  const { header, attributes } = result;

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
          ColorGrading,
          Tonemapping,
          DebandDither,
          VisibleEntities,
          Visibility,
          InheritedVisibility,
          ViewVisibility,
          GaussianCloud,
          GaussianCloudSettings,
        ).write,
    );

    initialize(): void {
      camera = this.commands
        .spawn(
          new Camera3dBundle({
            camera: new Camera(),
            projection: new Perspective(),
            transform: Transform.from_xyz(0, 1.5, 5.0).look_at(
              Vec3.ZERO,
              Vec3.Y,
            ),
            tonemapping: new Tonemapping(TonemappingMethod.None),
          }),
        )
        .entity.hold();

      const gaussians: Gaussian[] = [];
      for (let i = 0; i < (header?.vertexCount || 0); i++) {
        const x = attributes.POSITION.value[i * 3 + 0];
        const y = attributes.POSITION.value[i * 3 + 1];
        const z = attributes.POSITION.value[i * 3 + 2];
        const f_dc_0 = attributes.f_dc_0.value[i];
        const f_dc_1 = attributes.f_dc_1.value[i];
        const f_dc_2 = attributes.f_dc_2.value[i];
        const scale_0 = attributes.scale_0.value[i];
        const scale_1 = attributes.scale_1.value[i];
        const scale_2 = attributes.scale_2.value[i];
        const opacity = 1.0 / (1.0 + Math.exp(-attributes.opacity.value[i]));
        const rot_0 = attributes.rot_0.value[i];
        const rot_1 = attributes.rot_1.value[i];
        const rot_2 = attributes.rot_2.value[i];
        const rot_3 = attributes.rot_3.value[i];

        const gaussian = new Gaussian({
          rotation: new Rotation({ rotation: [rot_0, rot_1, rot_2, rot_3] }),
          position_visibility: new PositionVisibility({
            position: [x, y, z],
          }),
          scale_opacity: new ScaleOpacity({
            scale: [scale_0, scale_1, scale_2],
            opacity,
          }),
          spherical_harmonic: new SphericalHarmonicCoefficients({
            coefficients: [f_dc_0, f_dc_1, f_dc_2],
          }),
        });
        gaussians.push(gaussian);

        gaussian.position_visibility.visibility = 1.0;
        let mean_scale =
          (gaussian.scale_opacity.scale[0] +
            gaussian.scale_opacity.scale[1] +
            gaussian.scale_opacity.scale[2]) /
          3.0;

        for (let i = 0; i < 3; i++) {
          gaussian.scale_opacity.scale[i] = Math.exp(
            Math.min(
              Math.max(
                gaussian.scale_opacity.scale[i],
                mean_scale - MAX_SIZE_VARIANCE,
              ),
              mean_scale + MAX_SIZE_VARIANCE,
            ),
          );
        }

        const norm = Math.sqrt(
          new Array(4)
            .fill(undefined)
            .map((_, i) => Math.pow(gaussian.rotation.rotation[i], 2.0))
            .reduce((prev, cur) => prev + cur, 0),
        );
        for (let i = 0; i < 4; i++) {
          gaussian.rotation.rotation[i] /= norm;
        }
      }

      const mesh = Mesh.from(new Cube(0));
      const material = new Material();
      this.commands.spawn(
        new PbrBundle({
          mesh,
          material,
          transform: Transform.from_xyz(0, 0, 0),
        }),
      );

      const cloud = GaussianCloud.from_gaussians(gaussians);
      this.commands.spawn(
        new GaussianSplattingBundle({
          cloud,
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
    .add_plugins(GaussianSplattingPlugin)
    .add_systems(StartUp, StartUpSystem);
  app.run();

  return async () => {
    await app.exit();
  };
}
