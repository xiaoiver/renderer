import { field } from '@lastolivegames/becsy';
import { Frustum } from './Frustum';

export class CubemapFrusta {
  @field.object declare frusta: [
    Frustum,
    Frustum,
    Frustum,
    Frustum,
    Frustum,
    Frustum,
  ];
}
