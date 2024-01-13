import { System, component } from '@lastolivegames/becsy';
import { App } from '../../App';
import { Plugin } from '../../Plugin';
import {
  CascadesFrusta,
  CubemapFrusta,
  Frustum,
  Aabb,
  Color,
} from '../../components';
import { CameraPlugin } from './Camera';
import { ViewPlugin } from './View';

/// The labels of the default App rendering sets.
///
/// The sets run in the order listed, with [`apply_deferred`] inserted between each set.
///
/// The `*Flush` sets are assigned to the copy of [`apply_deferred`]
/// that runs immediately after the matching system set.
/// These can be useful for ordering, but you almost never want to add your systems to these sets.
export namespace RenderSet {
  /// The copy of [`apply_deferred`] that runs at the beginning of this schedule.
  /// This is used for applying the commands from the [`ExtractSchedule`]
  export const ExtractCommands = System.group();
  /// Prepare assets that have been created/modified/removed this frame.
  export const PrepareAssets = System.group();
  /// Create any additional views such as those used for shadow mapping.
  export const ManageViews = System.group();
  /// The copy of [`apply_deferred`] that runs immediately after [`ManageViews`](RenderSet::ManageViews).
  export const ManageViewsFlush = System.group();
  /// Queue drawable entities as phase items in [`RenderPhase`](crate::render_phase::RenderPhase)s
  /// ready for sorting
  export const Queue = System.group();
  /// A sub-set within [`Queue`](RenderSet::Queue) where mesh entity queue systems are executed. Ensures `prepare_assets::<Mesh>` is completed.
  export const QueueMeshes = System.group();
  // TODO: This could probably be moved in favor of a system ordering abstraction in `Render` or `Queue`
  /// Sort the [`RenderPhases`](render_phase::RenderPhase) here.
  export const PhaseSort = System.group();
  /// Prepare render resources from extracted data for the GPU based on their sorted order.
  /// Create [`BindGroups`](crate::render_resource::BindGroup) that depend on those data.
  export const Prepare = System.group();
  /// A sub-set within [`Prepare`](RenderSet::Prepare) for initializing buffers, textures and uniforms for use in bind groups.
  export const PrepareResources = System.group();
  /// The copy of [`apply_deferred`] that runs between [`PrepareResources`](RenderSet::PrepareResources) and ['PrepareBindGroups'](RenderSet::PrepareBindGroups).
  export const PrepareResourcesFlush = System.group();
  /// A sub-set within [`Prepare`](RenderSet::Prepare) for constructing bind groups, or other data that relies on render resources prepared in [`PrepareResources`](RenderSet::PrepareResources).
  export const PrepareBindGroups = System.group();
  /// The copy of [`apply_deferred`] that runs immediately after [`Prepare`](RenderSet::Prepare).
  export const PrepareFlush = System.group();
  /// Actual rendering happens here.
  /// In most cases, only the render backend should insert resources here.
  export const Render = System.group();
  /// The copy of [`apply_deferred`] that runs immediately after [`Render`](RenderSet::Render).
  export const RenderFlush = System.group();
  /// Cleanup render resources here.
  export const Cleanup = System.group();
  /// The copy of [`apply_deferred`] that runs immediately after [`Cleanup`](RenderSet::Cleanup).
  export const CleanupFlush = System.group();
}

/**
 * bevy_render
 */
export class RenderPlugin implements Plugin {
  async build(app: App) {
    // component(Color);
    component(Frustum);
    component(CascadesFrusta);
    component(CubemapFrusta);
    component(Aabb);

    await new CameraPlugin().build(app);
    await new ViewPlugin().build(app);
  }
}
