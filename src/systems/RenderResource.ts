import { System } from '@lastolivegames/becsy';
import {
  Device,
  SwapChain,
  WebGPUDeviceContribution,
} from '@antv/g-device-api';
import { AppConfig } from '../components';
import { RGGraphBuilder, RenderHelper, RenderInput } from '../framegraph';
import globals from '../shaders/render/globals.wgsl?raw';
import maths from '../shaders/render/maths.wgsl?raw';
import utils from '../shaders/pbr/utils.wgsl?raw';
import rgb9e5 from '../shaders/pbr/rgb9e5.wgsl?raw';
import skybox from '../shaders/skybox.wgsl?raw';
import view from '../shaders/render/view.wgsl?raw';
import instance_index from '../shaders/render/instance_index.wgsl?raw';
import mesh_types from '../shaders/mesh/mesh_types.wgsl?raw';
import mesh_bindings from '../shaders/mesh/mesh_bindings.wgsl?raw';
import mesh_view_types from '../shaders/mesh/mesh_view_types.wgsl?raw';
import mesh_view_bindings from '../shaders/mesh/mesh_view_bindings.wgsl?raw';
import view_transforms from '../shaders/pbr/view_transformations.wgsl?raw';
import prepass_utils from '../shaders/pbr/prepass_utils.wgsl?raw';
import prepass_io from '../shaders/prepass/prepass_io.wgsl?raw';
import forward_io from '../shaders/pbr/forward_io.wgsl?raw';
import clustered_forward from '../shaders/pbr/clustered_forward.wgsl?raw';
import pbr_types from '../shaders/pbr/pbr_types.wgsl?raw';
import pbr_bindings from '../shaders/pbr/pbr_bindings.wgsl?raw';
import pbr_lighting from '../shaders/pbr/pbr_lighting.wgsl?raw';
import pbr_transmission from '../shaders/pbr/pbr_transmission.wgsl?raw';
import shadow_sampling from '../shaders/pbr/shadow_sampling.wgsl?raw';
import shadows from '../shaders/pbr/shadows.wgsl?raw';
import ambient from '../shaders/pbr/pbr_ambient.wgsl?raw';
import environment_map from '../shaders/pbr/environment_map.wgsl?raw';
import parallax_mapping from '../shaders/pbr/parallax_mapping.wgsl?raw';
import fog from '../shaders/pbr/fog.wgsl?raw';
import pbr_functions from '../shaders/pbr/pbr_functions.wgsl?raw';
import mesh_functions from '../shaders/mesh/mesh_functions.wgsl?raw';
import tonemapping_shared from '../shaders/tonemapping/tonemapping_shared.wgsl?raw';
import gtao_utils from '../shaders/ssao/gtao_utils.wgsl?raw';
import pbr_fragment from '../shaders/pbr/pbr_fragment.wgsl?raw';

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
    this.registerShaderModule(globals);
    this.registerShaderModule(maths);
    this.registerShaderModule(rgb9e5);
    this.registerShaderModule(utils);
    this.registerShaderModule(forward_io);
    this.registerShaderModule(view);
    this.registerShaderModule(instance_index);
    this.registerShaderModule(mesh_types);
    this.registerShaderModule(mesh_bindings);
    this.registerShaderModule(mesh_view_types);
    this.registerShaderModule(mesh_view_bindings);
    this.registerShaderModule(view_transforms);
    this.registerShaderModule(prepass_utils);
    this.registerShaderModule(prepass_io);
    this.registerShaderModule(mesh_functions);
    this.registerShaderModule(skybox);
    this.registerShaderModule(tonemapping_shared);

    // PBR
    // this.registerShaderModule(clustered_forward);
    this.registerShaderModule(pbr_types);
    this.registerShaderModule(pbr_bindings);
    this.registerShaderModule(pbr_lighting);
    // this.registerShaderModule(pbr_transmission);
    // this.registerShaderModule(shadow_sampling);
    // this.registerShaderModule(shadows);
    this.registerShaderModule(ambient);
    this.registerShaderModule(fog);
    // this.registerShaderModule(environment_map);
    // this.registerShaderModule(parallax_mapping);
    this.registerShaderModule(pbr_functions);
    this.registerShaderModule(gtao_utils);
    this.registerShaderModule(pbr_fragment);
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
}
