import {
  App,
  System,
  SystemType,
  Camera3dBundle,
  DefaultPlugins,
  Renderable,
  Transform,
  GlobalTransform,
  Parent,
  Children,
  Camera,
  Fxaa,
  Sensitivity,
} from '../../src';

/**
 * @see https://bevyengine.org/learn/book/getting-started/ecs/
 */
export async function render($canvas: HTMLCanvasElement) {
  const startup: System = (commands, system) => {
    const camera = commands.spawn(
      new Camera3dBundle({
        camera: new Camera(),
        transform: Transform.from_xyz(1, 2, 3),
      }),
      new Fxaa(),
    );

    const child = commands
      .spawn_empty()
      .insert(
        Transform.from_xyz(1, 2, 3),
        new GlobalTransform(),
        new Renderable(),
      );

    const parent = commands
      .spawn_empty()
      .insert(
        Transform.from_xyz(1, 2, 3),
        new GlobalTransform(),
        new Renderable(),
      )
      .add_child(child.id());
  };
  startup.queries = {
    q1: (q) =>
      q.using(
        Transform,
        GlobalTransform,
        Renderable,
        Parent,
        Children,
        Camera,
        Fxaa,
      ).write,
  };

  new App({
    canvas: $canvas,
  })
    .addPlugins(...DefaultPlugins)
    .addSystems(SystemType.STARTUP, startup)
    .run();
}
