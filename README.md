# renderer

Just another toy renderer. Inspired by [bevy](https://github.com/bevyengine/).

- ECS - [becsy](https://lastolivegames.github.io/becsy)
  <img src="https://lastolivegames.github.io/becsy/assets/architecture.a3cc1c9e.svg" alt="ecs">
- HAL - [@antv/g-device-api](https://github.com/antvis/g-device-api) Supports WebGL1/2 & WebGPU.
- Use [naga-oil](https://github.com/bevyengine/naga_oil) to combine and manipulate WGSL shaders.
- Framegraph

## API

```ts
import { App, System } from 'renderer';

class Startup extends System {
  initialize() {}
}
class Update extends System {
  execute() {}
}

new App().addSystems(Startup).addSystems(Update).run();
```

## Marching cubes

- https://developer.chrome.com/blog/webgpu-io2023/#unlocking-new-gpu-workloads-for-rendering
- https://github.com/Twinklebear/webgpu-marching-cubes/
- https://github.com/gnikoloff/webgpu-compute-metaballs/
