import { field } from '@lastolivegames/becsy';
import { CullMode } from '@antv/g-device-api';
import mesh_shader from '../../shaders/mesh/mesh.wgsl?raw';
import mesh_pbr_shader from '../../shaders/pbr/pbr.wgsl?raw';
import { Color } from '../render';
import { AlphaMode } from './Alpha';
import { count_ones } from '../render/utils';

/**
 * Mesh Material
 */
export class Material {
  @field.object declare vertex_shader: string;

  @field.object declare fragment_shader: string;

  /**
   * The color of the surface of the material before lighting.
   *
   * Doubles as diffuse albedo for non-metallic, specular for metallic and a mix for everything
   * in between. If used together with a `base_color_texture`, this is factored into the final
   * base color as `base_color * base_color_texture_value`
   *
   * Defaults to [`Color.WHITE`].
   */
  @field.object declare base_color: Color;

  /**
   * The texture component of the material's color before lighting.
   * The actual pre-lighting color is `base_color * this_texture`.
   *
   * You should set `base_color` to [`Color::WHITE`] (the default) if you want the texture to show as-is.
   *
   * Setting `base_color` to something else than white will tint the texture.
   * For example, setting `base_color` to pure red will tint the texture red.
   */
  @field.object declare base_color_texture: HTMLImageElement | ImageBitmap;

  /**
   * Use a color for user friendliness even though we technically don't use the alpha channel
   * Might be used in the future for exposure correction in HDR
   * Color the material "emits" to the camera.
   *
   * This is typically used for monitor screens or LED lights.
   * Anything that can be visible even in darkness.
   *
   * The emissive color is added to what would otherwise be the material's visible color.
   * This means that for a light emissive value, in darkness,
   * you will mostly see the emissive component.
   *
   * The default emissive color is black, which doesn't add anything to the material color.
   *
   * Note that **an emissive material won't light up surrounding areas like a light source**,
   * it just adds a value to the color seen on screen.
   */
  @field.object declare emissive: Color;

  /**
   * The emissive map, multiplies pixels with [`emissive`]
   * to get the final "emitting" color of a surface.
   *
   * This color is multiplied by [`emissive`] to get the final emitted color.
   * Meaning that you should set [`emissive`] to [`Color::WHITE`]
   * if you want to use the full range of color of the emissive texture.
   *
   * [`emissive`]: StandardMaterial::emissive
   */
  @field.object declare emissive_texture: HTMLImageElement | ImageBitmap;

  /**
   * Linear perceptual roughness, clamped to `[0.089, 1.0]` in the shader.
   *
   * Defaults to `0.5`.
   *
   * Low values result in a "glossy" material with specular highlights,
   * while values close to `1` result in rough materials.
   *
   * If used together with a roughness/metallic texture, this is factored into the final base
   * color as `roughness * roughness_texture_value`.
   *
   * 0.089 is the minimum floating point value that won't be rounded down to 0 in the
   * calculations used.
   *
   * Technically for 32-bit floats, 0.045 could be used.
   * @see https://google.github.io/filament/Filament.html#materialsystem/parameterization/
   */
  @field.float32 declare perceptual_roughness: number;

  /**
   * How "metallic" the material appears, within `[0.0, 1.0]`.
   *
   * This should be set to 0.0 for dielectric materials or 1.0 for metallic materials.
   * For a hybrid surface such as corroded metal, you may need to use in-between values.
   *
   * Defaults to `0.00`, for dielectric.
   *
   * If used together with a roughness/metallic texture, this is factored into the final base
   * color as `metallic * metallic_texture_value`.
   */
  @field.float32 declare metallic: number;

  /**
   * Metallic and roughness maps, stored as a single texture.
   *
   * The blue channel contains metallic values,
   * and the green channel contains the roughness values.
   * Other channels are unused.
   *
   * Those values are multiplied by the scalar ones of the material,
   * see [`metallic`] and [`perceptual_roughness`] for details.
   *
   * Note that with the default values of [`metallic`] and [`perceptual_roughness`],
   * setting this texture has no effect. If you want to exclusively use the
   * `metallic_roughness_texture` values for your material, make sure to set [`metallic`]
   * and [`perceptual_roughness`] to `1.0`.
   *
   * [`metallic`]: StandardMaterial::metallic
   * [`perceptual_roughness`]: StandardMaterial::perceptual_roughness
   */
  @field.object declare metallic_roughness_texture:
    | HTMLImageElement
    | ImageBitmap;

