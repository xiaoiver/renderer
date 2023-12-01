import { Mesh } from '../../meshes/Mesh';
import { Bundle } from '../Bundle';
import { Transform } from '../transform/Transform';
import { Material } from './Material';

export class PbrBundle extends Bundle {
  mesh: Mesh;

  material: Material;

  transform: Transform;

  constructor(
    options?: Partial<{
      mesh: Mesh;

      material: Material;

      transform: Transform;
    }>,
  ) {
    super();

    const { mesh, material, transform } = options || {};

    this.mesh = mesh;
    this.material = material;
    this.transform = transform;
  }
}
