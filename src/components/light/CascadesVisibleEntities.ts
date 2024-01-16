import { Entity, field } from '@lastolivegames/becsy';
import { VisibleEntities } from '../render';

export class CascadesVisibleEntities {
  @field.object declare entities: Map<Entity, VisibleEntities[]>;

  constructor() {
    this.entities = new Map();
  }
}
