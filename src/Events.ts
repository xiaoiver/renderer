/**
 * An event collection that represents the events that occurred within the last two
 * [`Events::update`] calls.
 * Events can be written to using an [`EventWriter`]
 * and are typically cheaply read using an [`EventReader`].
 *
 * Each event can be consumed by multiple systems, in parallel,
 * with consumption tracked by the [`EventReader`] on a per-system basis.
 *
 * If no [ordering](https://github.com/bevyengine/bevy/blob/main/examples/ecs/ecs_guide.rs)
 * is applied between writing and reading systems, there is a risk of a race condition.
 * This means that whether the events arrive before or after the next [`Events::update`] is unpredictable.
 *
 * This collection is meant to be paired with a system that calls
 * [`Events::update`] exactly once per update/frame.
 *
 * [`event_update_system`] is a system that does this, typically initialized automatically using
 * [`add_event`](https://docs.rs/bevy///bevy/app/struct.App.html#method.add_event).
 * [`EventReader`]s are expected to read events from this collection at least once per loop/frame.
 * Events will persist across a single frame boundary and so ordering of event producers and
 * consumers is not critical (although poorly-planned ordering may cause accumulating lag).
 * If events are not handled by the end of the frame after they are updated, they will be
 * dropped silently.
 *
 * @example
 * ```
 * use bevy_ecs::event::{Event, Events};
 *
 * #[derive(Event)]
 * struct MyEvent {
 *     value: usize
 * }
 *
 * // setup
 * let mut events = Events::<MyEvent>::default();
 * let mut reader = events.get_reader();
 *
 * // run this once per update/frame
 * events.update();
 *
 * // somewhere else: send an event
 * events.send(MyEvent { value: 1 });
 *
 * // somewhere else: read the events
 * for event in reader.read(&events) {
 *     assert_eq!(event.value, 1)
 * }
 *
 * // events are only processed once per reader
 * assert_eq!(reader.iter(&events).count(), 0);
 * ```
 *
 * # Details
 *
 * [`Events`] is implemented using a variation of a double buffer strategy.
 * Each call to [`update`](Events::update) swaps buffers and clears out the oldest one.
 * - [`EventReader`]s will read events from both buffers.
 * - [`EventReader`]s that read at least once per update will never drop events.
 * - [`EventReader`]s that read once within two updates might still receive some events
 * - [`EventReader`]s that read after two updates are guaranteed to drop all events that occurred
 * before those updates.
 *
 * The buffers in [`Events`] will grow indefinitely if [`update`](Events::update) is never called.
 *
 * An alternative call pattern would be to call [`update`](Events::update)
 * manually across frames to control when events are cleared.
 * This complicates consumption and risks ever-expanding memory usage if not cleaned up,
 * but can be done by adding your event as a resource instead of using
 * [`add_event`](https://docs.rs/bevy////bevy/app/struct.App.html#method.add_event).
 *
 * [Example usage.](https://github.com/bevyengine/bevy/blob/latest/examples/ecs/event.rs)
 * [Example usage standalone.](https://github.com/bevyengine/bevy/blob/latest/crates/bevy_ecs/examples/events.rs)
 */
export class Events<E> {
  /// Holds the oldest still active events.
  /// Note that a.start_event_count + a.len() should always === events_b.start_event_count.
  events_a: EventSequence<E> = { events: [], start_event_count: 0 };
  /// Holds the newer events.
  events_b: EventSequence<E> = { events: [], start_event_count: 0 };
  event_count: number = 0;

  /**
   * Returns the index of the oldest event stored in the event buffer.
   */
  oldest_event_count() {
    return Math.min(
      this.events_a.start_event_count,
      this.events_b.start_event_count,
    );
  }

  /**
   * "Sends" an `event` by writing it to the current event buffer. [`EventReader`]s can then read the event.
   * This method returns the [ID](`EventId`) of the sent `event`.
   */
  send(event: E): EventId<E> {
    let event_id = new EventId(this.event_count);

    const event_instance = { event_id, event };

    this.events_b.events.push(event_instance);
    this.event_count += 1;

    return event_id;
  }

  get_reader(): ManualEventReader<E> {
    return new ManualEventReader<E>();
  }

  /// Swaps the event buffers and clears the oldest event buffer. In general, this should be
  /// called once per frame/update.
  ///
  /// If you need access to the events that were removed, consider using [`Events::update_drain`].
  update() {
    let _ = this.update_drain();
  }

