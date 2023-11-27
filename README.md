# renderer

Just another toy renderer. Inspired by [bevy]().

- ECS - [becsy](https://lastolivegames.github.io/becsy)
  <img src="https://lastolivegames.github.io/becsy/assets/architecture.a3cc1c9e.svg" alt="ecs">
- HAL - [@antv/g-device-api]() Supports WebGL1/2 & WebGPU.
- Framegraph

## API

```ts
import { App, SystemType } from 'renderer';

const startup = (commands) => {};
const update = (commands) => {};

new App()
  .addSystems(SystemType.STARTUP, startup)
  .addSystems(SystemType.UPDATE, update)
  .run();
```

## Marching cubes

- https://developer.chrome.com/blog/webgpu-io2023/#unlocking-new-gpu-workloads-for-rendering
- https://github.com/Twinklebear/webgpu-marching-cubes/
- https://github.com/gnikoloff/webgpu-compute-metaballs/
