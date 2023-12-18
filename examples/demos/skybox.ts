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
  Commands,
  Skybox,
  Vec3,
  ColorGrading,
} from '../../src';
import { loadImage } from '../utils/image';
// @ts-ignore
import posx from '../public/images/posx.jpg';
// @ts-ignore
import negx from '../public/images/negx.jpg';
// @ts-ignore
import posy from '../public/images/posy.jpg';
// @ts-ignore
import negy from '../public/images/negy.jpg';
// @ts-ignore
import posz from '../public/images/posz.jpg';
// @ts-ignore
import negz from '../public/images/negz.jpg';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;

  // The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
  const imageBitmaps = await Promise.all(
    [posx, negx, posy, negy, posz, negz].map(async (src) => loadImage(src)),
  );
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
          Skybox,
          ColorGrading,
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
          new Skybox({
            image_handle,
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

  const skyboxFolder = gui.addFolder('skybox');
  const skyboxConfig = {
    enabled: true,
  };
  skyboxFolder.add(skyboxConfig, 'enabled').onChange((enabled: boolean) => {
    if (enabled) {
      camera.add(Skybox, { image_handle: imageBitmaps });
    } else {
      camera.remove(Skybox);
    }
  });

  return async () => {
    await app.exit();
  };
}
