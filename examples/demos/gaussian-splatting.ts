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
  GaussianSplattingPlugin,
} from '../../src';
import { loadImage } from '../utils/image';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';
import { parse } from '@loaders.gl/core';
import { PLYLoader } from '@loaders.gl/ply';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;

  const data = await parse(fetch('/icecream.ply'), PLYLoader);
  console.log(data);

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

      // const mesh = Mesh.from(new Cube(1));
      // const material = new Material({
      //   base_color_texture: baseColorImage,
      // });
      // this.commands.spawn(
      //   new PbrBundle({
      //     mesh,
      //     material,
      //     transform: Transform.from_xyz(0, 0, 0),
      //   }),
      // );

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
