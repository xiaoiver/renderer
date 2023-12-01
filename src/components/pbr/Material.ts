import { field } from '@lastolivegames/becsy';
import mesh_shader from '../../shaders/mesh/mesh.wgsl?raw';

/**
 * Mesh Material
 */
export class Material {
  @field.object declare vertex_shader: string;

  @field.object declare fragment_shader: string;

  constructor(
    options?: Partial<{ vertex_shader: string; fragment_shader: string }>,
  ) {
    const { vertex_shader = mesh_shader, fragment_shader = mesh_shader } =
      options || {};

    this.vertex_shader = vertex_shader;
    this.fragment_shader = fragment_shader;
  }
}
