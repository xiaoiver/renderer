import { PrimitiveTopology } from '@antv/g-device-api';
import { Mesh, ToMesh } from './Mesh';

/**
 * A cylinder which stands on the XZ plane
 */
export class Cylinder implements ToMesh {
  constructor(
    /**
     * Radius in the XZ plane.
     */
    public radius: number = 0.5,
    /**
     * Height of the cylinder in the Y axis.
     */
    public height: number = 1.0,
    /**
     * The number of vertices around each horizontal slice of the cylinder.
     * If you are looking at the cylinder from above, this is the number of points you will see on the circle.
     * A higher number will make it appear more circular.
     */
    public resolution: number = 16,
    /** The number of segments between the two ends. Setting this to 1 will have triangles spanning the full height of the cylinder.
     * Setting it to 2 will have two sets of triangles with a horizontal slice in the middle of cylinder.
     * Greater numbers increase triangles/slices in the same way.
     */
    public segments: number = 1,
  ) {}

  toMesh(): Mesh {
    const num_rings = this.segments + 1;
    const num_vertices =
      this.resolution * 2 + num_rings * (this.resolution + 1);
    const num_faces = this.resolution * (num_rings - 2);
    const num_indices = (2 * num_faces + 2 * (this.resolution - 1) * 2) * 3;

    const positions: [number, number, number][] = [];
    const normals: [number, number, number][] = [];
    const uvs: [number, number][] = [];
    const indices: number[] = [];

    /// Tau: The full circle constant (τ)
    /// Equal to 2π.
    const step_theta = (Math.PI * 2) / this.resolution;
    const step_y = this.height / this.segments;

    // rings
    for (let ring = 0; ring < num_rings; ring++) {
      const y = -this.height / 2.0 + ring * step_y;

      for (let segment = 0; segment < this.resolution; segment++) {
        const theta = segment * step_theta;
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        positions.push([this.radius * cos, y, this.radius * sin]);
        normals.push([cos, 0, sin]);
        uvs.push([segment / this.resolution, ring / this.segments]);
      }
    }

    // barrel skin

    for (let i = 0; i < this.segments; i++) {
      const ring = i * (this.resolution + 1);
      const next_ring = (i + 1) * (this.resolution + 1);

      for (let j = 0; j < this.resolution; j++) {
        indices.push(
          ring + j,
          next_ring + j,
          ring + j + 1,
          next_ring + j,
          next_ring + j + 1,
          ring + j + 1,
        );
      }
    }

    // caps
    const build_cap = (top: boolean) => {
      let offset = positions.length;
      let [y, normal_y, winding] = top
        ? [this.height / 2, 1, [1, 0]]
        : [this.height / -2, -1, [0, 1]];
      for (let i = 0; i < this.resolution; i++) {
        const theta = i * step_theta;
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        positions.push([cos * this.radius, y, sin * this.radius]);
        normals.push([0.0, normal_y, 0.0]);
        uvs.push([0.5 * (cos + 1.0), 1.0 - 0.5 * (sin + 1.0)]);
      }

      for (let i = 1; i < this.resolution - 1; i++) {
        indices.push(offset, offset + i + winding[0], offset + i + winding[1]);
      }
    };

    // top

    build_cap(true);
    build_cap(false);

    return new Mesh(PrimitiveTopology.TRIANGLES)
      .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
      .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
      .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs)
      .with_indices(indices);
  }
}
