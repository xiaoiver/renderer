import { App } from '../App';
import { Plugin } from '../Plugin';

export class EventPlugin implements Plugin {
  build(app: App): void | Promise<void> {
    const { canvas } = app['config'];
    canvas.addEventListener('keydown', (ev) => {
      ev.key;
    });
  }
}
