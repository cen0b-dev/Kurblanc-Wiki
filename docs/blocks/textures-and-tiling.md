# Textures and tiling

A block names its art by path:

```json
{
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/stone_tile.png" }
  }
}
```

The path is relative to the asset pack, starts with `textures/`, ends in `.png`,
and may not contain `..`. Two asset packs supplying the same path: the later pack
wins. That is how a retexture works without touching the logic file.

## Material instances

`*` is the primary face. `up` is accepted as an alternative primary key. `front`
is the wall face. A tile can crop one sprite out of a packed sheet:

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

The renderer needs to know how to stitch the art. Pick one:

| Component | Tiling | Art |
|---|---|---|
| none | Plain | One tile, no connections |
| `kurblanc:ground` | Ground | Corner tiling, optional rotation and biome tint |
| `kurblanc:surface` | Built surface | 47-shape sheet |
| `kurblanc:wall` | Wall | Separate top and front textures, raised |
| `kurblanc:water` | Water | Floor tile with a visible bed |
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
ground from the tile's biome. `substrate` names the floor block under the surface.

### Surface

```json
{ "kurblanc:surface": { "group": "woodfloor" } }
```

Surfaces use the 47-shape layout stored in the texture. The image must match that
layout; the game does not slice an arbitrary picture.

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
texture draws top-only. Windows and fences use the same wall layer and the same
top-plus-front pair.

### Water

```json
{
  "kurblanc:water": { "bed": "mypack:sand", "opacity": 0.6 }
}
```

The bed is a floor block shown through the water. `opacity` is a tint strength
between 0 and 1, separate from the 0–15 light opacity.

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
- `height` is visual only; collision stays on the tile footprint.
- `depth` and `vertical_depth` adjust draw order.
- `vertical_rect`, `vertical_offset` and `vertical_masks` provide an alternate
  crop for vertical faces.
- `random_flip` mirrors from a stable tile hash.
- `sway` adds ambient movement for foliage.
- `shadow: "sprite"` projects the sprite alpha instead of a box.
- `contact_shadow` supplies a root-contact ellipse when the full silhouette is
  wrong.
- `foliage` marks a canopy for ambient flutter.
- `variant_weights` picks among strip frames.

### Doors

A door is two block files that share one texture sheet and point at each other
with `kurblanc:toggle`. The closed file uses its crop; the open file uses another
crop. There is no door texture component.

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
block that uses the texture gets every frame; `variant_weights` can bias the
choice.

## Reference

See [`kurblanc:material_instances`](/reference/components/blocks#kurblanc-material-instances),
[`kurblanc:ground`](/reference/components/blocks#kurblanc-ground),
[`kurblanc:surface`](/reference/components/blocks#kurblanc-surface),
[`kurblanc:wall`](/reference/components/blocks#kurblanc-wall),
[`kurblanc:water`](/reference/components/blocks#kurblanc-water),
[`kurblanc:object`](/reference/components/blocks#kurblanc-object),
[`kurblanc:toggle`](/reference/components/blocks#kurblanc-toggle) and
[`kurblanc:pair`](/reference/components/blocks#kurblanc-pair) for the field tables.
