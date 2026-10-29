<!-- generated: do not edit -->
# Block components

Generated from `data/components.json` for D25. Do not edit this page by hand; edit the manifest and run `npm run gen`.

## `kurblanc:layer`

**Applies to:** block

Chooses the tile layer the block occupies and therefore how it is drawn and collided with.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | floor | floor, wall, object | Defaults to wall when kurblanc:wall is present, otherwise floor. Not validated by the block parser. |

```json
{
  "kurblanc:layer": "wall"
}
```

**On bad input:** An unknown value is not a load error; the renderer decides what to do with it. Use one of the three documented names.

## `kurblanc:color`

**Applies to:** block

Fallback colour used for block previews, particles and light when no light colour is given.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | #ffffff | #rrggbb | Six hexadecimal digits; three-digit shorthand is rejected. |

```json
{
  "kurblanc:color": "#a9824f"
}
```

**On bad input:** kurblanc:color must be a #rrggbb string.

## `kurblanc:label`

**Applies to:** block

Human-readable name shown in the inventory, tooltips and error messages.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | The local ID with underscores replaced by spaces | any non-empty string | Falls back to the local part of the identifier when omitted. |

```json
{
  "kurblanc:label": "Wood wall"
}
```

**On bad input:** kurblanc:label must be a string.

## `kurblanc:placeable`

**Applies to:** block

Allows or forbids placing this block from an item. Door and gate states use it to make the open state unplaceable.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true | true, false | The closed state of a toggle pair must be placeable; the open state must set it to false. |

```json
{
  "kurblanc:placeable": false
}
```

**On bad input:** kurblanc:placeable must be a boolean. A toggle's open state must set it to false, and its closed state must not.

## `kurblanc:collision_box`

**Applies to:** block
**Aliases:** `minecraft:collision_box`

Marks the block solid for the player, mobs and placement checks.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true | true, false | Independent of light opacity. Floors are walkable even when solid is false. |

```json
{
  "kurblanc:collision_box": true
}
```

**On bad input:** kurblanc:collision_box must be a boolean.

## `kurblanc:opacity`

**Applies to:** block

How much sky and block light the tile absorbs, on the same 0–15 scale as light emission.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | 0 | 0–15 | 0 is fully transparent, 15 blocks all light. This is not collision. |

```json
{
  "kurblanc:opacity": 15
}
```

**On bad input:** kurblanc:opacity must be an integer 0-15.

## `kurblanc:destructible_by_mining`

**Applies to:** block
**Aliases:** `minecraft:destructible_by_mining`

Sets how long the block takes to mine.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `seconds_to_destroy` | number | Unbreakable when the component is omitted | greater than 0 | Stored as tenths of a second; 1.2 becomes 12 ticks of hardness. |

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 1.2
  }
}
```

**On bad input:** seconds_to_destroy must be positive. The component may also be set to false, which leaves the block unbreakable.

## `kurblanc:light_emission`

**Applies to:** block
**Aliases:** `minecraft:light_emission`

Makes the block a light source.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | No light when omitted | 1–15 | The light colour comes from kurblanc:light_color, then kurblanc:color. |

```json
{
  "kurblanc:light_emission": 8
}
```

**On bad input:** kurblanc:light_emission must be an integer 1-15.

## `kurblanc:light_color`

**Applies to:** block

Sets the colour of the light emitted by the block.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | The block's kurblanc:color | #rrggbb | Only read when kurblanc:light_emission is present. Not validated by the block parser; use six hexadecimal digits. |

```json
{
  "kurblanc:light_color": "#ffb45a"
}
```

**On bad input:** No parser-level check here. A malformed colour can reach the renderer; keep it to #rrggbb.

## `kurblanc:drops`

**Applies to:** block

Lists the items awarded when the block is mined.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | array of stack objects | No drops | items must be namespaced and defined in an active logic pack | Each stack is { "item": "mypack:stone", "count": 4 }; the item must be namespaced and defined in an active logic pack. |

```json
{
  "kurblanc:drops": [
    {
      "item": "kurblanc:wood",
      "count": 8
    }
  ]
}
```

**On bad input:** kurblanc:drops must be an array. A missing item or a bare ID fails validation and names the block file.

## `kurblanc:material_instances`

**Applies to:** block
**Aliases:** `minecraft:material_instances`

Binds the block to its texture and optional crop.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `*.texture` | string | None | AP path ending in .png, under textures/ | The * key is the primary face; up is accepted as an alternative. No .. segments. |
| `*.rect` | [x, y, width, height] | The whole image | nonnegative origin, positive size | Crops the primary texture on its sheet. |
| `*.tint` | string | None | #rrggbb | Multiplies the texture colour. |
| `front.texture` | string | None | AP path ending in .png, under textures/ | Legacy separate front face. D25 walls use one combined sheet instead. |

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/wood_wall.png"
    }
  }
}
```

**On bad input:** A bad path fails with: must be an AP path such as "textures/blocks/stone.png". A bad crop fails the rect rule.

## `kurblanc:ground`

**Applies to:** block

Selects the ground autotiling archetype and its natural-terrain options.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `random_rotate` | boolean | false | true, false | Rotates plain fills and connected interiors by stable quarter-turns. |
| `group` | string | None | any string | Connects variants of the same material for tiling. |
| `substrate` | string | None | a block ID | The material this ground is placed on. |
| `tint` | string | None | #rrggbb | Not validated here; use a six-digit colour. |
| `biome_tint` | boolean | false | true | Recolours natural ground per tile from the generator's biome tint. Only true enables it. |

