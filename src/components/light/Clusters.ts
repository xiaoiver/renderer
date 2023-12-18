import { field } from '@lastolivegames/becsy';
import { Vec2, Vec3, v2Type, v3Type } from '../../math';

export class Clusters {
  /// Tile size
  @field(v2Type) declare tile_size: Vec2;
  /// Number of clusters in `X` / `Y` / `Z` in the view frustum
  @field(v3Type) declare dimensions: Vec3;
  /// Distance to the far plane of the first depth slice. The first depth slice is special
  /// and explicitly-configured to avoid having unnecessarily many slices close to the camera.
  @field.float32 declare near: number;
  @field.float32 declare far: number;
  // @field.object declare  lights: VisiblePointLights[]

  constructor(options?: {
    tile_size: Vec2;
    dimensions: Vec3;
    near: number;
    far: number;
  }) {
    const {
      tile_size = Vec2.ONE,
      dimensions = Vec3.ZERO,
      near = 0,
      far = 0,
    } = options ?? {};

    this.tile_size = tile_size;
    this.dimensions = dimensions;
    this.near = near;
    this.far = far;
  }

  update(screen_size: Vec2, requested_dimensions: Vec3) {
    let tile_size = screen_size
      .div(requested_dimensions.xy())
      .ceil()
      .max(Vec2.ONE);

    this.tile_size = tile_size;
    this.dimensions = screen_size
      .div(tile_size)
      .ceil()
      .extend(requested_dimensions.z)
      .max(Vec3.ONE);

    // NOTE: Maximum 4096 clusters due to uniform buffer size constraints
    // debug_assert!(self.dimensions.x * self.dimensions.y * self.dimensions.z <= 4096);
  }

  clear() {
    this.tile_size = Vec2.ONE;
    this.dimensions = Vec3.ZERO;
    this.near = 0.0;
    this.far = 0.0;
    // this.lights.clear();
  }
}
