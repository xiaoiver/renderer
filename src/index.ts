import { PluginType } from './Plugin';
import {
  TransformPlugin,
  RendererPlugin,
  HierarchyPlugin,
  CameraPlugin,
  CorePipeline,
  EventPlugin,
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
export { Commands } from './commands/Commands';

export const DefaultPlugins: PluginType[] = [
  TransformPlugin,
  HierarchyPlugin,
  CameraPlugin,
  CorePipeline,
  RendererPlugin,
  EventPlugin,
];
