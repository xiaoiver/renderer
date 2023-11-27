import { createWorld } from 'bitecs';
import { Commands } from '../../src/Commands';
import { Types, defineComponent } from '../../src';

describe('Commands', () => {
  it('should spawn an empty entity commands correctly.', () => {
    const world = createWorld();
    const commands = new Commands(world);
    const eid = commands.spawnEmpty().id();
    expect(eid).toBe(0);
  });

  it('should add & remove a bundle of components to the entity correctly.', () => {
    const world = createWorld();
    const Position = defineComponent({
      x: Types.f32,
      y: Types.f32,
      z: Types.f32,
    });
    const Visibility = defineComponent({ v: Types.ui8 });

    const commands = new Commands(world);
    const entityCommands = commands.spawnEmpty().insert(
      {
        x: 0,
        y: 1,
        z: 2,
        v: 1,
      },
      Position,
      Visibility,
    );
    const eid = entityCommands.id();
    expect(Position.x[eid]).toBe(0);
    expect(Position.y[eid]).toBe(1);
    expect(Position.z[eid]).toBe(2);
    expect(Visibility.v[eid]).toBe(1);

    entityCommands.remove(Position);
    expect(Position.x[eid]).toBe(0);
    expect(Position.y[eid]).toBe(0);
    expect(Position.z[eid]).toBe(0);
    expect(Visibility.v[eid]).toBe(1);

    entityCommands.despawn();
    expect(Position.x[eid]).toBe(0);
    expect(Position.y[eid]).toBe(0);
    expect(Position.z[eid]).toBe(0);
    expect(Visibility.v[eid]).toBe(1);
  });
});
