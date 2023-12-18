import { field, component } from '@lastolivegames/becsy';
import { Resource } from '../Resource';

/**
 * Config for App.
 */
export interface IAppConfig {
  /**
   * Used for the [`Renderer`] system when creating a device.
   */
  canvas: HTMLCanvasElement;

  shaderCompilerPath: string;

  resources: WeakMap<any, Resource>;
}

@component
export class AppConfig implements IAppConfig {
  @field.object declare canvas: HTMLCanvasElement;

  @field.object declare shaderCompilerPath: string;

  @field.object declare resources: WeakMap<any, Resource>;
}
