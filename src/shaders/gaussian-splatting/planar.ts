export default /* wgsl */ `
#define_import_path gaussian_splatting::planar

#import gaussian_splatting::bindings::{
    position_visibility,
    spherical_harmonics,
    rotation,
    scale_opacity,
}

#import gaussian_splatting::spherical_harmonics::{
    spherical_harmonics_lookup,
    srgb_to_linear,
}

// #define SH_COEFF_COUNT 4
// #define HALF_SH_COEFF_COUNT 2

fn get_color(
    index: u32,
    ray_direction: vec3<f32>,
) -> vec3<f32> {
    let sh = get_spherical_harmonics(index);
    let color = spherical_harmonics_lookup(ray_direction, sh);
    return srgb_to_linear(color);
}

fn get_position(index: u32) -> vec3<f32> {
    return position_visibility[index].xyz;
}

fn get_spherical_harmonics(index: u32) -> array<f32, 4> {
    return spherical_harmonics[index];
}

fn get_rotation(index: u32) -> vec4<f32> {
    return rotation[index];
}

fn get_scale(index: u32) -> vec3<f32> {
    return scale_opacity[index].xyz;
}

fn get_opacity(index: u32) -> f32 {
    return scale_opacity[index].w;
}

fn get_visibility(index: u32) -> f32 {
    return position_visibility[index].w;
}
`;
