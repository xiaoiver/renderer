#define_import_path pbr::mesh_view_bindings

#import render::{
    view::View,
}

@group(0) @binding(0) var<uniform> view: View;