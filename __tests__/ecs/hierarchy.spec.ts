import { Entity, System } from '@lastolivegames/becsy';
import {
  App,
  Children,
  Commands,
  HierarchyPlugin,
  Parent,
  StartUp,
} from '../../src';

describe('Hierarchy', () => {
  it('test parent children relationship', async () => {
    const app = new App({});
    let parent_entity: Entity | undefined;
    let child_entity: Entity | undefined;

    class StartUpSystem extends System {
      commands = new Commands(this);

      q = this.query((q) => q.using(Parent, Children).write);
      q2 = this.query((q) => q.current.with(Parent).read);

      initialize(): void {
        const parent = this.commands.spawn();
        const child = this.commands.spawn();
        parent.add_child(child.id());

        parent_entity = parent.id().hold();
        child_entity = child.id().hold();

        this.commands.execute();
      }

      execute(): void {
        expect(parent_entity?.read(Parent).children).toBe([child_entity]);
      }
    }

    app.add_plugins(HierarchyPlugin);
    app.add_systems(StartUp, StartUpSystem);
    await app.run();

    expect(parent_entity?.has(Parent)).toBeTruthy();
    expect(child_entity?.has(Children)).toBeTruthy();

    await app.exit();
  });
});
