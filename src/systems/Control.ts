import { System } from '@lastolivegames/becsy';
import Hammer from 'hammerjs';
import { AppConfig, OrbitCameraController } from '../components';
import { UpdateControlEvents } from './UpdateControlEvents';
import { ControlEvent } from './OrbitControl';
import { Events, EventsReader } from '../Events';
import { Vec2 } from '../math';

interface MouseWheel {
  x: number;
  y: number;
}

export class Control extends System {
  private appConfig = this.singleton.read(AppConfig);
  private events = this.attach(UpdateControlEvents);

  private mouseWeelEvents: Events<MouseWheel>;
  private mouseWheelReader: EventsReader<MouseWheel>;

  private orbitCameraController = this.query((q) =>
    q.current.with(OrbitCameraController),
  );

  constructor() {
    super();
    this.query((q) => q.using(OrbitCameraController).read);

    this.mouseWeelEvents = new Events<MouseWheel>();
    this.mouseWheelReader = new EventsReader(
      this.mouseWeelEvents,
      this.mouseWeelEvents.get_reader(),
    );
  }

  initialize(): void {
    const { canvas } = this.appConfig;
    const hammertime = new Hammer(canvas);

    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.get('pinch').set({ enable: true });
    hammertime.on('panstart', this.onPanstart);
    hammertime.on('panmove', this.onPanmove);
    hammertime.on('panend', this.onPanend);
    hammertime.on('pinch', this.onPinch);

    canvas.addEventListener('wheel', this.onMousewheel);
  }

  execute(): void {
    const entity = this.orbitCameraController.current?.[0];
    if (entity) {
      const control = entity.read(OrbitCameraController);
      if (control.enabled) {
        const {
          mouse_rotate_sensitivity,
          mouse_translate_sensitivity,
          mouse_wheel_zoom_sensitivity,
          pixels_per_line,
        } = control;

        let cursor_delta = Vec2.ZERO;
        // for event in mouse_motion_events.read() {
        //     cursor_delta += event.delta;
        // }

        // if keyboard.pressed(KeyCode::ControlLeft) {
        //     events.send(ControlEvent::Orbit(mouse_rotate_sensitivity * cursor_delta));
        // }

        // if mouse_buttons.pressed(MouseButton::Right) {
        //     events.send(ControlEvent::TranslateTarget(
        //         mouse_translate_sensitivity * cursor_delta,
        //     ));
        // }

        let scalar = 1.0;
        for (const event of this.mouseWheelReader.read()) {
          const { y } = event;
          const scroll_amount = y / pixels_per_line;
          scalar *= 1.0 - scroll_amount * mouse_wheel_zoom_sensitivity;
        }
        if (scalar !== 1.0) {
          this.events.events.send(new ControlEvent.Zoom(scalar));
        }
      }
    }
  }

  private onPanstart = (e: HammerInput) => {
    // this.lastX = e.center.x;
    // this.lastY = e.center.y;
    // this.isMoving = true;
  };

  private onPanmove = (e: HammerInput) => {
    // https://gist.github.com/handleman/3c99e754065f647b082f
    // const isMac =
    //   this.context.globalThis.navigator.platform.toUpperCase().indexOf('MAC') >=
    //   0;
    // this.ctrlKey = e.srcEvent.ctrlKey;
    // if (isMac && e.srcEvent.metaKey) {
    //   this.ctrlKey = true;
    // }
    // this.altKey = e.srcEvent.altKey;
    // this.shiftKey = e.srcEvent.shiftKey;
    // if (this.isMoving) {
    //   const deltaX = e.center.x - this.lastX;
    //   const deltaY = e.center.y - this.lastY;
    //   this.lastX = e.center.x;
    //   this.lastY = e.center.y;
    //   if (this.ctrlKey && !this.shiftKey) {
    //     this.dolly(deltaY);
    //   } else if (this.shiftKey && !this.ctrlKey) {
    //     this.pan(deltaX, deltaY);
    //   } else if (this.ctrlKey && this.shiftKey) {
    //     this.roll(deltaY);
    //   } else {
    //     this.rotate(deltaX, deltaY);
    //   }
    // }
  };

  private onPanend = (e: HammerInput) => {
    // this.isMoving = false;
  };

  private onPinch = (e: HammerInput) => {
    const deltaZ = (1 - e.scale) * 10;
    // this.dolly(deltaZ);
  };

  private onMousewheel = (e: WheelEvent) => {
    this.mouseWeelEvents.send({
      x: e.deltaX,
      y: e.deltaY,
    });
  };
}
