import { Entity, field } from '@lastolivegames/becsy';
import { Color } from '../render';
import { GlobalTransform } from '../transform';
import { CascadeShadowConfig } from './CascadeShadowConfig';
import { Cascade } from './Cascades';

export class ExtractedDirectionalLight {
  @field.object declare color: Color;
  @field.float32 declare illuminance: number;
  @field.boolean declare shadows_enabled: boolean;
  @field.float32 declare shadow_depth_bias: number;
  @field.float32 declare shadow_normal_bias: number;
  @field.object declare transform: GlobalTransform;
  @field.object declare cascade_shadow_config: CascadeShadowConfig;
  @field.object declare cascades: Map<Entity, Cascade[]>;
}
