import { Entity, field } from '@lastolivegames/becsy';
import { Children } from './Children';

export class Parent {
  @field.backrefs(Children, 'parent') declare children: Entity[];
}