  /**
   * Specular intensity for non-metals on a linear scale of `[0.0, 1.0]`.
   *
   * Use the value as a way to control the intensity of the
   * specular highlight of the material, i.e. how reflective is the material,
   * rather than the physical property "reflectance."
   *
   * Set to `0.0`, no specular highlight is visible, the highlight is strongest
   * when `reflectance` is set to `1.0`.
   *
   * Defaults to `0.5` which is mapped to 4% reflectance in the shader.
   */
  @field.float32 declare reflectance: number;

  /**
   * The amount of light transmitted _diffusely_ through the material (i.e. “translucency”)
   *
   * Implemented as a second, flipped [Lambertian diffuse](https://en.wikipedia.org/wiki/Lambertian_reflectance) lobe,
   * which provides an inexpensive but plausible approximation of translucency for thin dieletric objects (e.g. paper,
   * leaves, some fabrics) or thicker volumetric materials with short scattering distances (e.g. porcelain, wax).
   *
   * For specular transmission usecases with refraction (e.g. glass) use the [`StandardMaterial::specular_transmission`] and
   * [`StandardMaterial::ior`] properties instead.
   *
   * - When set to `0.0` (the default) no diffuse light is transmitted;
   * - When set to `1.0` all diffuse light is transmitted through the material;
   * - Values higher than `0.5` will cause more diffuse light to be transmitted than reflected, resulting in a “darker”
   *   appearance on the side facing the light than the opposite side. (e.g. plant leaves)
   *
   * ## Notes
   *
   * - The material's [`StandardMaterial::base_color`] also modulates the transmitted light;
   * - To receive transmitted shadows on the diffuse transmission lobe (i.e. the “backside”) of the material,
   *   use the [`TransmittedShadowReceiver`] component.
   */
  @field.float32 declare diffuse_transmission: number;

  /**
   * A map that modulates diffuse transmission via its alpha channel. Multiplied by [`StandardMaterial::diffuse_transmission`]
   * to obtain the final result.
   *
   * **Important:** The [`StandardMaterial::diffuse_transmission`] property must be set to a value higher than 0.0,
   * or this texture won't have any effect.
   */
  @field.object declare diffuse_transmission_texture:
    | HTMLImageElement
    | ImageBitmap;

  /**
   * The amount of light transmitted _specularly_ through the material (i.e. via refraction)
   *
   * - When set to `0.0` (the default) no light is transmitted.
   * - When set to `1.0` all light is transmitted through the material.
   *
   * The material's [`StandardMaterial::base_color`] also modulates the transmitted light.
   *
   * **Note:** Typically used in conjunction with [`StandardMaterial::thickness`], [`StandardMaterial::ior`] and [`StandardMaterial::perceptual_roughness`].
   *
   * ## Performance
   *
   * Specular transmission is implemented as a relatively expensive screen-space effect that allows ocluded objects to be seen through the material,
   * with distortion and blur effects.
   *
   * - [`Camera3d::screen_space_specular_transmission_steps`](bevy_core_pipeline::core_3d::Camera3d::screen_space_specular_transmission_steps) can be used to enable transmissive objects
   * to be seen through other transmissive objects, at the cost of additional draw calls and texture copies; (Use with caution!)
   *     - If a simplified approximation of specular transmission using only environment map lighting is sufficient, consider setting
   * [`Camera3d::screen_space_specular_transmission_steps`](bevy_core_pipeline::core_3d::Camera3d::screen_space_specular_transmission_steps) to `0`.
   * - If purely diffuse light transmission is needed, (i.e. “translucency”) consider using [`StandardMaterial::diffuse_transmission`] instead,
   * for a much less expensive effect.
   * - Specular transmission is rendered before alpha blending, so any material with [`AlphaMode::Blend`], [`AlphaMode::Premultiplied`], [`AlphaMode::Add`] or [`AlphaMode::Multiply`]
   *   won't be visible through specular transmissive materials.
   */
  @field.float32 declare specular_transmission: number;

  /**
   * A map that modulates specular transmission via its red channel. Multiplied by [`StandardMaterial::specular_transmission`]
   * to obtain the final result.
   *
   * **Important:** The [`StandardMaterial::specular_transmission`] property must be set to a value higher than 0.0,
   * or this texture won't have any effect.
   */
  @field.object declare specular_transmission_texture:
    | HTMLImageElement
    | ImageBitmap;

