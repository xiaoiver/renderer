import { field } from '@lastolivegames/becsy';

/// An identifier for a rendering layer.
export type Layer = number;

/**
 * Describes which rendering layers an entity belongs to.
 * Cameras with this component will only render entities with intersecting layers.
 *
 * There are 32 layers numbered `0` - [`TOTAL_LAYERS`](RenderLayers::TOTAL_LAYERS).
 * Entities may belong to one or more layers, or no layer at all.
 *
 * The [`Default`] instance of `RenderLayers` contains layer `0`, the first layer.
 * An entity with this component without any layers is invisible.
 *
 * Entities without this component belong to layer `0`.
 */
export class RenderLayers {
  /**
   * The total number of layers supported.
   */
  static TOTAL_LAYERS = 32;

  /**
   * Create a new `RenderLayers` belonging to the given layer.
   */
  static layer(n: Layer) {
    return new RenderLayers(0).with(n);
  }

  /**
   * Create a new `RenderLayers` that belongs to all layers.
   */
  static all() {
    return new RenderLayers(0xffffffff);
  }

  /**
   * Create a new `RenderLayers` that belongs to no layers.
   */
  static none() {
    return new RenderLayers(0);
  }

  /// Create a `RenderLayers` from a list of layers.
  // static from_layers(layers: Layer[]) {
  //   layers.iter().copied().collect()
  // }

  @field.uint8 declare layer: number;

  constructor(layer = 0) {
    this.layer = layer;
  }

  /**
   * Add the given layer.
   *
   * This may be called multiple times to allow an entity to belong
   * to multiple rendering layers. The maximum layer is `TOTAL_LAYERS - 1`.
   */
  with(layer: Layer) {
    if (layer >= RenderLayers.TOTAL_LAYERS) {
      throw new Error(
        'Panics when called with a layer greater than `TOTAL_LAYERS - 1`.',
      );
    }
    this.layer |= 1 << layer;
    return this;
  }

  /**
   * Removes the given rendering layer.
   */
  without(layer: Layer) {
    if (layer >= RenderLayers.TOTAL_LAYERS) {
      throw new Error(
        'Panics when called with a layer greater than `TOTAL_LAYERS - 1`.',
      );
    }
    this.layer &= 1 << layer;
    return this;
  }

  /**
   * Determine if a `RenderLayers` intersects another.
   * `RenderLayers`s intersect if they share any common layers.
   * A `RenderLayers` with no layers will not match any other
   * `RenderLayers`, even another with no layers.
   */
  intersects(other: RenderLayers) {
    return (this.layer & other.layer) > 0;
  }
}
