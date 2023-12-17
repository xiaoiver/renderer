import { System } from '@lastolivegames/becsy';
import { AppConfig } from '../../components';
import { Input } from '../../resources/Input';
import { Event, EventsReader } from '../../Events';

import { ButtonState } from './MouseButtonInput';

export const KeyCode = 'KeyCode';
export type KeyCode = string;

export class InputKeyCode {}

export class KeyboardInput extends Event {
  key_code: KeyCode;
  /// The press state of the key.
  state: ButtonState;
}

/**
 * Updates the [`Input<MouseButton>`] resource with the latest [`MouseButtonInput`] events.
 *
 * ## Differences
 *
 * The main difference between the [`MouseButtonInput`] event and the [`Input<MouseButton>`] resource is that
 * the latter has convenient functions like [`Input::pressed`], [`Input::just_pressed`] and [`Input::just_released`].
 */

export class KeyboardInputSystem extends System {
  private appConfig = this.singleton.read(AppConfig);

  execute(): void {
    const key_input = this.appConfig.resources.get(
      InputKeyCode,
    ) as Input<KeyCode>;
    const keyboard_input_events = this.appConfig.resources.get(
      KeyboardInput,
    ) as EventsReader<KeyboardInput>;

    key_input.clear();
    for (const event of keyboard_input_events.read()) {
      if (event.state === ButtonState.Pressed) {
        key_input.press(event.key_code);
      } else {
        key_input.release(event.key_code);
      }
    }
  }
}
