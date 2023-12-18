import { Vec2 } from '../../src/math';
import { ClusterConfig } from '../../src/components/light/ClusterConfig';
import { Clusters } from '../../src/components/light/Clusters';

describe('Light', () => {
  function test_cluster_tiling(
    config: ClusterConfig,
    screen_size: Vec2,
  ): Clusters {
    let dims = config.dimensions_for_screen_size(screen_size);

    // note: near & far do not affect tiling
    let clusters = new Clusters();
    clusters.update(screen_size, dims);

    // check we cover the screen
    expect(clusters.tile_size.x * clusters.dimensions.x >= screen_size.x).toBe(
      true,
    );
    expect(clusters.tile_size.y * clusters.dimensions.y >= screen_size.y).toBe(
      true,
    );
    // check a smaller number of clusters would not cover the screen
    expect(
      clusters.tile_size.x * (clusters.dimensions.x - 1) < screen_size.x,
    ).toBe(true);
    expect(
      clusters.tile_size.y * (clusters.dimensions.y - 1) < screen_size.y,
    ).toBe(true);
    // check a smaller tile size would not cover the screen
    expect(
      (clusters.tile_size.x - 1) * clusters.dimensions.x < screen_size.x,
    ).toBe(true);
    expect(
      (clusters.tile_size.y - 1) * clusters.dimensions.y < screen_size.y,
    ).toBe(true);
    // check we don't have more clusters than pixels
    expect(clusters.dimensions.x <= screen_size.x).toBe(true);
    expect(clusters.dimensions.y <= screen_size.y).toBe(true);

    return clusters;
  }

  it('test_default_cluster_setup_small_screensizes', () => {
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
        let screen_size = new Vec2(x, y);
        let clusters = test_cluster_tiling(new ClusterConfig(), screen_size);
        expect(
          clusters.dimensions.x *
            clusters.dimensions.y *
            clusters.dimensions.z <=
            4096,
        ).toBe(true);
      }
    }
  });
});
