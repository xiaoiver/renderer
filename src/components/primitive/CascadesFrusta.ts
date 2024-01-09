import { Entity, field } from '@lastolivegames/becsy';
import { Frustum } from './Frustum';

export class CascadesFrusta {
  @field.object declare frusta: Map<Entity, Frustum[]>;
}
