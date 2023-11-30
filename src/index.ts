import {
  TransformPlugin,
  RendererPlugin,
  HierarchyPlugin,
  CameraPlugin,
} from './plugins';

export { component, field, Type, World } from '@lastolivegames/becsy';
export { App } from './App';
export * from './System';
export * from './components';

export const DefaultPlugins = [
  new TransformPlugin(),
  new CameraPlugin(),
  new HierarchyPlugin(),
  new RendererPlugin(),
];
