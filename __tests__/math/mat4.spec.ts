import { to_radians } from '../../src/components/render/utils';
import { Vec3 } from '../../src/math/Vec3';
import { Mat4 } from '../../src/math/Mat4';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('Mat4', () => {
  it('inverse', () => {
    const inv = Mat4.IDENTITY.inverse();
    expect(inv).toMatchCloseTo(Mat4.IDENTITY);

    const rotz = Mat4.from_rotation_z(to_radians(90.0));
    let rotz_inv = rotz.inverse();
    expect(Mat4.IDENTITY).toMatchCloseTo(rotz.mul(rotz_inv));
    expect(Mat4.IDENTITY).toMatchCloseTo(rotz_inv.mul(rotz));

    let trans = Mat4.from_translation(new Vec3(1.0, 2.0, 3.0));
    let trans_inv = trans.inverse();
    // assert_ne!(None, trans_inv);
    // let trans_inv = trans_inv.unwrap();
    expect(Mat4.IDENTITY).toMatchCloseTo(trans.mul(trans_inv));
    expect(Mat4.IDENTITY).toMatchCloseTo(trans_inv.mul(trans));
  });
});
