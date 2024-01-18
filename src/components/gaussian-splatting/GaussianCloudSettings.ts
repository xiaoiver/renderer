import { field } from '@lastolivegames/becsy';
import { GlobalTransform } from '../transform';

export enum GaussianCloudDrawMode {
  All,
  Selected,
  HighlightSelected,
}

export enum SortMode {
  None,
  Radix,
  Rayon,
  Std,
}

export class GaussianCloudSettings {
  @field.boolean declare aabb: boolean;
  @field.float32 declare global_scale: number;
  @field.object declare global_transform: GlobalTransform;
  @field.boolean declare visualize_bounding_box: boolean;
  @field.boolean declare visualize_depth: boolean;
  @field.uint8 declare sort_mode: SortMode;
  @field.uint8 declare draw_mode: GaussianCloudDrawMode;

  constructor(
    options?: Partial<{
      aabb: boolean;
      global_scale: number;
      global_transform: GlobalTransform;
      visualize_bounding_box: boolean;
      visualize_depth: boolean;
      sort_mode: SortMode;
      draw_mode: GaussianCloudDrawMode;
    }>,
  ) {
    const {
      aabb = false,
      global_scale = 1,
      global_transform = new GlobalTransform(),
      visualize_bounding_box = false,
      visualize_depth = false,
      sort_mode = SortMode.Std,
      draw_mode = GaussianCloudDrawMode.All,
    } = options || {};

    this.aabb = aabb;
    this.global_scale = global_scale;
    this.global_transform = global_transform;
    this.visualize_bounding_box = visualize_bounding_box;
    this.visualize_depth = visualize_depth;
    this.sort_mode = sort_mode;
    this.draw_mode = draw_mode;
  }
}
