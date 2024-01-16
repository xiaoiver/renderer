import { Mesh } from '../../meshes/Mesh';
import { Bundle } from '../Bundle';
import { InheritedVisibility, ViewVisibility, Visibility } from '../render';
import { Transform } from '../transform/Transform';
import { Material } from './Material';

/**
 * A component bundle for PBR entities with a [`Mesh`] and a [`StandardMaterial`].
 */
export class PbrBundle extends Bundle {
  mesh: Mesh;
  material: Material;
  transform: Transform;
  /**
   * User indication of whether an entity is visible
   */
  visibility: Visibility;
  /**
   * Inherited visibility of an entity.
   */
  inherited_visibility: InheritedVisibility;
  /**
   * Algorithmically-computed indication of whether an entity is visible and should be extracted for rendering
   */
  view_visibility: ViewVisibility;

  constructor(
    options?: Partial<{
      mesh: Mesh;
      material: Material;
      transform: Transform;
      visibility: Visibility;
      inherited_visibility: InheritedVisibility;
      view_visibility: ViewVisibility;
    }>,
  ) {
    super();

    const {
      mesh,
      material,
      transform,
      visibility = new Visibility(),
      inherited_visibility = new InheritedVisibility(),
      view_visibility = new ViewVisibility(),
    } = options || {};
    this.mesh = mesh;
    this.material = material;
    this.transform = transform;
    this.visibility = visibility;
    this.inherited_visibility = inherited_visibility;
    this.view_visibility = view_visibility;
  }
}
