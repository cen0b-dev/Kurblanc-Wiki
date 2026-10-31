# Textures and tiling

For a single tile, draw a 32×32 PNG and save it in your AP. Reference the PNG
from the `components` object of the block:

```json
{
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/stone_tile.png" }
  }
}
```

The path is relative to the asset pack. It starts with `textures/`, ends in
`.png`, and cannot contain `..`. If two asset packs supply the same path, the
later pack wins. Thus an AP can replace a texture with a PNG at the same path.

You can also name a key from `AP/textures/terrain_texture.json`. For example,
this catalog maps the key `stone_tile` to a file:

```json
{
  "texture_data": {
    "stone_tile": { "textures": "textures/blocks/stone_tile.png" }
  }
}
```

A block can then use `"texture": "stone_tile"`. A direct path is simpler for a
small pack. A key lets several definitions share a named asset entry.

## Material instances

`*` is the primary face. The loader accepts `up` as an alternative primary key.
`front` is the wall face. A tile can crop one sprite from a packed sheet:

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/stone_sheet.png",
      "rect": [0, 0, 16, 16]
    }
  }
}
```

`rect` is `[x, y, width, height]` with a nonnegative origin and positive size. A
bad crop fails with the component path.

## Tiling styles

The renderer needs to know how to join the art. Pick one:

| Component | Tiling | Art |
|---|---|---|
| none | Plain | One tile, no connections |
| `kurblanc:ground` | Ground | Corner tiling, optional rotation and biome tint |
| `kurblanc:surface` | Built surface | 47-shape sheet |
| `kurblanc:wall` | Wall | Separate top and front textures, raised |
| `kurblanc:water` | Water | Floor tile with a visible bed |
| `kurblanc:object` | Object | Cropped sprite with offset, depth and variants |
| `kurblanc:door` | Door | Closed and open states from one file |

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

`group` connects variants of the same material. The `biome_tint` field recolors
natural ground from the biome of the tile. The `substrate` field names the floor
block under the surface.

### Surface

```json
{ "kurblanc:surface": { "group": "woodfloor" } }
```

Surfaces use the 47-shape layout in the texture. The image must match that
layout. The game does not slice an arbitrary picture.

### Walls

A wall uses two texture paths and a lift:

```json
{
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/stone_wall_top.png" },
    "front": { "texture": "textures/blocks/stone_wall_front.png" }
  },
  "kurblanc:wall": {
    "lift": 18,
    "group": "stone"
  }
}
```

`lift` is the top elevation in source pixels, from 0 to 32. A wall with no front
texture draws the top only. Windows and fences use the same wall layer and the
same top-plus-front pair.

### Water

```json
{
  "kurblanc:water": { "bed": "mypack:sand", "opacity": 0.6 }
}
```

The bed is a floor block that you see through the water. `opacity` is a tint
strength between 0 and 1. It is separate from the 0 to 15 light opacity.

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
- `height` is visual only. Collision stays on the tile footprint.
- `depth` and `vertical_depth` adjust draw order.
- `vertical_rect`, `vertical_offset` and `vertical_masks` give an alternate
  crop for vertical faces.
- `random_flip` mirrors from a stable tile hash.
- `sway` adds ambient movement for foliage.
- `shadow: "sprite"` projects the sprite alpha instead of a box.
- `contact_shadow` gives a root-contact ellipse when the full silhouette is
  wrong.
- `foliage` marks a canopy for ambient flutter.
- `variant_weights` picks among strip frames.

### Doors

A door is one block file with a `kurblanc:door` component. The `closed` and
`open` fields each name a texture. A field can also name an object with a
texture plus art overrides:

```json
{
  "kurblanc:door": {
    "closed": "textures/blocks/door_closed.png",
    "open": {
      "texture": "textures/blocks/door_sheet.png",
      "rect": [0, 84, 21, 34],
      "sprite_offset": [-10, -23],
      "height": 36
    }
  }
}
```

The loader generates the open state. Both states can use different crops,
offsets and height. The open state is always non-placeable, non-solid and
opacity 0.

## Variant strips

Variants are one horizontal strip with a one-pixel transparent gap between cells.
Declare the cell on the material instance:

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/pebble.png",
      "cell": [12, 10]
    }
  }
}
```

The engine reads the image and counts the frames. Frame 0 is the base sprite. A
block that uses the texture gets every frame. `variant_weights` can bias the
choice. For six 12×10 cells, the image must be 77×10 pixels. That is six cells
plus five one-pixel gaps.

Use the dimensions of the largest variant for every cell. Keep each sprite
bottom-centered. Do not combine a variant strip with a crop rectangle.

If you use a texture key instead of a direct PNG path, declare `cell` on the
entry for that key. The entry is in `terrain_texture.json`. An AP that overrides
the entry must include `cell` again.

## Reference

See [`kurblanc:material_instances`](/reference/components/blocks#kurblanc-material-instances),
[`kurblanc:ground`](/reference/components/blocks#kurblanc-ground),
[`kurblanc:surface`](/reference/components/blocks#kurblanc-surface) and
[`kurblanc:wall`](/reference/components/blocks#kurblanc-wall) for the field tables.
See also [`kurblanc:water`](/reference/components/blocks#kurblanc-water),
[`kurblanc:object`](/reference/components/blocks#kurblanc-object),
[`kurblanc:toggle`](/reference/components/blocks#kurblanc-toggle) and
[`kurblanc:pair`](/reference/components/blocks#kurblanc-pair).
