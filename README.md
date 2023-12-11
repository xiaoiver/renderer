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

There're so many ECS architectural implementations for JS/TS. I found [becsy](https://lastolivegames.github.io/becsy) is the most special one even if its multi-threading feature is not yet implemented.

<img src="https://lastolivegames.github.io/becsy/assets/architecture.a3cc1c9e.svg" alt="ecs" width="400px">

Systems can be splitted into several stages, for now we support:

- PreStartUp
- StartUp - The schedule that runs once when the app starts.
- PostStartUp
- PreUpdate
- Update - The schedule that contains app logic, get called on every frame.
- PostUpdate

## Shader combining and manipulating

Shader chunks can be combined at compiling time or runtime.
[glslify](https://github.com/glslify/glslify) and its rollup plugin use the former way. But most web rendering engines choose the latter one such as:

- Three.js
- Babylon.js
- [Orillusion](https://github.com/Orillusion/orillusion/blob/main/src/gfx/graphics/webGpu/shader/converter/GLSLPreprocessor.ts)

Bevy use [naga_oil](https://github.com/bevyengine/naga_oil). I try to compile it to WASM with wasm-pack so that features like [preprocessing](https://github.com/bevyengine/naga_oil#preprocessing) and [imports](https://github.com/bevyengine/naga_oil#imports) will come in handy.

```wgsl
#import render::view::View
#import pbr::utils::coords_to_viewport_uv

@group(0) @binding(0) var skybox: texture_cube<f32>;
@group(0) @binding(1) var skybox_sampler: sampler;
@group(0) @binding(2) var<uniform> view: View;
```

It helps me a lot during the process of learning the structures in bevy shader system.

## Skybox

Create a cubemap and upload images in the following order:

```ts
// The order of the array layers is [+X, -X, +Y, -Y, +Z, -Z]
const imageBitmaps = await Promise.all(
  [posx, negx, posy, negy, posz, negz].map(async (src) => loadImage(src)),
);
camera = this.commands.spawn(
  //... Omit other components
  new Skybox({
    image_handle: imageBitmaps,
  }),
);
```

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*9_1wSpTPeiQAAAAAAAAAAAAADvR5AQ/original" alt="skybox" width="250">

## Post processing

### FXAA

Anti-aliasing with [FXAA](https://en.wikipedia.org/wiki/Fast_approximate_anti-aliasing).

<img width="400" alt="fxaa" src="https://github.com/antvis/g-device-api/assets/3608471/e33b419c-815e-4e28-9f36-68f155ba0836">

The parameters are as follows:

- enabled `boolean` Defaults to `true`
- edge_threshold `Sensitivity` Defaults to `Sensitivity.High`
- edge_threshold_min `Sensitivity` Defaults to `Sensitivity.High`

```ts
camera = this.commands.spawn(
  //... Omit other components
  new Fxaa({
    enabled: true,
    edge_threshold: Sensitivity.High,
    edge_threshold_min: Sensitivity.High,
  }),
);
```

## Appendix

### 3D Gaussian Splatting

- https://huggingface.co/blog/gaussian-splatting
- https://github.com/dylanebert/gsplat.js

### Marching cubes

- https://developer.chrome.com/blog/webgpu-io2023/#unlocking-new-gpu-workloads-for-rendering
- https://github.com/Twinklebear/webgpu-marching-cubes/
- https://github.com/gnikoloff/webgpu-compute-metaballs/

### Raytracing

- https://github.com/Patryk27/strolle
