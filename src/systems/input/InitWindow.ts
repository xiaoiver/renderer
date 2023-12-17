import { System } from '@lastolivegames/becsy';
import { AppConfig } from '../../components';
import { EventsReader } from '../../Events';
import { MouseMotion, MouseWheel } from '../../plugins/Input';
import { ButtonState, MouseButton, MouseButtonInput } from './MouseButtonInput';
import { KeyCode, KeyboardInput } from './KeyboardInput';
import { Vec2 } from '../../math';

const MouseEventButtonMap = {
  0: MouseButton.Left,
  1: MouseButton.Middle,
  2: MouseButton.Right,
};

/**
 * Register some event listeners on the canvas and convert to Events like MouseButtonInput and MouseWheel.
 */
export class InitWindow extends System {
  private appConfig = this.singleton.read(AppConfig);

  async prepare() {
    const { canvas } = this.appConfig;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('wheel', this.onMousewheel);
    // @see https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private onMouseDown = (e: MouseEvent) => {
    const reader = this.appConfig.resources.get(
      MouseButtonInput,
    ) as EventsReader<MouseButtonInput>;
    reader.events.send({
      button: MouseEventButtonMap[e.button],
      state: ButtonState.Pressed,
    });
  };

  private onMouseUp = (e: MouseEvent) => {
    const reader = this.appConfig.resources.get(
      MouseButtonInput,
    ) as EventsReader<MouseButtonInput>;
    reader.events.send({
      button: MouseEventButtonMap[e.button],
      state: ButtonState.Released,
    });
  };

  private onMouseMove = (e: MouseEvent) => {
    const reader = this.appConfig.resources.get(
      MouseMotion,
    ) as EventsReader<MouseMotion>;

    console.log(e.movementX, e.movementY);
    reader.events.send({
      delta: new Vec2(e.movementX, e.movementY),
    });
  };

  private onMousewheel = (e: WheelEvent) => {
    const reader = this.appConfig.resources.get(
      MouseWheel,
    ) as EventsReader<MouseWheel>;
    reader.events.send({
      x: e.deltaX,
      y: e.deltaY,
    });
  };

  private onKeyDown = (e: KeyboardEvent) => {
    const reader = this.appConfig.resources.get(
      KeyboardInput,
    ) as EventsReader<KeyboardInput>;
    reader.events.send({
      key_code: e.code,
      state: ButtonState.Pressed,
    });
  };

  private onKeyUp = (e: KeyboardEvent) => {
    const reader = this.appConfig.resources.get(
      KeyboardInput,
    ) as EventsReader<KeyboardInput>;
    reader.events.send({
      key_code: e.code,
      state: ButtonState.Released,
    });
  };

  finalize(): void {
    const { canvas } = this.appConfig;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    canvas.removeEventListener('mousedown', this.onMouseDown);
    canvas.removeEventListener('mouseup', this.onMouseUp);
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('wheel', this.onMousewheel);
  }
}
