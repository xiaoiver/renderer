import { Vec3 } from '../../math';

type TriangleContents =
  | TriangleContents.None
  | TriangleContents.One
  | TriangleContents.Three
  | TriangleContents.Six
  | TriangleContents.More;
namespace TriangleContents {
  /**
   * Creates a `None` variant.
   */
  export function none() {
    return new None();
  }

  //   export function one(points: number) {
  //     return new One(points += 1);
  //   }

  //   export function calculate_one(
  //     ab: number[],
  //     bc: number[],
  //     points: &mut [Vec3A],
  //     shape: BaseShape,
  // ) {
  //     assert_eq!(ab.len(), bc.len());
  //     assert_eq!(ab.len(), 2);
  //     match self {
  //         TriangleContents::One(idx) => {
  //             let p1 = points[ab[0]];
  //             let p2 = points[bc[1]];

  //             points[*idx as usize] = shape.interpolate_half(p1, p2);
  //         }
  //         _ => panic!("Did not find One variant."),
  //     }
  // }

  /**
   * Nothing inside the triangle: subdivisions 0 and 1
   */
  export class None {}

  /**
   * One point inside the triangle: subdivision 2
   */
  export class One {
    constructor(public value: number) {}
  }

  /**
   * Three points inside the triangle: subdivision 3
   */
  export class Three {
    constructor(public a: number, public b: number, public c: number) {}
  }

  /**
   * Six points inside the triangle: subdivision 4
   */
  export class Six {
    constructor(
      public a: number,
      public b: number,
      public c: number,
      public ab: boolean,
      public bc: boolean,
      public ca: boolean,
    ) {}
  }

  export class More {
    constructor(
      public a: number,
      public b: number,
      public c: number,
      // Separated into three `my_side_length` segments
      // to save on extra allocations.
      public sides: number[],
      public my_side_length: number,
      ///
      /// Contents of the inner triangle.
      ///
      // Implementing this as a `Vec<TriangleContents>` would
      // probably be a perf. improvement someday, however not
      // something worth implementing right now.
      public contents: TriangleContents,
    ) {}
  }
}

class Triangle {
  constructor(
    public a: number = 0,
    public b: number = 0,
    public c: number = 0,
    public ab_edge: number = 0,
    public bc_edge: number = 0,
    public ca_edge: number = 0,
    public ab_forward: boolean = false,
    public bc_forward: boolean = false,
    public ca_forward: boolean = false,
    public contents: TriangleContents = new TriangleContents.None(),
  ) {}
}

export abstract class BaseShape {
  ///
  /// The initial vertices for the triangle. Note that
  /// `Vec3A::new` is not a `const fn()`, hence I recommend
  /// you use `lazy_static`. Check the source file for this
  /// crate and look for the constants module at the bottom
  /// for an example.
  ///
  /// Constraints on the points depend on the interpolation
  /// function used:
  /// - `slerp` requires normalized (magnitude 1) data.
  /// - `lerp` doesn't care.
  /// - `normalized_lerp` requires normalized (magnitude 1)
  /// data.
  ///
  abstract initial_points(): Vec3[];
}
