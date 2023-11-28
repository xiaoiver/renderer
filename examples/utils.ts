import * as lil from 'lil-gui';

export async function initExample(
  $container: HTMLElement,
  render: ($canvas: HTMLCanvasElement) => Promise<() => void>,
) {
  // @ts-ignore
  const { params = {} } = render;

  let $canvasContainer = document.getElementById('canvas')!;
  if ($canvasContainer) {
    $canvasContainer.remove();
  }
  $canvasContainer = document.createElement('div');
  $canvasContainer.id = 'canvas';
  $container.appendChild($canvasContainer);

  $canvasContainer.innerHTML = '';
  const $canvas = document.createElement('canvas');
  $canvas.width = params.width || 1000;
  $canvas.height = params.height || 1000;
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
  $canvas.style.outline = 'none';
  $canvas.style.padding = '0px';
  $canvas.style.margin = '0px';
  $canvasContainer.appendChild($canvas);

  // const deviceContributionWebGL1 = new WebGLDeviceContribution({
  //   targets: ['webgl1'],
  //   xrCompatible: params.xrCompatible,
  //   onContextCreationError: () => {},
  //   onContextLost: () => {},
  //   onContextRestored(e) {},
  // });
  // const deviceContributionWebGL2 = new WebGLDeviceContribution({
  //   targets: ['webgl2', 'webgl1'],
  //   xrCompatible: params.xrCompatible,
  //   onContextCreationError: () => {},
  //   onContextLost: () => {},
  //   onContextRestored(e) {},
  // });
  // const shaderCompilerPath = new URL(
  //   '/public/glsl_wgsl_compiler_bg.wasm',
  //   import.meta.url,
  // ).href;
  // const deviceContributionWebGPU = new WebGPUDeviceContribution({
  //   shaderCompilerPath,
  // });

  // let disposeCallback;

  // const rerender = async (
  //   deviceContribution: DeviceContribution,
  //   $container: HTMLElement,
  // ) => {
  //   let $canvasContainer = document.getElementById('canvas')!;
  //   if ($canvasContainer) {
  //     $canvasContainer.remove();
  //   }
  //   $canvasContainer = document.createElement('div');
  //   $canvasContainer.id = 'canvas';
  //   $container.appendChild($canvasContainer);

  //   $canvasContainer.innerHTML = '';
  //   const $canvas = document.createElement('canvas');
  //   $canvas.width = params.width || 1000;
  //   $canvas.height = params.height || 1000;
  //   $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
  //   $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
  //   $canvas.style.outline = 'none';
  //   $canvas.style.padding = '0px';
  //   $canvas.style.margin = '0px';
  //   $canvasContainer.appendChild($canvas);

  //   disposeCallback = await render(deviceContribution, $canvas);
  // };

  // if (params.default === 'webgl1') {
  //   await rerender(deviceContributionWebGL1, $container);
  // } else if (params.default === 'webgl2') {
  //   await rerender(deviceContributionWebGL2, $container);
  // } else if (params.default === 'webgpu') {
  //   // @ts-ignore
  //   await rerender(deviceContributionWebGPU, $container);
  // }

  // // GUI
  // const gui = new lil.GUI({ autoPlace: false });
  // $container.appendChild(gui.domElement);
  // const rendererFolder = gui.addFolder('renderer');
  // const rendererConfig = {
  //   renderer: params.default,
  // };
  // rendererFolder
  //   .add(rendererConfig, 'renderer', params.targets)
  //   .onChange(async (renderer: 'webgl1' | 'webgl2' | 'webgpu') => {
  //     if (disposeCallback) {
  //       disposeCallback();
  //       // @ts-ignore
  //       disposeCallback = undefined;
  //     }

  //     if (renderer === 'webgl1') {
  //       disposeCallback = await rerender(deviceContributionWebGL1, $container);
  //     } else if (renderer === 'webgl2') {
  //       disposeCallback = await rerender(deviceContributionWebGL2, $container);
  //     } else if (renderer === 'webgpu') {
  //       // @ts-ignore
  //       disposeCallback = await rerender(deviceContributionWebGPU, $container);
  //     }
  //   });
  // rendererFolder.open();

  // return disposeCallback;

  await render($canvas);

  return () => {};
}