import { merge } from 'hammerjs';
import { Observable, fromEvent, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, share } from 'rxjs/operators';
import { Resource } from '../Resource';

export type Shortcut = {
  keys: string[];
  cb: { (): void };
};

// const shortcuts: Shortcut[] = [
//   {
//     keys: ['Shift', 'r', 'x'], //shortcut keys in format how they will be exposed in e.key
//     //callback to call when keys are pressed
//     cb: () => {
//       console.log('RxJS is cool!');
//     },
//   },
// ];

export class Keyboard implements Resource {
  private hotkeys: (shortcuts: Shortcut[], preventSeries?: boolean) => void;

  constructor() {
    const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      share(),
    );
    const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(share());
    const specifyKeyEvent =
      (observable: Observable<KeyboardEvent>) => (key: string) =>
        observable.pipe(
          filter((e) => e.key.toLowerCase() === key.toLowerCase()),
        );

    const [keydown$ForKey, keyup$ForKey] = [keydown$, keyup$].map(
      specifyKeyEvent,
    );
    const keyState$ForKey = (key: string) =>
      merge(
        keydown$ForKey(key).pipe(map(() => true)),
        keyup$ForKey(key).pipe(map(() => false)),
      );

    const keysState$ForKeys = (keys: string[]) =>
      combineLatest(keys.map(keyState$ForKey));

    this.hotkeys = (shortcuts: Shortcut[], preventSeries = true) =>
      shortcuts.forEach(({ keys, cb }) =>
        keysState$ForKeys(keys)
          .pipe(
            //we use JSON.stringify here to assert content equality of two arrays
            distinctUntilChanged(
              (prev, cur) =>
                preventSeries && JSON.stringify(prev) === JSON.stringify(cur),
            ),
            filter((keysState) => keysState.every(Boolean)),
          )
          .subscribe(cb),
      );
  }

  pressed(keys: string[], cb: () => void) {
    this.hotkeys([{ keys, cb }], false);
  }
}
