import { field } from '@lastolivegames/becsy';
import { Camera } from './Camera';
import { Transform } from '../transform/Transform';
import { GlobalTransform } from '../transform/GlobalTransform';
import { Projection } from './Projection';

export class Camera3dBundle {
  @field.object declare camera: Camera;

  @field.object declare projection: typeof Projection;

  @field.object declare transform: Transform;

  @field.object declare global_transform: GlobalTransform;

  // @field.object declare tonemapping: Tonemapping;
}
