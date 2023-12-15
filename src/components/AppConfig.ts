import { field, component } from '@lastolivegames/becsy';

/**
 * Config for App.
 */
export interface IAppConfig {
  /**
   * Used for the [`Renderer`] system when creating a device.
   */
  canvas: HTMLCanvasElement;
}

@component
export class AppConfig implements IAppConfig {
  @field.object declare canvas: HTMLCanvasElement;
}
