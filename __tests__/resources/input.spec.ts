import { Input } from '../../src/resources/Input';

enum DummyInput {
  Input1,
  Input2,
}

describe('Input', () => {
  it('test pressed', () => {
    const input = new Input<DummyInput>();
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    input.press(DummyInput.Input1);
    expect(input.pressed(DummyInput.Input1)).toBe(true);
  });

  it('test any pressed', () => {
    const input = new Input<DummyInput>();
    expect(input.any_pressed([DummyInput.Input1])).toBe(false);
    expect(input.any_pressed([DummyInput.Input1, DummyInput.Input2])).toBe(
      false,
    );
    input.press(DummyInput.Input1);
    expect(input.any_pressed([DummyInput.Input1])).toBe(true);
    expect(input.any_pressed([DummyInput.Input2])).toBe(false);
    expect(input.any_pressed([DummyInput.Input1, DummyInput.Input2])).toBe(
      true,
    );
  });

  it('test release', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    expect(input._pressed.has(DummyInput.Input1)).toBe(true);
    expect(input._just_released.has(DummyInput.Input1)).toBe(false);
    input.release(DummyInput.Input1);
    expect(input._pressed.has(DummyInput.Input1)).toBe(false);
    expect(input._just_released.has(DummyInput.Input1)).toBe(true);
  });

  it('test release all', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    input.press(DummyInput.Input2);
    input.release_all();
    expect(input._pressed.size).toBe(0);
    expect(input._just_released.has(DummyInput.Input1)).toBe(true);
    expect(input._just_released.has(DummyInput.Input2)).toBe(true);
  });

  it('test just pressed', () => {
    const input = new Input<DummyInput>();
    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
    input.press(DummyInput.Input1);
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
  });

  it('test any just pressed', () => {
    const input = new Input<DummyInput>();
    expect(input.any_pressed([DummyInput.Input1])).toBe(false);
    expect(input.any_pressed([DummyInput.Input1, DummyInput.Input2])).toBe(
      false,
    );
    input.press(DummyInput.Input1);
    expect(input.any_pressed([DummyInput.Input1])).toBe(true);
    expect(input.any_pressed([DummyInput.Input2])).toBe(false);
    expect(input.any_pressed([DummyInput.Input1, DummyInput.Input2])).toBe(
      true,
    );
  });

  it('test clear just pressed', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
    input.clear_just_pressed(DummyInput.Input1);
    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
  });

  it('test just released', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    expect(input.just_released(DummyInput.Input1)).toBe(false);
    input.release(DummyInput.Input1);
    expect(input.just_released(DummyInput.Input1)).toBe(true);
  });

  it('test any just released', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    expect(input.any_just_released([DummyInput.Input1])).toBe(false);
    expect(input.any_just_released([DummyInput.Input2])).toBe(false);
    expect(
      input.any_just_released([DummyInput.Input1, DummyInput.Input2]),
    ).toBe(false);
    input.release(DummyInput.Input1);
    expect(input.any_just_released([DummyInput.Input1])).toBe(true);
    expect(input.any_just_released([DummyInput.Input2])).toBe(false);
    expect(
      input.any_just_released([DummyInput.Input1, DummyInput.Input2]),
    ).toBe(true);
  });

  it('test clear just released', () => {
    const input = new Input<DummyInput>();
    input.press(DummyInput.Input1);
    input.release(DummyInput.Input1);
    expect(input.just_released(DummyInput.Input1)).toBe(true);
    input.clear_just_released(DummyInput.Input1);
    expect(input.just_released(DummyInput.Input1)).toBe(false);
  });

  it('test reset', () => {
    const input = new Input<DummyInput>();

    // Pressed
    input.press(DummyInput.Input1);
    expect(input.pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_released(DummyInput.Input1)).toBe(false);
    input.reset(DummyInput.Input1);
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_released(DummyInput.Input1)).toBe(false);

    // Released
    input.press(DummyInput.Input1);
    input.release(DummyInput.Input1);
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_released(DummyInput.Input1)).toBe(true);
    input.reset(DummyInput.Input1);
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_released(DummyInput.Input1)).toBe(false);
  });

  it('test reset all', () => {
    const input = new Input<DummyInput>();

    input.press(DummyInput.Input1);
    input.press(DummyInput.Input2);
    input.release(DummyInput.Input2);
    expect(input.pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_released(DummyInput.Input2)).toBe(true);
    input.reset_all();
    expect(input._pressed.size).toBe(0);
    expect(input._just_pressed.size).toBe(0);
    expect(input._just_released.size).toBe(0);
  });

  it('test general input handling', () => {
    let input = new Input<DummyInput>();

    // Test pressing
    input.press(DummyInput.Input1);
    input.press(DummyInput.Input2);

    // Check if they were `just_pressed` (pressed on this update)
    expect(input.just_pressed(DummyInput.Input1)).toBe(true);
    expect(input.just_pressed(DummyInput.Input2)).toBe(true);

    // Check if they are also marked as pressed
    expect(input.pressed(DummyInput.Input1)).toBe(true);
    expect(input.pressed(DummyInput.Input2)).toBe(true);

    // Clear the `input`, removing `just_pressed` and `just_released`
    input.clear();

    // Check if they're marked `just_pressed`
    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_pressed(DummyInput.Input2)).toBe(false);

    // Check if they're marked as pressed
    expect(input.pressed(DummyInput.Input1)).toBe(true);
    expect(input.pressed(DummyInput.Input2)).toBe(true);

    // Release the inputs and check state
    input.release(DummyInput.Input1);
    input.release(DummyInput.Input2);

    // Check if they're marked as `just_released` (released on this update)
    expect(input.just_released(DummyInput.Input1)).toBe(true);
    expect(input.just_released(DummyInput.Input2)).toBe(true);

    // Check that they're not incorrectly marked as pressed
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    expect(input.pressed(DummyInput.Input2)).toBe(false);

    // Clear the `Input` and check for removal from `just_released`
    input.clear();

    // Check that they're not incorrectly marked as just released
    expect(input.just_released(DummyInput.Input1)).toBe(false);
    expect(input.just_released(DummyInput.Input2)).toBe(false);

    // Set up an `Input` to test resetting
    input = new Input<DummyInput>();

    // Press and release the inputs
    input.press(DummyInput.Input1);
    input.release(DummyInput.Input2);

    // Reset the `Input` and test if it was reset correctly
    input.reset(DummyInput.Input1);
    input.reset(DummyInput.Input2);

    expect(input.just_pressed(DummyInput.Input1)).toBe(false);
    expect(input.pressed(DummyInput.Input1)).toBe(false);
    expect(input.just_released(DummyInput.Input2)).toBe(false);
  });
});
