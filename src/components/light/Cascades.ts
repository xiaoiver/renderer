import { Entity, field } from '@lastolivegames/becsy';
import { Mat4, m4Type } from '../../math';

export class Cascade {
  /// The transform of the light, i.e. the view to world matrix.
  @field(m4Type) declare view_transform: Mat4;
  /// The orthographic projection for this cascade.
  @field(m4Type) declare projection: Mat4;
  /// The view-projection matrix for this cascade, converting world space into light clip space.
  /// Importantly, this is derived and stored separately from `view_transform` and `projection` to
  /// ensure shadow stability.
  @field(m4Type) declare view_projection: Mat4;
  /// Size of each shadow map texel in world units.
  @field.float32 declare texel_size: number;

  constructor(
    options?: Partial<{
      view_transform: Mat4;
      projection: Mat4;
      view_projection: Mat4;
      texel_size: number;
    }>,
  ) {
    const {
      view_transform = Mat4.IDENTITY,
      projection = Mat4.IDENTITY,
      view_projection = Mat4.IDENTITY,
      texel_size = 0,
    } = options || {};

    this.view_transform = view_transform;
    this.projection = projection;
    this.view_projection = view_projection;
    this.texel_size = texel_size;
  }
}

export class Cascades {
  /// Map from a view to the configuration of each of its [`Cascade`]s.
  @field.object cascades: Map<Entity, Cascade[]>;

  constructor(options?: Partial<{ cascades: Map<Entity, Cascade[]> }>) {
    const { cascades = new Map() } = options || {};
    this.cascades = cascades;
  }
}