```json
{
  "kurblanc:ground": {
    "random_rotate": true,
    "group": "grass",
    "biome_tint": true
  }
}
```

**On bad input:** The component must be an object. Values are coerced rather than rejected; keep to the documented types.

## `kurblanc:surface`

**Applies to:** block

Selects the 47-shape construction surface autotiling archetype.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `group` | string | None | any string | Connects variants of the same surface material. |

```json
{
  "kurblanc:surface": {
    "group": "woodfloor"
  }
}
```

**On bad input:** The component must be an object. A surface and a ground component on the same block: surface wins because it is read later.

## `kurblanc:wall`

**Applies to:** block

Selects the raised wall archetype and its one-sheet top/front art.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `lift` | integer | 18 | 0–32 | Wall top elevation in source pixels. |
| `group` | string | None | any string | Connects wall variants for autotiling. |
| `top_rect` | [x, y, width, height] | (0, 0, 192, 64) | nonnegative origin, positive size | Escape hatch for a top region that is not in the standard position. |
| `front_rect` | [x, y, width, height] | (0, 64, 64, 19) | nonnegative origin, positive size | Escape hatch for a front strip that is not in the standard position. |

```json
{
  "kurblanc:wall": {
    "lift": 18,
    "group": "wall",
    "top_rect": [
      0,
      0,
      192,
      64
    ],
    "front_rect": [
      0,
      64,
      64,
      19
    ]
  }
}
```

**On bad input:** Lift must be an integer 0-32. Rect overrides must be valid crops. Without a front region the wall draws top-only.

## `kurblanc:water`

**Applies to:** block

Makes a floor tile behave as water with a visible submerged bed.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `bed` | string | None | namespaced block ID | The floor material seen through the water. |
| `opacity` | number | None | 0–1 | Water tint strength, not the light opacity component. |

```json
{
  "kurblanc:water": {
    "bed": "kurblanc:sand",
    "opacity": 0.6
  }
}
```

**On bad input:** kurblanc:water.bed must be a namespaced block ID. kurblanc:water.opacity must be from 0 to 1.

## `kurblanc:object`

**Applies to:** block

Selects the raised-object archetype, including sprite crops, depth and foliage.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `height` | number | 0 | any number | Visual height in source pixels. Does not change collision. |
| `shadow` | string | None | sprite | The only accepted value is sprite, which projects the sprite alpha. |
| `contact_shadow` | [x, y, width, height] | None | radii 0–16 | A root-contact ellipse for objects that should not use the full sprite silhouette. |
| `sprite_offset` | [x, y] | [0, 0] | any finite numbers | Moves the sprite relative to the tile. |
| `rect` | [x, y, width, height] | The whole texture | nonnegative origin, positive size | Crops the object from its sheet. |
| `vertical_rect` | [x, y, width, height] | None | nonnegative origin, positive size | Alternate crop used when the object is drawn on a vertical face. |
| `vertical_offset` | [x, y] | [0, 0] | any finite numbers | Offset for the vertical-face crop. |
| `vertical_masks` | array of integers | None | each 0–15 | Cardinal masks selecting which vertical faces use the alternate crop. |
| `depth` | number | 0 | any number | Draw-order offset for the ground-layer sprite. |
| `vertical_depth` | number | 0 | any number | Draw-order offset for the vertical-face sprite. |
| `group` | string | None | any string | Groups variants for shared rendering behaviour. |
| `random_flip` | boolean | false | true, false | Horizontally mirrors the sprite from a stable tile hash. |
| `variant_rects` | array of [x, y, width, height] | None | each a valid crop | Additional sprite variants sharing the same placement. |
| `foliage.canopyEnd` | number | None | greater than 0 and less than 1 | Fraction of the sprite treated as canopy. Field name is camelCase. |
| `foliage.leafTextures` | array of strings | None | 1–32 AP texture paths | Leaf art used for ambient flutter. Field name is camelCase. |

```json
{
  "kurblanc:object": {
    "height": 10,
    "sprite_offset": [
      6,
      -7
    ],
    "rect": [
      6,
      0,
      5,
      16
    ],
    "depth": 1
  }
}
```

**On bad input:** Crops, offsets, masks and foliage ranges are checked. Bad rects, masks or foliage fail with the component path.

## `kurblanc:pair`

**Applies to:** block

Links matching toggleable blocks so they open and close together.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | None | any string | Both halves of a double door use the same pair value. |

```json
{
  "kurblanc:pair": "door"
}
```

**On bad input:** kurblanc:pair must be a string.

## `kurblanc:toggle_states`

**Applies to:** block

Turns one door or gate definition into the closed block and its generated open state.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `closed` | object of components | None | required | Overrides shared components for the closed state. Must remain placeable. |
| `open` | object of components | None | required | Overrides shared components for the open state. Must set kurblanc:placeable to false. |

```json
{
  "kurblanc:toggle_states": {
    "closed": {
      "kurblanc:placeable": true,
      "kurblanc:collision_box": true
    },
    "open": {
      "kurblanc:placeable": false,
      "kurblanc:collision_box": false
    }
  }
}
```

**On bad input:** Must contain exactly closed and open. The loader generates `${identifier}_open`, cross-links kurblanc:toggle, and refuses a placeable open state or an unplaceable closed state.

## `kurblanc:toggle`

**Applies to:** block

The ID of the other state in a door or gate pair.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | Generated | namespaced block ID | Written by the loader when it expands kurblanc:toggle_states. Do not author it by hand. |

```json
{
  "kurblanc:toggle": "kurblanc:door_wood_open"
}
```

**On bad input:** Generated and cross-linked by the loader. An authored value is overwritten for a toggle pair.
