import { System } from '@lastolivegames/becsy';
import {
  Device,
  SwapChain,
  WebGPUDeviceContribution,
} from '@antv/g-device-api';
import { AppConfig } from '../components';
import { RenderHelper } from '../framegraph';
import globals from '../shaders/render/globals';
import maths from '../shaders/render/maths';
import utils from '../shaders/pbr/utils';
import rgb9e5 from '../shaders/pbr/rgb9e5';
import skybox from '../shaders/skybox';
import view from '../shaders/render/view';
import instance_index from '../shaders/render/instance_index';
import mesh_types from '../shaders/mesh/mesh_types';
import mesh_bindings from '../shaders/mesh/mesh_bindings';
import mesh_view_types from '../shaders/mesh/mesh_view_types';
import mesh_view_bindings from '../shaders/mesh/mesh_view_bindings';
import view_transforms from '../shaders/pbr/view_transformations';
import prepass_utils from '../shaders/pbr/prepass_utils';
import prepass_io from '../shaders/prepass/prepass_io';
import forward_io from '../shaders/pbr/forward_io';
// import clustered_forward from '../shaders/pbr/clustered_forward';
import pbr_types from '../shaders/pbr/pbr_types';
import pbr_bindings from '../shaders/pbr/pbr_bindings';
import pbr_lighting from '../shaders/pbr/pbr_lighting';
// import pbr_transmission from '../shaders/pbr/pbr_transmission';
// import shadow_sampling from '../shaders/pbr/shadow_sampling';
// import shadows from '../shaders/pbr/shadows';
import ambient from '../shaders/pbr/pbr_ambient';
// import environment_map from '../shaders/pbr/environment_map';
// import parallax_mapping from '../shaders/pbr/parallax_mapping';
import fog from '../shaders/pbr/fog';
import pbr_functions from '../shaders/pbr/pbr_functions';
import mesh_functions from '../shaders/mesh/mesh_functions';
import tonemapping_shared from '../shaders/tonemapping/tonemapping_shared';
import gtao_utils from '../shaders/ssao/gtao_utils';
import pbr_fragment from '../shaders/pbr/pbr_fragment';

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
    const { canvas, shaderCompilerPath } = this.appConfig;

    const deviceContribution = new WebGPUDeviceContribution({
      shaderCompilerPath,
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
