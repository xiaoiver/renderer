# renderer

Just another toy renderer. Inspired by [bevy](https://github.com/bevyengine/).

## Features

- [ECS](#ecs) - Using [becsy](https://lastolivegames.github.io/becsy) underneath.
- HAL - Using [@antv/g-device-api](https://github.com/antvis/g-device-api) as a HAL which supports WebGL1/2 & WebGPU. But we use WebGPU Device only for now.
- [Shader combining and manipulating](#shader-combining-and-manipulating) - Using [naga-oil](https://github.com/bevyengine/naga_oil)(with our compiled WASM version) to combine and manipulate WGSL shaders at runtime.
- Framegraph
- [Clustered Forward Shading](#clustered-forward-shading)
- [Standard Material](#standart-material)
- [Skybox](#skybox)
- Batching
- Post processing
  - [FXAA](#fxaa)
  - [Fog](#fog)
- [Controllers](#controllers) - Exponentially-smoothed camera controllers.

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

[Bevy ECS](https://bevyengine.org/learn/book/getting-started/ecs/) makes Bevy’s API so elegant.

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

@group(0) @binding(1) var<uniform> view: View;
@group(1) @binding(0) var skybox: texture_cube<f32>;
@group(1) @binding(1) var skybox_sampler: sampler;
```

It helps me a lot during the process of learning the structures in bevy shader system.

**Note** The order of uniforms and texture/sampler pairs is fixed.

## Clustered Forward Shading

Clustered shading expands on the idea of tiled rendering but adds a segmentation on the 3rd axis. The “clustering” is done in view space, by splitting the frustum into a 3D grid.

- https://google.github.io/filament/Filament.html#imagingpipeline/lightpath/clusteredforwardrendering
- https://www.cse.chalmers.se/~uffe/clustered_shading_preprint.pdf
- http://www.aortiz.me/2018/12/21/CG.html
- [Relative issue in bevy](https://github.com/bevyengine/bevy/issues/179)
- [Relative PR in bevy](https://github.com/bevyengine/bevy/pull/3153)

## Standart Material

| name                       | type           | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base_color                 | Color          | The color of the surface of the material before lighting. Doubles as diffuse albedo for non-metallic, specular for metallic and a mix for everything in between. If used together with a `base_color_texture`, this is factored into the final base color as `base_color * base_color_texture_value`. Defaults to [`Color.WHITE`].                                                                                                                                                                                                                                                                                                                                                                                                 |
| base_color_texture         | TexImageSource | The texture component of the material's color before lighting. The actual pre-lighting color is `base_color * this_texture`. You should set `base_color` to [`Color.WHITE`] (the default) if you want the texture to show as-is. Setting `base_color` to something else than white will tint the texture. For example, setting `base_color` to pure red will tint the texture red.                                                                                                                                                                                                                                                                                                                                                 |
| emissive                   | Color          | Use a color for user friendliness even though we technically don't use the alpha channel. Might be used in the future for exposure correction in HDR Color the material "emits" to the camera. This is typically used for monitor screens or LED lights. Anything that can be visible even in darkness. The emissive color is added to what would otherwise be the material's visible color.This means that for a light emissive value, in darkness, you will mostly see the emissive component. The default emissive color is black, which doesn't add anything to the material color. Note that **an emissive material won't light up surrounding areas like a light source**, it just adds a value to the color seen on screen. |
| emissive_texture           | TexImageSource | The emissive map, multiplies pixels with [`emissive`] to get the final "emitting" color of a surface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| perceptual_roughness       | number         | Linear perceptual roughness, clamped to `[0.089, 1.0]` in the shader. Defaults to `0.5`. Low values result in a "glossy" material with specular highlights, while values close to `1` result in rough materials. If used together with a roughness/metallic texture, this is factored into the final base color as `roughness * roughness_texture_value`. 0.089 is the minimum floating point value that won't be rounded down to 0 in the calculations used.                                                                                                                                                                                                                                                                      |
| metallic                   | number         | How "metallic" the material appears, within `[0.0, 1.0]`. This should be set to 0.0 for dielectric materials or 1.0 for metallic materials. For a hybrid surface such as corroded metal, you may need to use in-between values. Defaults to `0.00`, for dielectric. If used together with a roughness/metallic texture, this is factored into the final base color as `metallic * metallic_texture_value`.                                                                                                                                                                                                                                                                                                                         |
| metallic_roughness_texture | TexImageSource | Metallic and roughness maps, stored as a single texture. The blue channel contains metallic values, and the green channel contains the roughness values. Other channels are unused. Those values are multiplied by the scalar ones of the material, see [`metallic`] and [`perceptual_roughness`] for details. Note that with the default values of [`metallic`] and [`perceptual_roughness`], setting this texture has no effect. If you want to exclusively use the `metallic_roughness_texture` values for your material, make sure to set [`metallic`] and [`perceptual_roughness`] to `1.0`.                                                                                                                                  |
| reflectance                | number         | Specular intensity for non-metals on a linear scale of `[0.0, 1.0]`. Use the value as a way to control the intensity of the specular highlight of the material, i.e. how reflective is the material, rather than the physical property "reflectance." Set to `0.0`, no specular highlight is visible, the highlight is strongest when `reflectance` is set to `1.0`. Defaults to `0.5` which is mapped to 4% reflectance in the shader.                                                                                                                                                                                                                                                                                            |

## HDR & Tonemapping

HDR (High Dynamic Range) refers to the ability of the game engine to handle very bright lights or colors.
The internal HDR image has to be converted down to SDR (Standard Dynamic Range) before it can be displayed on the screen. This process is called Tonemapping.

- https://bevy-cheatbook.github.io/graphics/hdr-tonemap.html

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

## Post Processing

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

### Fog

Configures the “classic” computer graphics [distance fog](https://en.wikipedia.org/wiki/Distance_fog) effect, in which objects appear progressively more covered in atmospheric haze the further away they are from the camera.

```ts
camera = this.commands.spawn(
  //... Omit other components
  new FogSettings({
    color: Color.BLUE,
    falloff: new FogFalloff.Linear({
      start: 0,
      end: 100,
    }),
  }),
);
```

The parameters are as follows:

- color `Color` The color of the fog effect.
- directional_light_color `Color` Color used to modulate the influence of directional light colors on the fog, where the view direction aligns with each directional light direction, producing a “glow” or light dispersion effect.
- directional_light_exponent `number` The exponent applied to the directional light alignment calculation. A higher value means a more concentrated “glow”.
- falloff `FogFalloff` The rate at which fog intensity increases with distance is controlled by the falloff mode. Determines which falloff mode to use, and its parameters.

The falloff modes are as follows:

- FogFalloff.Linear - A linear fog falloff that grows in intensity between `start` and `end` distances. This falloff mode is simpler to control than other modes, however it can produce results that look “artificial”, depending on the scene.
  - start `number` Distance from the camera where fog is completely transparent, in world units.
  - end `number` Distance from the camera where fog is completely opaque, in world units.

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*5owGSq6Thv0AAAAAAAAAAAAADvR5AQ/original" alt="linear fog" width="200"><img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*h8KiTI68_O8AAAAAAAAAAAAADvR5AQ/original" alt="exponential fog" width="250"><img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*LgKiSL51VDUAAAAAAAAAAAAADvR5AQ/original" alt="atmospheric fog" width="250">

- FogFalloff.Exponential - An exponential fog falloff with a given `density`.
  - density `number` Multiplier applied to the world distance (within the exponential fog falloff calculation).
- FogFalloff.ExponentialSquared - A squared exponential fog falloff with a given `density`.
  - density `number` Multiplier applied to the world distance (within the exponential squared fog falloff calculation).
- FogFalloff.Atmospheric - A more general form of the `Exponential` mode.
  - extinction `Vec3` Controls how much light is removed due to atmospheric “extinction”, i.e. loss of light due to photons being absorbed by atmospheric particles.
  - inscattering `Vec3` Controls how much light is added due to light scattering from the sun through the atmosphere.

## Color Grading

Color Grading is a manipulation of the overall look of the image.
Together with tonemapping, this affects the "tone"/"mood" of the final image.

- https://bevy-cheatbook.github.io/graphics/hdr-tonemap.html#color-grading

```ts
camera = this.commands.spawn(
  new Camera3dBundle({
    //... Omit other components
    color_grading: new ColorGrading({
      exposure: 0.0,
      gamma: 1.0,
      pre_saturation: 1.0,
      post_saturation: 1.0,
    }),
  }),
);
```

## Tonemapping

```ts
camera = this.commands.spawn(
  new Camera3dBundle({
    //... Omit other components
    tonemapping: new Tonemapping.Reinhard(),
  }),
);
```

## Controllers

Add plugin like `FpsCameraPlugin` first, it will enhance the capability of default camera.

```ts
new App({
  canvas: $canvas,
})
  .add_plugins(...DefaultPlugins)
  .add_plugins(FpsCameraPlugin)
  // .add_plugins(OrbitCameraPlugin)
  .add_systems(StartUp, StartUpSystem)
  .run();
```

Then create `FpsCameraBundle`:

```ts
camera = this.commands.spawn(
  new Camera3dBundle({
    camera: new Camera(),
    projection: new Perspective(),
  }),
  new FpsCameraBundle({
    controller: new FpsCameraController(),
    eye: new Vec3(-2.5, 5.0, 5.0),
    target: Vec3.ZERO,
    up: Vec3.Y,
  }),
);
```

Now we support the following pairs which support different interaction with keyboard and mouse:

- `FpsCameraPlugin` + `FpsCameraBundle`

  - WASD: Translate on the XZ plane
  - Shift/Space: Translate along the Y axis
  - Mouse: Rotate camera

- `OrbitCameraPlugin` + `OrbitCameraBundle`

  - CTRL + mouse drag: Rotate camera
  - Right mouse drag: Pan camera
  - Mouse wheel: Zoom

## Appendix

### Orbit Camera

- https://github.com/bonsairobo/smooth-bevy-cameras/blob/main/src/controllers/orbit.rs

### 3D Gaussian Splatting

- https://huggingface.co/blog/gaussian-splatting
- https://github.com/dylanebert/gsplat.js

### Marching cubes

- https://developer.chrome.com/blog/webgpu-io2023/#unlocking-new-gpu-workloads-for-rendering
- https://github.com/Twinklebear/webgpu-marching-cubes/
- https://github.com/gnikoloff/webgpu-compute-metaballs/

### Raytracing

- https://github.com/Patryk27/strolle
