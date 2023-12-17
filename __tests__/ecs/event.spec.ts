import { Event, Events, ManualEventReader } from '../../src/Events';

interface TestEvent {
  i: number;
}

function get_events<E extends Event>(
  events: Events<E>,
  reader: ManualEventReader<E>,
): E[] {
  return [...reader.read(events)];
}

function events_clear_and_read_impl(clear_func: (events: Events) => void) {
  let events = new Events();
  let reader = events.get_reader();

  expect(reader.read(events).next()).toBeUndefined();

  events.send(0);
  expect(reader.read(events).next()).toBe(0);
  expect(reader.read(events).next()).toBeUndefined();

  events.send(1);
  clear_func(events);
  expect(reader.read(events).next()).toBeUndefined();

  events.send(2);
  events.update();
  events.send(3);

  expect([...reader.read(events)]).toStrictEqual([2, 3]);
}

describe('Event', () => {
  it('test events', () => {
    const events = new Events<TestEvent>();
    const event_0 = { i: 0 };
    const event_1 = { i: 1 };
    const event_2 = { i: 2 };
    // this reader will miss event_0 and event_1 because it wont read them over the course of
    // two updates
    const reader_missed = events.get_reader();
    const reader_a = events.get_reader();

    events.send(event_0);

    // reader_a created before event receives event
    expect(get_events(events, reader_a)).toStrictEqual([event_0]);

    // second iteration of reader_a created before event results in zero events
    expect(get_events(events, reader_a)).toStrictEqual([]);

    const reader_b = events.get_reader();

    // reader_b created after event receives event
    expect(get_events(events, reader_b)).toStrictEqual([event_0]);

    // second iteration of reader_b created after event results in zero events
    expect(get_events(events, reader_b)).toStrictEqual([]);

    events.send(event_1);

    const reader_c = events.get_reader();

    // reader_c created after two events receives both events
    expect(get_events(events, reader_c)).toStrictEqual([event_0, event_1]);
    // second iteration of reader_c created after two event results in zero events"
    expect(get_events(events, reader_c)).toStrictEqual([]);
    // reader_a receives next unread event
    expect(get_events(events, reader_a)).toStrictEqual([event_1]);

    events.update();

    const reader_d = events.get_reader();

    events.send(event_2);

    // reader_a receives event created after update
    expect(get_events(events, reader_a)).toStrictEqual([event_2]);
    // reader_b receives events created before and after update
    expect(get_events(events, reader_b)).toStrictEqual([event_1, event_2]);
    // reader_d receives all events created before and after update
    expect(get_events(events, reader_d)).toStrictEqual([
      event_0,
      event_1,
      event_2,
    ]);

    events.update();

    // reader_missed missed events unread after two update() calls
    expect(get_events(events, reader_missed)).toStrictEqual([event_2]);
  });

  it('test_events_clear_and_read', () => {
    events_clear_and_read_impl((events) => events.clear());
  });

  it('test_events_drain_and_read', () => {
    events_clear_and_read_impl((events) => {
      expect(events.drain()).toStrictEqual([0, 1]);
    });
  });

  it('test_events_extend_impl', () => {
    let events = new Events<TestEvent>();
    let reader = events.get_reader();

    events.extend([{ i: 0 }, { i: 1 }]);
    expect([...reader.read(events)]).toStrictEqual([{ i: 0 }, { i: 1 }]);
  });
});
