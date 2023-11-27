import { field } from '@lastolivegames/becsy';
import { Transform } from './Transform';
import { GlobalTransform } from './GlobalTransform';

/**
 * A [`Bundle`] of the [`Transform`] and [`GlobalTransform`] [`Component`]s,
 * which describe the position of an entity.
 */
export class TransformBundle {
  @field.object declare local: Transform;
  @field.object declare global: GlobalTransform;
}
