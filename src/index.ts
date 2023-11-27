import { TransformPlugin, RendererPlugin, HierarchyPlugin } from './plugins';

export { component, field, Type, World, System } from '@lastolivegames/becsy';
export { App } from './App';
export {
  Renderable,
  Transform,
  TransformBundle,
  Children,
  Parent,
} from './components';

export const DefaultPlugins = [
  new TransformPlugin(),
  new HierarchyPlugin(),
  new RendererPlugin(),
];
