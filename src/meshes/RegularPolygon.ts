import { Box } from './Box';
import { Mesh, ToMesh } from './Mesh';

export class RegularPolygon implements ToMesh {
  constructor(public size: number = 1) {}

  toMesh(): Mesh {
    return new Box(this.size, this.size, this.size).toMesh();
  }
}
