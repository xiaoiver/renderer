#define_import_path pbr::mesh_functions

#import pbr::{
    mesh_view_bindings::view,
    mesh_bindings::mesh,
    mesh_types::MESH_FLAGS_SIGN_DETERMINANT_MODEL_3X3_BIT,
    view_transformations::position_world_to_clip,
}

#import render::{
    maths::{affine_to_square, mat2x4_f32_to_mat3x3_unpack},
}

// fn get_model_matrix(instance_index: u32) -> mat4x4<f32> {
//     return affine_to_square(mesh[instance_index].model);
// }

fn mesh_position_local_to_world(model: mat4x4<f32>, vertex_position: vec4<f32>) -> vec4<f32> {
    return model * vertex_position;
}
