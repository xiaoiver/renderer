import { PrimitiveTopology } from '@antv/g-device-api';
import { Mesh, ToMesh } from './Mesh';
import { Vec3 } from '../math';

/**
 * A torus (donut) shape.
 */
export class Torus implements ToMesh {
  constructor(
    public radius: number = 1,
    public ring_radius: number = 0.5,
    public subdivisions_segments: number = 32,
    public subdivisions_sides: number = 24,
  ) {}

  toMesh(): Mesh {
    // code adapted from http://apparat-engine.blogspot.com/2013/04/procedural-meshes-this.html
    // (source code at https://github.com/SEilers/Apparat)

    let n_vertices =
      (this.subdivisions_segments + 1) * (this.subdivisions_sides + 1);

    const positions: [number, number, number][] = [];
    const normals: [number, number, number][] = [];
    const uvs: [number, number][] = [];
    const indices: number[] = [];

    const segment_stride = (2.0 * Math.PI) / this.subdivisions_segments;
    const side_stride = (2.0 * Math.PI) / this.subdivisions_sides;

    for (let segment = 0; segment < this.subdivisions_segments; segment++) {
      const theta = segment_stride * segment;

      for (let side = 0; side < this.subdivisions_sides; side++) {
        const phi = side_stride * side;

        const position = new Vec3(
          Math.cos(theta) * (this.radius + this.ring_radius * Math.cos(phi)),
          this.ring_radius * Math.sin(phi),
          Math.sin(theta) * (this.radius + this.ring_radius * Math.cos(phi)),
        );

        const center = new Vec3(
          this.radius * Math.cos(theta),
          0,
          this.radius * Math.sin(theta),
        );
        const normal = position.sub(center).normalize();

        positions.push(position.to_array());
        normals.push(normal.to_array());
        uvs.push([
          segment / this.subdivisions_segments,
          side / this.subdivisions_sides,
        ]);
      }
    }

    // let n_faces = this.subdivisions_segments * this.subdivisions_sides;
    // let n_triangles = n_faces * 2;
    // let n_indices = n_triangles * 3;

    const n_vertices_per_row = this.subdivisions_sides + 1;
    for (let segment = 0; segment < this.subdivisions_segments; segment++) {
      for (let side = 0; side < this.subdivisions_sides; side++) {
        const lt = side + segment * n_vertices_per_row;
        const rt = side + 1 + segment * n_vertices_per_row;

        const lb = side + (segment + 1) * n_vertices_per_row;
        const rb = side + 1 + (segment + 1) * n_vertices_per_row;

        indices.push(lt);
        indices.push(rt);
        indices.push(lb);

        indices.push(rt);
        indices.push(rb);
        indices.push(lb);
      }
    }

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs)
      .with_indices(indices);
  }
}
