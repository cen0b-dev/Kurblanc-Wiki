# Textures and tiling

A definition names its texture by path:

```json
{
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/stone_tile.png" }
  }
}
```

The path is relative to the **Asset Pack**, starts with `textures/`, ends in
`.png`, and may not contain `..`. Two asset packs supplying the same path: the
higher-priority pack wins. That is how a retexture pack works without touching the
logic file.

## The material instance

`*` is the primary face. `up` is accepted as an alternative primary key. `front`
is a legacy second face; D25 walls use one combined sheet instead.

Each instance can carry a crop and a tint:

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/sheet.png",
      "rect": [0, 0, 16, 16],
      "tint": "#a9824f"
    }
  }
}
```

`rect` is `[x, y, width, height]` with a nonnegative origin and positive size. A
bad crop fails with the component path.

## Archetypes

The renderer needs to know how to stitch the art. Pick one:

| Component | Tiling | Art |
|---|---|---|
| none | Plain | One tile, no connections |
| `kurblanc:ground` | Ground | Four 8px corners, random rotation, biome tint |
| `kurblanc:surface` | Construction surface | 47-shape 16px sheet |
| `kurblanc:wall` | Wall | Combined top/front sheet, raised |
| `kurblanc:water` | Water | Floor tile with a visible submerged bed |
| `kurblanc:object` | Object | Cropped sprite with offset, depth and variants |

### Ground

```json
{
  "kurblanc:ground": {
    "random_rotate": true,
    "group": "grass",
    "substrate": "mypack:dirt",
    "biome_tint": true
  }
}
```

`group` connects variants of the same material. `biome_tint` recolours natural
ground per tile from the generator's climate tint. `substrate` names the material
the ground sits on.

### Surface

```json
{ "kurblanc:surface": { "group": "woodfloor" } }
```

Construction surfaces use the 47-shape layout stored in the texture. The texture
must match that layout; the game does not slice an arbitrary image.

### Walls

A wall is **one PNG**, `192×83`:

| Region | Position | Size |
|---|---|---|
| Top shape table | `(0, 0)` | `192 × 64` |
| Front strip | `(0, 64)` | `64 × 19` |

```json
{
  "kurblanc:wall": {
    "lift": 18,
    "group": "wall",
    "top_rect": [0, 0, 192, 64],
    "front_rect": [0, 64, 64, 19]
  }
}
```

`lift` is the top elevation in source pixels, 0–32. A wall with no front art
leaves the front region transparent and draws top-only. `top_rect` and
`front_rect` exist for unusual sheets; the standard pack uses the fixed layout and
omits them.

Windows and fences use the same wall layer and the same combined-sheet layout.

### Objects

```json
{
  "kurblanc:object": {
    "height": 10,
    "sprite_offset": [6, -7],
    "rect": [6, 0, 5, 16],
    "depth": 1
  }
}
```

- `rect` crops the sprite from its sheet.
- `sprite_offset` moves it relative to the tile.
- `height` is visual only; collision stays the tile footprint.
- `depth` and `vertical_depth` adjust draw order.
- `vertical_rect`, `vertical_offset` and `vertical_masks` provide an alternate
  crop for vertical faces.
- `variant_rects` adds sprite variants sharing the same placement.
- `random_flip` mirrors from a stable tile hash.
- `shadow: "sprite"` projects the sprite alpha instead of a box.
- `contact_shadow` supplies a root-contact ellipse when the full silhouette is
  wrong.
- `foliage` marks a canopy for ambient flutter.

## Reference

- [`kurblanc:material_instances`](/reference/components/blocks#kurblanc-material-instances)
- [`kurblanc:ground`](/reference/components/blocks#kurblanc-ground)
- [`kurblanc:surface`](/reference/components/blocks#kurblanc-surface)
- [`kurblanc:wall`](/reference/components/blocks#kurblanc-wall)
- [`kurblanc:object`](/reference/components/blocks#kurblanc-object)
