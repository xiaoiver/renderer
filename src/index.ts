import {
  TransformPlugin,
  RendererPlugin,
  HierarchyPlugin,
  CameraPlugin,
} from './plugins';

export {
  component,
  field,
  Type,
  World,
  System,
  system,
} from '@lastolivegames/becsy';
export { App } from './App';
export * from './components';
export * from './meshes';
export * from './systems';
export { Commands } from './commands/Commands';

export const DefaultPlugins = [
  new TransformPlugin(),
  new HierarchyPlugin(),
  new CameraPlugin(),
  new RendererPlugin(),
];