  /**
   * Swaps the event buffers and drains the oldest event buffer, returning an iterator
   * of all events that were removed. In general, this should be called once per frame/update.
   * If you do not need to take ownership of the removed events, use [`Events::update`] instead.
   */
  update_drain() {
    const tmp = this.events_a;
    this.events_a = this.events_b;
    this.events_b = tmp;

    const iter = this.events_b.events.splice(0, this.events_b.events.length);
    this.events_b.start_event_count = this.event_count;

    return iter.map((e) => e.event);
  }

  reset_start_event_count() {
    this.events_a.start_event_count = this.event_count;
    this.events_b.start_event_count = this.event_count;
  }

  /**
   * Removes all events.
   */
  clear() {
    this.reset_start_event_count();
    this.events_a.events = [];
    this.events_b.events = [];
  }

  /**
   * Returns the number of events currently stored in the event buffer.
   */
  len() {
    return this.events_a.events.length + this.events_b.events.length;
  }

  /// Returns true if there are no events currently stored in the event buffer.
  is_empty() {
    return this.len() === 0;
  }
}

/// An `EventId` uniquely identifies an event stored in a specific [`World`].
///
/// An `EventId` can among other things be used to trace the flow of an event from the point it was
/// sent to the point it was processed.
///
/// [`World`]: crate::world::World
class EventId<E> {
  /// Uniquely identifies the event associated with this ID.
  // This value corresponds to the order in which each event was added to the world.

  constructor(public id: number) {}

  eq(other: this) {
    return this.id === other.id;
  }
}

interface EventInstance<E> {
  event_id: EventId<E>;
  event: E;
}

interface EventSequence<E> {
  events: EventInstance<E>[];
  start_event_count: number;
}

/// Stores the state for an [`EventReader`].
/// Access to the [`Events<E>`] resource is required to read any incoming events.
export class ManualEventReader<E> {
  constructor(public last_event_count: number = 0) {}

  read(events: Events<E>) {
    return this.read_with_id(events).without_id();
  }

  read_with_id(events: Events<E>) {
    return new EventIteratorWithId(this, events);
  }

  /// See [`EventReader::len`]
  len(events: Events<E>) {
    // The number of events in this reader is the difference between the most recent event
    // and the last event seen by it. This will be at most the number of events contained
    // with the events (any others have already been dropped)
    // TODO: Warn when there are dropped events, or return e.g. a `Result<usize, (usize, usize)>`
    return Math.min(events.event_count - this.last_event_count, events.len());
  }
}

class EventIterator<E> {
  constructor(public iter: EventIteratorWithId<E>) {}

  *[Symbol.iterator]() {
    for (const item of this.iter) {
      const { event } = item;
      yield event;
    }
  }
}

/**
 * An iterator that yields any unread events (and their IDs) from an [`EventReader`] or [`ManualEventReader`].
 */
class EventIteratorWithId<E> {
  reader: ManualEventReader<E>;
  chain: EventInstance<E>[];
  unread: number;

  constructor(reader: ManualEventReader<E>, events: Events<E>) {
    let a_index = reader.last_event_count - events.events_a.start_event_count;
    let b_index = reader.last_event_count - events.events_b.start_event_count;
    let a = events.events_a.events.slice(a_index);
    let b = events.events_b.events.slice(b_index);

    let unread_count = a.length + b.length;

    if (unread_count !== reader.len(events)) {
      throw new Error('');
    }

    reader.last_event_count = events.event_count - unread_count;

    this.reader = reader;
    // Iterate the oldest first, then the newer events
    this.chain = a.concat(b);
    this.unread = unread_count;
  }

  without_id(): EventIterator<E> {
    return new EventIterator(this);
  }

  count() {
    this.reader.last_event_count += this.unread;
    return this.unread;
  }

  *[Symbol.iterator]() {
    for (const item of this.chain) {
      this.reader.last_event_count += 1;
      this.unread -= 1;
      yield item;
    }
  }
}

/**
 * Reads events of type `T` in order and tracks which events have already been read.
 */
export class EventsReader<E> {
  constructor(public events: Events<E>, public reader: ManualEventReader<E>) {}

  /// Iterates over the events this [`EventReader`] has not seen yet. This updates the
  /// [`EventReader`]'s event counter, which means subsequent event reads will not include events
  /// that happened before now.
  read() {
    return this.reader.read(this.events);
  }

  iter(): EventIterator<E> {
    return this.reader.read(this.events);
  }

  read_with_id(): EventIteratorWithId<E> {
    return this.reader.read_with_id(this.events);
  }

  len() {
    return this.reader.len(this.events);
  }
}
