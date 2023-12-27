// import { PrimitiveTopology } from '@antv/g-device-api';
// import { Mesh, ToMesh } from './Mesh';

// /**
//  * A sphere made from a subdivided Icosahedron.
//  */
// export class Icosphere implements ToMesh {
//   constructor(
//     /// The radius of the sphere.
//     public radius: number = 1,
//     /// The number of subdivisions applied.
//     public subdivisions: number = 5,
//   ) {}

//   toMesh(): Mesh {
//     if (this.subdivisions >= 80) {
//       /*
//         Number of triangles:
//         N = 20

//         Number of edges:
//         E = 30

//         Number of vertices:
//         V = 12

//         Number of points within a triangle (triangular numbers):
//         inner(s) = (s^2 + s) / 2

//         Number of points on an edge:
//         edges(s) = s

//         Add up all vertices on the surface:
//         vertices(s) = edges(s) * E + inner(s - 1) * N + V

//         Expand and simplify. Notice that the triangular number formula has roots at -1, and 0, so translating it one to the right fixes it.
//         subdivisions(s) = 30s + 20((s^2 - 2s + 1 + s - 1) / 2) + 12
//         subdivisions(s) = 30s + 10s^2 - 10s + 12
//         subdivisions(s) = 10(s^2 + 2s) + 12

//         Factor an (s + 1) term to simplify in terms of calculation
//         subdivisions(s) = 10(s + 1)^2 + 12 - 10
//         resulting_vertices(s) = 10(s + 1)^2 + 2
//       */
//       const temp = this.subdivisions + 1;
//       const number_of_resulting_points = temp * temp * 10 + 2;
//       throw new Error(`Too many subdivisions: ${this.subdivisions} resulting in ${number_of_resulting_points} vertices`));
//     }

//     // let generated = new IcoSphere(this.subdivisions, |point| {
//     //   let inclination = point.y.acos();
//     //   let azimuth = point.z.atan2(point.x);

//     //   let norm_inclination = inclination / std::f32::consts::PI;
//     //   let norm_azimuth = 0.5 - (azimuth / std::f32::consts::TAU);

//     //   [norm_azimuth, norm_inclination]
//     // });

//     // let raw_points = generated.raw_points();

//     // let points = raw_points
//     //     .iter()
//     //     .map(|&p| (p * sphere.radius).into())
//     //     .collect::<Vec<[f32; 3]>>();

//     // let normals = raw_points
//     //     .iter()
//     //     .copied()
//     //     .map(Into::into)
//     //     .collect::<Vec<[f32; 3]>>();

//     // let uvs = generated.raw_data().to_owned();

//     // let mut indices = Vec::with_capacity(generated.indices_per_main_triangle() * 20);

//     // for i in 0..20 {
//     //     generated.get_indices(i, &mut indices);
//     // }

//     // let indices = Indices::U32(indices);

//     // return new Mesh(PrimitiveTopology.TRIANGLES)
//     //   .with_inserted_attribute(Mesh.ATTRIBUTE_POSITION, positions)
//     //   .with_inserted_attribute(Mesh.ATTRIBUTE_NORMAL, normals)
//     //   .with_inserted_attribute(Mesh.ATTRIBUTE_UV_0, uvs)
//     //   .with_indices(indices);
//   }
// }
