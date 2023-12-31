import { Bundle } from '../Bundle';
import { CascadesFrusta } from '../primitive';
import { Transform } from '../transform';
import { CascadeShadowConfig } from './CascadeShadowConfig';
import { Cascades } from './Cascades';
import { DirectionalLight } from './DirectionalLight';

export class DirectionalLightBundle extends Bundle {
  directional_light: DirectionalLight;
  frusta: CascadesFrusta;
  cascades: Cascades;
  cascade_shadow_config: CascadeShadowConfig;
  // pub visible_entities: CascadesVisibleEntities,
  transform: Transform;
  // /// Enables or disables the light
  // pub visibility: Visibility,
  // /// Inherited visibility of an entity.
  // pub inherited_visibility: InheritedVisibility,
  // /// Algorithmically-computed indication of whether an entity is visible and should be extracted for rendering
  // pub view_visibility: ViewVisibility,

  constructor(
    options?: Partial<{
      directional_light: DirectionalLight;
      frusta: CascadesFrusta;
      cascades: Cascades;
      cascade_shadow_config: CascadeShadowConfig;
      // visible_entities: CascadesVisibleEntities,
      transform: Transform;
      // visibility: Visibility,
      // inherited_visibility: InheritedVisibility,
      // view_visibility: ViewVisibility,
    }>,
  ) {
    super();

    const {
      directional_light = new DirectionalLight(),
      frusta = new CascadesFrusta(),
      cascades = new Cascades(),
      cascade_shadow_config = new CascadeShadowConfig(),
      // visible_entities = new CascadesVisibleEntities(),
      transform,
      // visibility = new Visibility(),
      // inherited_visibility = new InheritedVisibility(),
      // view_visibility = new ViewVisibility(),
    } = options || {};

    this.directional_light = directional_light;
    this.frusta = frusta;
    this.cascades = cascades;
    this.cascade_shadow_config = cascade_shadow_config;
    // this.visible_entities = visible_entities;
    this.transform = transform;
    // this.visibility = visibility;
    // this.inherited_visibility = inherited_visibility;
    // this.view_visibility = view_visibility;
  }
}
