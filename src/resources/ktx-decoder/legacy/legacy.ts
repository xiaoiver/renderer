import { KTX2Decoder } from '../index';

const globalObject =
  // @ts-ignore
  typeof global !== 'undefined'
    ? // @ts-ignore
      global
    : typeof window !== 'undefined'
    ? window
    : undefined;
if (typeof globalObject !== 'undefined') {
  (<any>globalObject).KTX2DECODER = KTX2Decoder;
}

export * from '../index';
