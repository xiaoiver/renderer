import { field } from '@lastolivegames/becsy';

/**
 * A light that emits light in all directions from a central point.
 *
 * Real-world values for `intensity` (luminous power in lumens) based on the electrical power
 * consumption of the type of real-world light are:
 *
 * | Luminous Power (lumen) (i.e. the intensity member) | Incandescent non-halogen (Watts) | Incandescent halogen (Watts) | Compact fluorescent (Watts) | LED (Watts |
 * |------|-----|----|--------|-------|
 * | 200  | 25  |    | 3-5    | 3     |
 * | 450  | 40  | 29 | 9-11   | 5-8   |
 * | 800  | 60  |    | 13-15  | 8-12  |
 * | 1100 | 75  | 53 | 18-20  | 10-16 |
 * | 1600 | 100 | 72 | 24-28  | 14-17 |
 * | 2400 | 150 |    | 30-52  | 24-30 |
 * | 3100 | 200 |    | 49-75  | 32    |
 * | 4000 | 300 |    | 75-100 | 40.5  |
 *
 * Source: [Wikipedia](https://en.wikipedia.org/wiki/Lumen_(unit)#Lighting)
 */
export class PointLight {
  // @field.float64 color: Color,
  /**
   * Luminous power in lumens
   */
  @field.float64 intensity: number;
  @field.float64 range: number;
  @field.float64 radius: number;
  @field.boolean shadows_enabled: boolean;
  @field.float64 shadow_depth_bias: number;
  /**
   * A bias applied along the direction of the fragment's surface normal. It is scaled to the
   * shadow map's texel size so that it can be small close to the camera and gets larger further away.
   */
  @field.float64 shadow_normal_bias: number;
}

const DEFAULT_SHADOW_DEPTH_BIAS = 0.02;
const DEFAULT_SHADOW_NORMAL_BIAS = 0.6;