  /**
   * Thickness of the volume beneath the material surface.
   *
   * When set to `0.0` (the default) the material appears as an infinitely-thin film,
   * transmitting light without distorting it.
   *
   * When set to any other value, the material distorts light like a thick lens.
   *
   * **Note:** Typically used in conjunction with [`StandardMaterial::specular_transmission`] and [`StandardMaterial::ior`], or with
   * [`StandardMaterial::diffuse_transmission`].
   */
  @field.float32 declare thickness: number;

  /**
   * A map that modulates thickness via its green channel. Multiplied by [`StandardMaterial::thickness`]
   * to obtain the final result.
   *
   * **Important:** The [`StandardMaterial::thickness`] property must be set to a value higher than 0.0,
   * or this texture won't have any effect.
   */
  @field.object declare thickness_texture: HTMLImageElement | ImageBitmap;

  /**
   * The [index of refraction](https://en.wikipedia.org/wiki/Refractive_index) of the material.
   *
   * Defaults to 1.5.
   *
   * | Material        | Index of Refraction  |
   * |:----------------|:---------------------|
   * | Vacuum          | 1                    |
   * | Air             | 1.00                 |
   * | Ice             | 1.31                 |
   * | Water           | 1.33                 |
   * | Eyes            | 1.38                 |
   * | Quartz          | 1.46                 |
   * | Olive Oil       | 1.47                 |
   * | Honey           | 1.49                 |
   * | Acrylic         | 1.49                 |
   * | Window Glass    | 1.52                 |
   * | Polycarbonate   | 1.58                 |
   * | Flint Glass     | 1.69                 |
   * | Ruby            | 1.71                 |
   * | Glycerine       | 1.74                 |
   * | Saphire         | 1.77                 |
   * | Cubic Zirconia  | 2.15                 |
   * | Diamond         | 2.42                 |
   * | Moissanite      | 2.65                 |
   *
   * **Note:** Typically used in conjunction with [`StandardMaterial::specular_transmission`] and [`StandardMaterial::thickness`].
   */
  @field.float32 declare ior: number;

  /**
   * How far, on average, light travels through the volume beneath the material's
   * surface before being absorbed.
   *
   * Defaults to [`f32::INFINITY`], i.e. light is never absorbed.
   *
   * **Note:** To have any effect, must be used in conjunction with:
   * - [`StandardMaterial::attenuation_color`];
   * - [`StandardMaterial::thickness`];
   * - [`StandardMaterial::diffuse_transmission`] or [`StandardMaterial::specular_transmission`].
   */
  @field.float32 declare attenuation_distance: number;

  /**
   * The resulting (non-absorbed) color after white light travels through the attenuation distance.
   *
   * Defaults to [`Color::WHITE`], i.e. no change.
   *
   * **Note:** To have any effect, must be used in conjunction with:
   * - [`StandardMaterial::attenuation_distance`];
   * - [`StandardMaterial::thickness`];
   * - [`StandardMaterial::diffuse_transmission`] or [`StandardMaterial::specular_transmission`].
   */
  @field.object declare attenuation_color: Color;
  /**
   * Used to fake the lighting of bumps and dents on a material.
   *
   * A typical usage would be faking cobblestones on a flat plane mesh in 3D.
   *
   * # Notes
   *
   * Normal mapping with `StandardMaterial` and the core bevy PBR shaders requires:
   * - A normal map texture
   * - Vertex UVs
   * - Vertex tangents
   * - Vertex normals
   *
   * Tangents do not have to be stored in your model,
   * they can be generated using the [`Mesh::generate_tangents`] or
   * [`Mesh::with_generated_tangents`] methods.
   * If your material has a normal map, but still renders as a flat surface,
   * make sure your meshes have their tangents set.
   *
   * [`Mesh::generate_tangents`]: bevy_render::mesh::Mesh::generate_tangents
   * [`Mesh::with_generated_tangents`]: bevy_render::mesh::Mesh::with_generated_tangents
   */
  @field.object declare normal_map_texture: HTMLImageElement | ImageBitmap;

  /**
   * Normal map textures authored for DirectX have their y-component flipped. Set this to flip
   * it to right-handed conventions.
   */
  @field.boolean declare flip_normal_map_y: boolean;

