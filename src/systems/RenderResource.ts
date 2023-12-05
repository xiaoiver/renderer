import { System } from '@lastolivegames/becsy';
import {
  Device,
  SwapChain,
  WebGPUDeviceContribution,
} from '@antv/g-device-api';
import { AppConfig } from '../components';
import { RGGraphBuilder, RenderHelper, RenderInput } from '../framegraph';
import maths from '../shaders/maths.wgsl?raw';
import utils from '../shaders/utils.wgsl?raw';
import rgb9e5 from '../shaders/rgb9e5.wgsl?raw';
import skybox from '../shaders/skybox.wgsl?raw';
import view from '../shaders/view.wgsl?raw';
import mesh_types from '../shaders/mesh/mesh_types.wgsl?raw';
import mesh_bindings from '../shaders/mesh/mesh_bindings.wgsl?raw';
import mesh_view_bindings from '../shaders/mesh/mesh_view_bindings.wgsl?raw';
import view_transforms from '../shaders/view_transformations.wgsl?raw';
import forward_io from '../shaders/forward_io.wgsl?raw';
import mesh_functions from '../shaders/mesh/mesh_functions.wgsl?raw';

export class RenderResource extends System {
  /**
   * Global app config.
   */
  private appConfig = this.singleton.read(AppConfig);

  /**
   * Device represents a "virtual GPU".
   */
  device: Device;
  swapChain: SwapChain;
  renderHelper: RenderHelper;

  /**
   * Post-processing passes.
   */
  passes: Record<
    string,
    (
      builder: RGGraphBuilder,
      renderHelper: RenderHelper,
      renderInput: RenderInput,
      mainColorTargetID: number,
    ) => void
  > = {};

  async prepare() {
    const { canvas } = this.appConfig;

    const deviceContribution = new WebGPUDeviceContribution({
      shaderCompilerPath: '/glsl_wgsl_compiler_bg.wasm',
    });

    // Create swap chain and get device
    const swapChain = await deviceContribution.createSwapChain(canvas);
    this.swapChain = swapChain;

    swapChain.configureSwapChain(canvas.width, canvas.height);
    const device = swapChain.getDevice();
    this.device = device;

    // Handle resize.
    canvas.addEventListener('resize', () => {
      swapChain.configureSwapChain(canvas.width, canvas.height);
    });

    // Register shader modules
    this.registerShaderModule(maths);
    this.registerShaderModule(rgb9e5);
    this.registerShaderModule(utils);
    this.registerShaderModule(forward_io);
    this.registerShaderModule(view);
    this.registerShaderModule(mesh_types);
    this.registerShaderModule(mesh_bindings);
    this.registerShaderModule(mesh_view_bindings);
    this.registerShaderModule(view_transforms);
    this.registerShaderModule(mesh_functions);
    this.registerShaderModule(skybox);
  }

  initialize(): void {
    // Build render graph
    const renderHelper = new RenderHelper();
    this.renderHelper = renderHelper;
    renderHelper.setDevice(this.device);
    renderHelper.renderInstManager.disableSimpleMode();
  }

  finalize(): void {
    this.renderHelper.destroy();
    this.device.destroy();
    this.device.checkForLeaks();
  }

  /**
   * Use naga-oil to combine and manipulate shaders.
   * The order is important.
   */
  registerShaderModule(shader: string): string {
    const compiler = this.device['WGSLComposer'];
    return compiler.wgsl_compile(shader);
  }

  /**
   * Register pass
   */
  registerPass(
    key: string,
    func: (
      builder: RGGraphBuilder,
      renderHelper: RenderHelper,
      renderInput: RenderInput,
      mainColorTargetID: number,
    ) => void,
  ) {
    this.passes[key] = func;
  }

  unregisterPass(key: string) {
    delete this.passes[key];
  }
}
