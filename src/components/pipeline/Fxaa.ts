import { field } from '@lastolivegames/becsy';

export enum Sensitivity {
  Low,
  Medium,
  High,
  Ultra,
  Extreme,
}

export class Fxaa {
  /**
   * Enable render passes for FXAA.
   */
  @field.boolean declare enabled: boolean;

  /**
   * The minimum amount of local contrast required to apply algorithm.
   */
  @field.uint8 declare edge_threshold: Sensitivity;

  /**
   * Trims the algorithm from processing darks.
   */
  @field.uint8 declare edge_threshold_min: Sensitivity;

  constructor(
    options?: Partial<{
      enabled: boolean;
      edge_threshold: Sensitivity;
      edge_threshold_min: Sensitivity;
    }>,
  ) {
    const {
      enabled = true,
      edge_threshold = Sensitivity.High,
      edge_threshold_min = Sensitivity.High,
    } = options || {};

    this.enabled = enabled;
    this.edge_threshold = edge_threshold;
    this.edge_threshold_min = edge_threshold_min;
  }
}
