import { Entity, field } from '@lastolivegames/becsy';

export class Children {
  @field.ref declare parent: Entity;
}
