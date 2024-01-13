import { System, component } from '@lastolivegames/becsy';
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

/**
 * Set enum for the systems relating to transform propagation
 */
export namespace TransformSystems {
  /**
   * Propagates changes in transform to children's [`GlobalTransform`]
   */
  export const TransformPropagate = System.group();
}

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
