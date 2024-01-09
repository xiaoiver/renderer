import { PluginType } from './Plugin';
import {
  TransformPlugin,
  RendererPlugin,
  HierarchyPlugin,
  CorePipeline,
  InputPlugin,
  RenderPlugin,
} from './plugins';

export {
  component,
  field,
  Type,
  World,
  System,
  system,
} from '@lastolivegames/becsy';
export type { Entity } from '@lastolivegames/becsy';
export { App } from './App';
export * from './components';
export * from './meshes';
export * from './systems';
export * from './math';
export * from './plugins';
export { Commands } from './commands/Commands';

/**
 * This plugin group will add all the default plugins for an application:
 * * `TransformPlugin`
 * * `HierarchyPlugin`
 * * `RenderPlugin`
 * * `CorePipelinePlugin`
 * * `PbrPlugin`
 */
export const DefaultPlugins: PluginType[] = [
  TransformPlugin,
  HierarchyPlugin,
  RenderPlugin,
  CorePipeline,
  RendererPlugin,
  InputPlugin,
];