  /**
   * Specifies the level of exposure to ambient light.
   *
   * This is usually generated and stored automatically ("baked") by 3D-modelling software.
   *
   * Typically, steep concave parts of a model (such as the armpit of a shirt) are darker,
   * because they have little exposure to light.
   * An occlusion map specifies those parts of the model that light doesn't reach well.
   *
   * The material will be less lit in places where this texture is dark.
   * This is similar to ambient occlusion, but built into the model.
   */
  @field.object declare occlusion_texture: HTMLImageElement | ImageBitmap;

  /**
   * Support two-sided lighting by automatically flipping the normals for "back" faces
   * within the PBR lighting shader.
   *
   * Defaults to `false`.
   * This does not automatically configure backface culling,
   * which can be done via `cull_mode`.
   */
  @field.boolean declare double_sided: boolean;

  /**
   * Whether to cull the "front", "back" or neither side of a mesh.
   * If set to `None`, the two sides of the mesh are visible.
   */
  @field.uint8 declare cull_mode: CullMode;

  /**
   * Whether to apply only the base color to this material.
   *
   * Normals, occlusion textures, roughness, metallic, reflectance, emissive,
   * shadows, alpha mode and ambient light are ignored if this is set to `true`.
   */
  @field.boolean declare unlit: boolean;

  /**
   * Whether to enable fog for this material.
   *
   *  Defaults to `Some(Face::Back)`.
   */
  @field.boolean declare fog_enabled: boolean;

  /**
   * How to apply the alpha channel of the `base_color_texture`.
   *
   * See [`AlphaMode`] for details. Defaults to [`AlphaMode::Opaque`].
   */
  @field.object declare alpha_mode: AlphaMode;

  /**
   * Adjust rendered depth.
   *
   * A material with a positive depth bias will render closer to the
   * camera while negative values cause the material to render behind
   * other objects. This is independent of the viewport.
   *
   * `depth_bias` affects render ordering and depth write operations
   * using the `DepthBiasState.Constant` field.
   *
   * [z-fighting]: https://en.wikipedia.org/wiki/Z-fighting
   */
  @field.float32 declare depth_bias: number;

  /**
   * The depth map used for [parallax mapping].
   *
   * It is a greyscale image where white represents bottom and black the top.
   * If this field is set, bevy will apply [parallax mapping].
   * Parallax mapping, unlike simple normal maps, will move the texture
   * coordinate according to the current perspective,
   * giving actual depth to the texture.
   *
   * The visual result is similar to a displacement map,
   * but does not require additional geometry.
   *
   * Use the [`parallax_depth_scale`] field to control the depth of the parallax.
   *
   * ## Limitations
   *
   * - It will look weird on bent/non-planar surfaces.
   * - The depth of the pixel does not reflect its visual position, resulting
   *   in artifacts for depth-dependent features such as fog or SSAO.
   * - For the same reason, the geometry silhouette will always be
   *   the one of the actual geometry, not the parallaxed version, resulting
   *   in awkward looks on intersecting parallaxed surfaces.
   *
   * ## Performance
   *
   * Parallax mapping requires multiple texture lookups, proportional to
   * [`max_parallax_layer_count`], which might be costly.
   *
   * Use the [`parallax_mapping_method`] and [`max_parallax_layer_count`] fields
   * to tweak the shader, trading graphical quality for performance.
   *
   * To improve performance, set your `depth_map`'s [`Image::sampler`]
   * filter mode to `FilterMode::Nearest`, as [this paper] indicates, it improves
   * performance a bit.
   *
   * To reduce artifacts, avoid steep changes in depth, blurring the depth
   * map helps with this.
   *
   * Larger depth maps haves a disproportionate performance impact.
   *
   * [this paper]: https://www.diva-portal.org/smash/get/diva2:831762/FULLTEXT01.pdf
   * [parallax mapping]: https://en.wikipedia.org/wiki/Parallax_mapping
   * [`parallax_depth_scale`]: StandardMaterial::parallax_depth_scale
   * [`parallax_mapping_method`]: StandardMaterial::parallax_mapping_method
   * [`max_parallax_layer_count`]: StandardMaterial::max_parallax_layer_count
   */
  @field.object declare depth_map: HTMLImageElement | ImageBitmap;

  /**
   * How deep the offset introduced by the depth map should be.
   *
   * Default is `0.1`, anything over that value may look distorted.
   * Lower values lessen the effect.
   *
   * The depth is relative to texture size. This means that if your texture
   * occupies a surface of `1` world unit, and `parallax_depth_scale` is `0.1`, then
   * the in-world depth will be of `0.1` world units.
   * If the texture stretches for `10` world units, then the final depth
   * will be of `1` world unit.
   */
  @field.float32 declare parallax_depth_scale: number;

