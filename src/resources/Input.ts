import { Resource } from '../Resource';

/**
 * A "press-able" input of type `T`.
 *
 * ## Usage
 *
 * This type can be used as a resource to keep the current state of an input, by reacting to
 * events from the input. For a given input value:
 * * [`Input::pressed`] will return `true` between a press and a release event.
 * * [`Input::just_pressed`] will return `true` for one frame after a press event.
 * * [`Input::just_released`] will return `true` for one frame after a release event.
 *
 * ## Multiple systems
 *
 * In case multiple systems are checking for [`Input::just_pressed`] or [`Input::just_released`]
 * but only one should react, for example in the case of triggering
 * [`State`] change, you should consider clearing the input state, either by:
 * * Using [`Input::clear_just_pressed`] or [`Input::clear_just_released`] instead.
 * * Calling [`Input::clear`] or [`Input::reset`] immediately after the state change.
 */
export class Input<T> implements Resource {
  /// A collection of every button that is currently being pressed.
  _pressed: Set<T> = new Set();
  /// A collection of every button that has just been pressed.
  _just_pressed: Set<T> = new Set();
  /// A collection of every button that has just been released.
  _just_released: Set<T> = new Set();

  /**
   * Registers a press for the given `input`.
   */
  press(input: T) {
    // Returns `true` if the `input` wasn't pressed.
    if (!this._pressed.has(input)) {
      this._just_pressed.add(input);
    }
    this._pressed.add(input);
  }

  /**
   * Returns `true` if the `input` has been pressed.
   */
  pressed(input: T) {
    return this._pressed.has(input);
  }

  /**
   * Returns `true` if any item in `inputs` has been pressed.
   */
  any_pressed(inputs: T[]) {
    return inputs.some((it) => this.pressed(it));
  }

  /**
   * Registers a release for the given `input`.
   */
  release(input: T) {
    // Returns `true` if the `input` was pressed.
    if (this._pressed.delete(input)) {
      this._just_released.add(input);
    }
  }

  /**
   * Registers a release for all currently pressed inputs.
   */
  release_all() {
    this._pressed.forEach((input) => {
      // Move all items from pressed into just_released
      this._just_released.add(input);
    });
    this._pressed.clear();
  }

  /**
   * Returns `true` if the `input` has just been pressed.
   */
  just_pressed(input: T) {
    return this._just_pressed.has(input);
  }

  /// Returns `true` if any item in `inputs` has just been pressed.
  any_just_pressed(inputs: T[]) {
    return inputs.some((it) => this.just_pressed(it));
  }

  /// Clears the `just_pressed` state of the `input` and returns `true` if the `input` has just been pressed.
  ///
  /// Future calls to [`Input::just_pressed`] for the given input will return false until a new press event occurs.
  clear_just_pressed(input: T) {
    return this._just_pressed.delete(input);
  }

  /**
   * Returns `true` if the `input` has just been released.
   */
  just_released(input: T) {
    return this._just_released.has(input);
  }

  /**
   * Returns `true` if any item in `inputs` has just been released.
   */
  any_just_released(inputs: T[]) {
    return inputs.some((input) => this.just_released(input));
  }

  /// Clears the `just_released` state of the `input` and returns `true` if the `input` has just been released.
  ///
  /// Future calls to [`Input::just_released`] for the given input will return false until a new release event occurs.
  clear_just_released(input: T) {
    return this._just_released.delete(input);
  }

  /// Clears the `pressed`, `just_pressed` and `just_released` data of the `input`.
  reset(input: T) {
    this._pressed.delete(input);
    this._just_pressed.delete(input);
    this._just_released.delete(input);
  }

  /// Clears the `pressed`, `just_pressed`, and `just_released` data for every input.
  ///
  /// See also [`Input::clear`] for simulating elapsed time steps.
  reset_all() {
    this._pressed.clear();
    this._just_pressed.clear();
    this._just_released.clear();
  }

  /// Clears the `just pressed` and `just released` data for every input.
  ///
  /// See also [`Input::reset_all`] for a full reset.
  clear() {
    this._just_pressed.clear();
    this._just_released.clear();
  }
}
