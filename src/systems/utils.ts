import { Device } from '@antv/g-device-api';

export function defineStr(k: string, v: string): string {
  return `#define ${k} ${v}`;
}

interface ProgramDescriptor {
  vertex?: {
    glsl?: string;
    wgsl?: string;
    entryPoint?: string;
    defines?: boolean;
  };
  fragment?: {
    glsl?: string;
    wgsl?: string;
    entryPoint?: string;
    defines?: boolean;
  };
  compute?: {
    wgsl: string;
    entryPoint?: string;
    defines?: boolean;
  };
}

export function createProgram(
  device: Device,
  desc: ProgramDescriptor,
  defines: Record<string, boolean | number>,
) {
  const compiler = device['WGSLComposer'];

  // Prepend defines.
  const prefix =
    Object.keys(defines)
      .map((key) => {
        return defineStr(key, '');
      })
      .join('\n') + '\n';

  Object.keys(desc).forEach((key) => {
    if (desc[key].defines) {
      desc[key].wgsl = prefix + desc[key].wgsl;
    }
    // Use naga-oil to combine shaders.
    desc[key].wgsl = compiler.wgsl_compile(desc[key].wgsl);
  });

  return device.createProgram(desc);
}
