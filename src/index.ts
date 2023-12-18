import { PluginType } from './Plugin';
import {
  TransformPlugin,
  RendererPlugin,
  HierarchyPlugin,
  CameraPlugin,
  CorePipeline,
  InputPlugin,
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

export const DefaultPlugins: PluginType[] = [
  TransformPlugin,
  HierarchyPlugin,
  CameraPlugin,
  CorePipeline,
  RendererPlugin,
  InputPlugin,
];
