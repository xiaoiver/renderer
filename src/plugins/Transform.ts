import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Transform, GlobalTransform, TransformBundle } from '../components';
import { SyncSimpleTransforms, PropagateTransforms } from '../systems';

export class TransformPlugin implements Plugin {
  async build(app: App) {
    component(Transform);
    // @ts-ignore
    component(GlobalTransform);
    component(TransformBundle);

    app.addSystems(SyncSimpleTransforms, PropagateTransforms);
  }
}