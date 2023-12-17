import { System } from '@lastolivegames/becsy';
import { AppConfig } from '../../components';
import { Input } from '../../resources/Input';
import { Event, EventsReader } from '../../Events';

export enum MouseButton {
  /// The left mouse button.
  Left,
  /// The right mouse button.
  Right,
  /// The middle mouse button.
  Middle,
  /// Another mouse button with the associated number.
  // Other(u16),
}

export enum ButtonState {
  /// The button is pressed.
  Pressed,
  /// The button is not pressed.
  Released,
}

export class MouseButtonInput extends Event {
  /// The mouse button assigned to the event.
  button: MouseButton;
  /// The pressed state of the button.
  state: ButtonState;
}

export class InputMouseButton {}

/**
 * Updates the [`Input<MouseButton>`] resource with the latest [`MouseButtonInput`] events.
 *
 * ## Differences
 *
 * The main difference between the [`MouseButtonInput`] event and the [`Input<MouseButton>`] resource is that
 * the latter has convenient functions like [`Input::pressed`], [`Input::just_pressed`] and [`Input::just_released`].
 */

export class MouseButtonInputSystem extends System {
  private appConfig = this.singleton.read(AppConfig);

  execute(): void {
    const mouse_button_input = this.appConfig.resources.get(
      InputMouseButton,
    ) as Input<MouseButton>;
    const mouse_button_input_events = this.appConfig.resources.get(
      MouseButtonInput,
    ) as EventsReader<MouseButtonInput>;

    mouse_button_input.clear();
    for (const event of mouse_button_input_events.read()) {
      if (event.state === ButtonState.Pressed) {
        mouse_button_input.press(event.button);
      } else {
        mouse_button_input.release(event.button);
      }
    }
  }
}
