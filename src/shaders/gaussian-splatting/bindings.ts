export default /* wgsl */ `
#define_import_path gaussian_splatting::bindings

#import render::globals::Globals
#import render::view::View

@group(0) @binding(0) var<uniform> view: View;

// #define SH_COEFF_COUNT 4

struct GaussianUniforms {
    global_transform: mat4x4<f32>,
    global_scale: f32,
    count: f32,
    count_root_ceil: f32,
};

@group(0) @binding(1) var<uniform> gaussian_uniforms: GaussianUniforms;
@group(2) @binding(0) var<storage, read> position_visibility: array<vec4<f32>>;
@group(2) @binding(1) var<storage, read> spherical_harmonics: array<array<f32, 4>>;
@group(2) @binding(2) var<storage, read> rotation: array<vec4<f32>>;
@group(2) @binding(3) var<storage, read> scale_opacity: array<vec4<f32>>;

struct Entry {
    key: f32,
    value: f32,
}
`;
