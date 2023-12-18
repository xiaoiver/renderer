import { field } from '@lastolivegames/becsy';
import { Vec2, Vec3, v3Type } from '../../math';

enum ClusterFarZMode {
  /// Calculate the required maximum z-depth based on currently visible lights.
  /// Makes better use of available clusters, speeding up GPU lighting operations
  /// at the expense of some CPU time and using more indices in the cluster light
  /// index lists.
  MaxLightRange,
  /// Constant max z-depth
  Constant,
}

export interface ClusterZConfig {
  /// Far `Z` plane of the first depth slice
  first_slice_depth: number;
  /// Strategy for how to evaluate the far `Z` plane of the furthest depth slice
  far_z_mode: ClusterFarZMode;
}

export enum ClusterStrategy {
  /**
   * Disable light cluster calculations for this view
   */
  None,
  /**
   * One single cluster. Optimal for low-light complexity scenes or scenes where
   * most lights affect the entire scene.
   */
  Single,

  /// Explicit `X`, `Y` and `Z` counts (may yield non-square `X/Y` clusters depending on the aspect ratio)
  XYZ,

  /// Fixed number of `Z` slices, `X` and `Y` calculated to give square clusters
  /// with at most total clusters. For top-down games where lights will generally always be within a
  /// short depth range, it may be useful to use this configuration with 1 or few `Z` slices. This
  /// would reduce the number of lights per cluster by distributing more clusters in screen space
  /// `X/Y` which matches how lights are distributed in the scene.
  FixedZ,
}

/**
 * Configuration of the clustering strategy for clustered forward rendering
 */
export class ClusterConfig {
  @field.uint8 declare strategy: ClusterStrategy;

  @field(v3Type) declare dimensions: Vec3;
  @field.object declare z_config: ClusterZConfig;
  /// Specify if clusters should automatically resize in `X/Y` if there is a risk of exceeding
  /// the available cluster-light index limit
  @field.boolean declare dynamic_resizing: boolean;

  @field.uint32 declare total: number;
  @field.uint32 declare z_slices: number;

  constructor(options?: {
    strategy: ClusterStrategy;
    dimensions: Vec3;
    z_config: ClusterZConfig;
    dynamic_resizing: boolean;
    total: number;
    z_slices: number;
  }) {
    // 24 depth slices, square clusters with at most 4096 total clusters
    // use max light distance as clusters max `Z`-depth, first slice extends to 5.0
    const {
      strategy = ClusterStrategy.FixedZ,
      dimensions = Vec3.ZERO,
      z_config = {
        first_slice_depth: 5,
        far_z_mode: ClusterFarZMode.MaxLightRange,
      },
      dynamic_resizing = true,
      total = 4096,
      z_slices = 24,
    } = options ?? {};

    this.strategy = strategy;
    this.dimensions = dimensions;
    this.z_config = z_config;
    this.dynamic_resizing = dynamic_resizing;
    this.total = total;
    this.z_slices = z_slices;
  }

  dimensions_for_screen_size(screen_size: Vec2): Vec3 {
    if (this.strategy === ClusterStrategy.None) {
      return Vec3.ZERO;
    } else if (this.strategy === ClusterStrategy.Single) {
      return Vec3.ONE;
    } else if (this.strategy === ClusterStrategy.XYZ) {
      return this.dimensions;
    } else if (this.strategy === ClusterStrategy.FixedZ) {
      let { total, z_slices } = this;
      let aspect_ratio = screen_size.x / screen_size.y;
      if (total < z_slices) {
        // warn!("ClusterConfig has more z-slices than total clusters!");
        z_slices = total;
      }
      let per_layer = total / z_slices;

      let y = Math.sqrt(per_layer / aspect_ratio);
      let x = y * aspect_ratio;

      // check extremes
      if (x == 0) {
        x = 1;
        y = per_layer;
      }
      if (y == 0) {
        x = per_layer;
        y = 1;
      }

      return new Vec3(x, y, z_slices);
    }
  }

  first_slice_depth() {
    if (
      this.strategy === ClusterStrategy.None ||
      this.strategy === ClusterStrategy.Single
    ) {
      return 0;
    } else if (
      this.strategy === ClusterStrategy.FixedZ ||
      this.strategy === ClusterStrategy.XYZ
    ) {
      return this.z_config.first_slice_depth;
    }
  }

  far_z_mode(): ClusterFarZMode {
    if (this.strategy === ClusterStrategy.None) {
      return ClusterFarZMode.Constant;
    } else if (this.strategy === ClusterStrategy.Single) {
      return ClusterFarZMode.MaxLightRange;
    } else {
      const { z_config } = this;
      return z_config.far_z_mode;
    }
  }
}
