import { Vec3 } from '../../src/math/Vec3';

describe('Math', () => {
  it('Vec3', () => {
    const v1 = Vec3.ZERO;
    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);
    expect(v1.z).toBe(0);

    const v2 = new Vec3(1, 2, 3);
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(3);
  });
});