  /**
  * Which parallax mapping method to use.
  *
  * We recommend that all objects use the same [`ParallaxMappingMethod`], to avoid
  * duplicating and running two shaders.
  // pub parallax_mapping_method: ParallaxMappingMethod,

  * In how many layers to split the depth maps for parallax mapping.
  *
  * If you are seeing jaggy edges, increase this value.
  * However, this incurs a performance cost.
  *
  * Dependent on the situation, switching to [`ParallaxMappingMethod::Relief`]
  * and keeping this value low might have better performance than increasing the
  * layer count while using [`ParallaxMappingMethod::Occlusion`].
  *
  * Default is `16.0`.
  */
  @field.float32 declare max_parallax_layer_count: number;

  /**
   * Render method used for opaque materials. (Where `alpha_mode` is [`AlphaMode::Opaque`] or [`AlphaMode::Mask`])
   */
  @field.uint8 declare opaque_render_method: number;

  /**
   * Used for selecting the deferred lighting pass for deferred materials.
   * Default is [`DEFAULT_PBR_DEFERRED_LIGHTING_PASS_ID`] for default
   * PBR deferred lighting pass. Ignored in the case of forward materials.
   */
  @field.uint8 declare deferred_lighting_pass_id: number;

  constructor(
    options?: Partial<{
      vertex_shader: string;
      fragment_shader: string;
      base_color: Color;
      base_color_texture: HTMLImageElement | ImageBitmap;
      emissive: Color;
      emissive_texture: HTMLImageElement | ImageBitmap;
      perceptual_roughness: number;
      metallic: number;
      metallic_roughness_texture: HTMLImageElement | ImageBitmap;
      reflectance: number;
      diffuse_transmission: number;
      diffuse_transmission_texture: HTMLImageElement | ImageBitmap;
      specular_transmission: number;
      specular_transmission_texture: HTMLImageElement | ImageBitmap;
      thickness: number;
      thickness_texture: HTMLImageElement | ImageBitmap;
      ior: number;
      attenuation_distance: number;
      attenuation_color: Color;
      normal_map_texture: HTMLImageElement | ImageBitmap;
      flip_normal_map_y: boolean;
      occlusion_texture: HTMLImageElement | ImageBitmap;
      double_sided: boolean;
      fog_enabled: boolean;
      alpha_mode: AlphaMode;
      depth_bias: number;
      depth_map: HTMLImageElement | ImageBitmap;
      parallax_depth_scale: number;
      max_parallax_layer_count: number;
      deferred_lighting_pass_id: number;
      opaque_render_method: number;
      unlit: boolean;
    }>,
  ) {
    const {
      vertex_shader = mesh_shader,
      fragment_shader = mesh_pbr_shader,
      base_color = Color.WHITE,
      base_color_texture,
      emissive = Color.BLACK,
      emissive_texture,
      perceptual_roughness = 0.5,
      metallic = 0.0,
      metallic_roughness_texture,
      reflectance = 0.5,
      diffuse_transmission = 0.0,
      diffuse_transmission_texture,
      specular_transmission = 0.0,
      specular_transmission_texture,
      thickness = 0.0,
      thickness_texture,
      ior = 1.5,
      attenuation_distance = Infinity,
      attenuation_color = Color.WHITE,
      normal_map_texture,
      flip_normal_map_y = false,
      occlusion_texture,
      double_sided = false,
      fog_enabled = true,
      alpha_mode = new AlphaMode.Opaque(),
      depth_bias = 0.0,
      depth_map,
      parallax_depth_scale = 0.1,
      max_parallax_layer_count = 16,
      deferred_lighting_pass_id = 1,
      opaque_render_method = OpaqueRendererMethod.Auto,
      unlit = false,
    } = options || {};

    this.vertex_shader = vertex_shader;
    this.fragment_shader = fragment_shader;
    this.base_color = base_color;
    this.base_color_texture = base_color_texture;
    this.emissive = emissive;
    this.emissive_texture = emissive_texture;
    this.perceptual_roughness = perceptual_roughness;
    this.metallic = metallic;
    this.metallic_roughness_texture = metallic_roughness_texture;
    this.reflectance = reflectance;
    this.diffuse_transmission = diffuse_transmission;
    this.diffuse_transmission_texture = diffuse_transmission_texture;
    this.specular_transmission = specular_transmission;
    this.specular_transmission_texture = specular_transmission_texture;
    this.thickness = thickness;
    this.thickness_texture = thickness_texture;
    this.ior = ior;
    this.attenuation_distance = attenuation_distance;
    this.attenuation_color = attenuation_color;
    this.normal_map_texture = normal_map_texture;
    this.flip_normal_map_y = flip_normal_map_y;
    this.occlusion_texture = occlusion_texture;
    this.double_sided = double_sided;
    this.fog_enabled = fog_enabled;
    this.alpha_mode = alpha_mode;
    this.depth_bias = depth_bias;
    this.depth_map = depth_map;
    this.parallax_depth_scale = parallax_depth_scale;
    this.max_parallax_layer_count = max_parallax_layer_count;
    this.deferred_lighting_pass_id = deferred_lighting_pass_id;
    this.opaque_render_method = opaque_render_method;
    this.unlit = unlit;
  }
}

