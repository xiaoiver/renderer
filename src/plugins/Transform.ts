import { component } from '@lastolivegames/becsy';
import { App } from '../App';
import { Plugin } from '../Plugin';
import { Transform, GlobalTransform, TransformBundle } from '../components';
import {
  ValidParentCheck,
  SyncSimpleTransforms,
  PropagateTransforms,
  PreUpdate,
  PostStartup,
  PostUpdate,
} from '../systems';

export class TransformPlugin implements Plugin {
  async build(app: App) {
    component(Transform);
    component(GlobalTransform);
    component(TransformBundle);

    app.add_systems(PostStartup, ValidParentCheck);
    // add transform systems to startup so the first update is "correct"
    app.add_systems(PreUpdate, SyncSimpleTransforms, PropagateTransforms);
    // app.add_systems(PostStartup, SyncSimpleTransforms, PropagateTransforms);
    // app.add_systems(PostUpdate, SyncSimpleTransforms, PropagateTransforms);
  }
}
