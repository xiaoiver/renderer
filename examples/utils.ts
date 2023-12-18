import * as lil from 'lil-gui';

export interface RenderFunction {
  ($canvas: HTMLCanvasElement, gui: lil.GUI): Promise<() => Promise<void>>;
  params?: { width: number; height: number };
}

export async function initExample(
  $container: HTMLElement,
  render: RenderFunction,
) {
  const { width, height } = render.params || {};

  let $canvasContainer = document.getElementById('canvas')!;
  if ($canvasContainer) {
    $canvasContainer.remove();
  }
  $canvasContainer = document.createElement('div');
  $canvasContainer.id = 'canvas';
  $container.appendChild($canvasContainer);

  $canvasContainer.innerHTML = '';
  const $canvas = document.createElement('canvas');
  $canvas.width = width || 1000;
  $canvas.height = height || 1000;
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
  $canvas.style.outline = 'none';
  $canvas.style.padding = '0px';
  $canvas.style.margin = '0px';
  $canvasContainer.appendChild($canvas);

  // GUI
  const gui = new lil.GUI({ autoPlace: false });
  $container.appendChild(gui.domElement);

  return await render($canvas, gui);
}
