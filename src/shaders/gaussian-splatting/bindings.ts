export default /* wgsl */ `
#define_import_path gaussian_splatting::bindings

#import render::globals::Globals
#import render::view::View

@group(0) @binding(0) var<uniform> view: View;
// @group(0) @binding(1) var<uniform> globals: Globals;

struct GaussianUniforms {
    global_transform: mat4x4<f32>,
    global_scale: f32,
    count: u32,
    count_root_ceil: u32,
};
@group(1) @binding(0) var<uniform> gaussian_uniforms: GaussianUniforms;
`;
