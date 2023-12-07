# renderer

Just another toy renderer. Inspired by [bevy](https://github.com/bevyengine/).

## Features

- ECS - [becsy](https://lastolivegames.github.io/becsy)
- HAL - [@antv/g-device-api](https://github.com/antvis/g-device-api) Supports WebGL1/2 & WebGPU.
- Use [naga-oil](https://github.com/bevyengine/naga_oil)(with our compiled WASM version) to combine and manipulate WGSL shaders at runtime.
- Framegraph
- Batching
- Post processing: FXAA

## Getting Started

```ts
import {
  App,
  System,
  StartUp,
  DefaultPlugins,
  Commands,
  Camera3dBundle,
  PbrBundle,
} from 'renderer';

class StartUpSystem extends System {
  commands = new Commands(this);

  constructor() {
    this.query(
      (q) =>
        q.using(
          Mesh,
          Material,
          Transform,
          GlobalTransform,
          Parent,
          Children,
          Camera,
          Perspective,
          Fxaa,
        ).write,
    );
  }

  initialize(): void {
    this.commands.spawn(
      new Camera3dBundle({
        camera: new Camera(),
        projection: new Perspective(),
        transform: Transform.from_xyz(-2.5, 4.5, 5.0).look_at(
          Vec3.ZERO,
          Vec3.Y,
        ),
      }),
      new Fxaa(),
    );

    this.commands.spawn(
      new PbrBundle({
        mesh: Mesh.from(new Cube(1)),
        material: new Material(),
        transform: Transform.from_xyz(0, 0.5, 0),
      }),
    );

    this.commands.execute();
  }
}

new App({
  canvas: $canvas,
})
  .addPlugins(...DefaultPlugins)
  .addSystems(StartUp, StartUpSystem)
  .run();
```

## ECS

<img src="https://lastolivegames.github.io/becsy/assets/architecture.a3cc1c9e.svg" alt="ecs" width="200px">

Systems can be splitted into several stages, for now we support:

- PreStartUp
- StartUp - The schedule that runs once when the app starts.
- PostStartUp
- PreUpdate
- Update - The schedule that contains app logic, get called on every frame.
- PostUpdate

## Examples

### 3D Gaussian Splatting

- https://huggingface.co/blog/gaussian-splatting
- https://github.com/dylanebert/gsplat.js

### Marching cubes

- https://developer.chrome.com/blog/webgpu-io2023/#unlocking-new-gpu-workloads-for-rendering
- https://github.com/Twinklebear/webgpu-marching-cubes/
- https://github.com/gnikoloff/webgpu-compute-metaballs/
