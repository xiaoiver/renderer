import { World, component, field } from '@lastolivegames/becsy';

export const ScalingMode = World.defineEnum('ScalingMode');

/**
 * Manually specify the projection's size, ignoring window resizing.
 * The image will stretch. Arguments are in world units.
 */
@component(ScalingMode)
class Fixed {
  @field.float64 declare width: number;
  @field.float64 declare height: number;
}
@component(ScalingMode)
class WindowSize {}
