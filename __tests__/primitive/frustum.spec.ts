import { Vec4 } from '../../src/math/Vec4';
import { Frustum } from '../../src/components/primitive/Frustum';
import { HalfSpace } from '../../src/components/primitive/HalfSpace';
import { Sphere } from '../../src/components/primitive/Sphere';
import { Vec3 } from '../../src/math/Vec3';

function big_frustum() {
  return new Frustum([
    new HalfSpace(new Vec4(-0.9701, -0.2425, -0.0, 7.7611)),
    new HalfSpace(new Vec4(-0.0, 1.0, -0.0, 4.0)),
    new HalfSpace(new Vec4(-0.0, -0.2425, -0.9701, 2.9104)),
    new HalfSpace(new Vec4(-0.0, -1.0, -0.0, 4.0)),
    new HalfSpace(new Vec4(-0.0, -0.2425, 0.9701, 2.9104)),
    new HalfSpace(new Vec4(0.9701, -0.2425, -0.0, -1.9403)),
  ]);
}

describe('Frustum', () => {
  it('intersects_sphere_big_frustum_outside', () => {
    const frustum = big_frustum();
    let sphere = new Sphere(new Vec3(0.9167, 0.0, 0.0), 0.75);

    expect(frustum.intersects_sphere(sphere, true)).toBe(false);
  });

  it('intersects_sphere_big_frustum_intersect', () => {
    const frustum = big_frustum();
    let sphere = new Sphere(new Vec3(7.9288, 0.0, 2.9728), 2);

    expect(frustum.intersects_sphere(sphere, true)).toBe(true);
  });
});
