import { Entity, System } from '@lastolivegames/becsy';
import { Command } from './Command';
import { Children } from '../components';

export class AddChild implements Command {
  constructor(public parent: Entity, public child: Entity) {}

  apply(system: System) {
    this.child.add(Children, {
      parent: this.parent,
    });

    // TODO: emit ADD_CHILD event.
  }
}
