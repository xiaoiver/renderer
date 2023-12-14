import { System } from '@lastolivegames/becsy';
import { Events, EventsReader } from '../Events';
import { ControlEvent } from './OrbitControl';

export class UpdateControlEvents extends System {
  events: Events<ControlEvent>;
  reader: EventsReader<ControlEvent>;

  constructor() {
    super();
    this.events = new Events<ControlEvent>();
    this.reader = new EventsReader(this.events, this.events.get_reader());
  }

  execute(): void {
    if (
      this.events.events_a.events.length !== 0 ||
      this.events.events_b.events.length !== 0
    ) {
      this.events.update();
    }
  }
}
