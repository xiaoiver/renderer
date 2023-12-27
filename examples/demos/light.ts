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
  Color,
  Vec3,
  ColorGrading,
  Tonemapping,
  DebandDither,
  Frustum,
  DirectionalLightBundle,
  DirectionalLight,
  CascadesFrusta,
  Cascades,
  CascadeShadowConfig,
  AmbientLight,
  CascadeShadowConfigBuilder,
} from '../../src';
import { loadImage } from '../utils/image';
// @ts-ignore
import glsl_wgsl_compiler_bg from '../public/glsl_wgsl_compiler_bg.wasm?url';

/**
 * @see examples/3d/lighting.rs
 */
export async function render($canvas: HTMLCanvasElement, gui: lil.GUI) {
  let camera: Entity;
  let ambient: Entity;
  let directional: Entity;

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
          Frustum,
          Fxaa,
          BloomSettings,
          ColorGrading,
          Tonemapping,
          DebandDither,
          DirectionalLight,
          AmbientLight,
          CascadesFrusta,
          Cascades,
          CascadeShadowConfig,
        ).write,
    );

    initialize(): void {
      ambient = this.commands
        .spawn(
          new AmbientLight({
            color: Color.ORANGE_RED,
            brightness: 0.02,
          }),
        )
        .entity.hold();

      directional = this.commands
        .spawn(
          new DirectionalLightBundle({
            directional_light: new DirectionalLight({
              color: Color.rgb(0.98, 0.95, 0.82),
              shadows_enabled: true,
            }),
            transform: Transform.from_xyz(0.0, 0.0, 0.0).look_at(
              new Vec3(-1, -1, -1),
              Vec3.Y,
            ),
            cascade_shadow_config: new CascadeShadowConfigBuilder({
              first_cascade_far_bound: 4.0,
              maximum_distance: 10.0,
            }).build(),
          }),
        )
        .entity.hold();

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

  const ambientFolder = gui.addFolder('ambient');
  const ambientConfig = {
    color: '#FF4400',
    brightness: 0.05,
  };
  ambientFolder.addColor(ambientConfig, 'color').onChange((color: string) => {
    const ambient_light = ambient.write(AmbientLight);
    ambient_light.color = Color.hex(color);
  });
  ambientFolder
    .add(ambientConfig, 'brightness', 0, 1)
    .onChange((brightness: number) => {
      const ambient_light = ambient.write(AmbientLight);
      ambient_light.brightness = brightness;
    });

  const directionalFolder = gui.addFolder('directional');
  const directionalConfig = {
    color: '#faf2d1',
    illuminance: 100000,
    dx: -1,
    dy: -1,
    dz: -1,
  };
  directionalFolder
    .addColor(directionalConfig, 'color')
    .onChange((color: string) => {
      const directional_light = directional.write(DirectionalLight);
      directional_light.color = Color.hex(color);
    });
  directionalFolder
    .add(directionalConfig, 'illuminance', 0, 100000)
    .onChange((illuminance: number) => {
      const directional_light = directional.write(DirectionalLight);
      directional_light.illuminance = illuminance;
    });
  directionalFolder
    .add(directionalConfig, 'dx', -1, 1)
    .onChange((dx: number) => {
      const directional_light = directional.write(Transform);

      const transform = Transform.from_xyz(0.0, 0.0, 0.0).look_at(
        new Vec3(dx, directionalConfig.dy, directionalConfig.dz),
        Vec3.Y,
      );
      directional_light.translation = transform.translation;
      directional_light.rotation = transform.rotation;
      directional_light.scale = transform.scale;
    });

  return async () => {
    await app.exit();
  };
}