export namespace StandardMaterialFlags {
  const ALPHA_MODE_MASK_BITS = 0b111;
  const ALPHA_MODE_SHIFT_BITS = 32 - count_ones(ALPHA_MODE_MASK_BITS);

  export const BASE_COLOR_TEXTURE = 1 << 0;
  export const EMISSIVE_TEXTURE = 1 << 1;
  export const METALLIC_ROUGHNESS_TEXTURE = 1 << 2;
  export const OCCLUSION_TEXTURE = 1 << 3;
  export const DOUBLE_SIDED = 1 << 4;
  export const UNLIT = 1 << 5;
  export const TWO_COMPONENT_NORMAL_MAP = 1 << 6;
  export const FLIP_NORMAL_MAP_Y = 1 << 7;
  export const FOG_ENABLED = 1 << 8;
  export const DEPTH_MAP = 1 << 9; // Used for parallax mapping
  export const SPECULAR_TRANSMISSION_TEXTURE = 1 << 10;
  export const THICKNESS_TEXTURE = 1 << 11;
  export const DIFFUSE_TRANSMISSION_TEXTURE = 1 << 12;
  export const ATTENUATION_ENABLED = 1 << 13;
  export const ALPHA_MODE_RESERVED_BITS =
    ALPHA_MODE_MASK_BITS << ALPHA_MODE_SHIFT_BITS; // ← Bitmask reserving bits for the `AlphaMode`
  export const ALPHA_MODE_OPAQUE = 0 << ALPHA_MODE_SHIFT_BITS; // ← Values are just sequential values bitshifted into
  export const ALPHA_MODE_MASK = 1 << ALPHA_MODE_SHIFT_BITS; //   the bitmask, and can range from 0 to 7.
  export const ALPHA_MODE_BLEND = 2 << ALPHA_MODE_SHIFT_BITS; //
  export const ALPHA_MODE_PREMULTIPLIED = 3 << ALPHA_MODE_SHIFT_BITS; //
  export const ALPHA_MODE_ADD = 4 << ALPHA_MODE_SHIFT_BITS; //   Right now only values 0–5 are used, which still gives
  export const ALPHA_MODE_MULTIPLY = 5 << ALPHA_MODE_SHIFT_BITS; // ← us "room" for two more modes without adding more bits
  export const NONE = 0;
  export const UNINITIALIZED = 0xffff;
}

/**
 * Render method used for opaque materials.
 *
 * The forward rendering main pass draws each mesh entity and shades it according to its
 * corresponding material and the lights that affect it. Some render features like Screen Space
 * Ambient Occlusion require running depth and normal prepasses, that are 'deferred'-like
 * prepasses over all mesh entities to populate depth and normal textures. This means that when
 * using render features that require running prepasses, multiple passes over all visible geometry
 * are required. This can be slow if there is a lot of geometry that cannot be batched into few
 * draws.
 *
 * Deferred rendering runs a prepass to gather not only geometric information like depth and
 * normals, but also all the material properties like base color, emissive color, reflectance,
 * metalness, etc, and writes them into a deferred 'g-buffer' texture. The deferred main pass is
 * then a fullscreen pass that reads data from these textures and executes shading. This allows
 * for one pass over geometry, but is at the cost of not being able to use MSAA, and has heavier
 * bandwidth usage which can be unsuitable for low end mobile or other bandwidth-constrained devices.
 *
 * If a material indicates `OpaqueRendererMethod::Auto`, `DefaultOpaqueRendererMethod` will be used.
 */
export enum OpaqueRendererMethod {
  Forward,
  Deferred,
  Auto,
}
