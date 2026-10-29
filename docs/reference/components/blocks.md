<!-- generated: do not edit -->
# Block components

Generated from `data/components.json`. Do not edit this page by hand; edit the manifest and run `npm run gen`.

## `kurblanc:layer`

**Applies to:** block

Chooses the layer the block occupies. The layer decides how the block is drawn and whether it is solid.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | floor | floor, wall, object | A block with kurblanc:wall defaults to wall. Everything else defaults to floor. |

```json
{
  "kurblanc:layer": "wall"
}
```

**On bad input:** An unknown value fails when the world content is registered. Objects must set "object" explicitly.

## `kurblanc:color`

**Applies to:** block

Fallback colour for previews, break particles and light when no light colour is given.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | #ffffff | #rrggbb | Six hex digits. Shorthand and named colours are rejected. |

```json
{
  "kurblanc:color": "#8d8978"
}
```

**On bad input:** A value that is not #rrggbb fails when the world content is registered.

## `kurblanc:label`

**Applies to:** block

Display name for the block and for an item that places it.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | the block ID | any text | Optional. |

```json
{
  "kurblanc:label": "Stone Tile"
}
```

**On bad input:** A non-string value is stored as-is; keep it a string.

## `kurblanc:sound`

**Applies to:** block

Chooses the sound set used for placing, breaking and stepping on the block.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | the default block sound | lower_snake_case sound set name | The active asset pack must provide the set. |

```json
{
  "kurblanc:sound": "stone"
}
```

**On bad input:** Anything other than a lower_snake_case name fails while the block is parsed.

## `kurblanc:placeable`

**Applies to:** block

Allows or forbids placing this block from an item.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true | true, false | The open state of a door or gate sets this to false; the closed state is placeable. |

```json
{
  "kurblanc:placeable": false
}
```

**On bad input:** kurblanc:placeable must be a boolean. An open toggle state must set it to false.

## `kurblanc:collision_box`

**Applies to:** block
**Aliases:** `minecraft:collision_box`

Makes a raised block solid or walk-through.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true on wall and object layers; false on floor | true, false | Floor blocks cannot be solid. |

```json
{
  "kurblanc:collision_box": false
}
```

**On bad input:** A non-boolean value fails when the world content is registered; a solid floor is rejected.

## `kurblanc:footprint`

**Applies to:** block

Gives a raised block a smaller collision box than its tile.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `box` | [x, y, width, height] | the full tile | origin -32 to 64, positive size, box inside 64×64 | Tile-local pixels. |
| `verticalBox` | [x, y, width, height] | box | same as box | Used when the block is seen as a vertical face. |
| `group` | string | none | any non-empty string | Keeps neighbouring footprints aligned. |
| `verticalMasks` | integer[] | none | each 0–15 | Cardinal masks that use verticalBox. |

```json
{
  "kurblanc:footprint": {
    "box": [
      4,
      4,
      24,
      16
    ],
    "group": "fence"
  }
}
```

**On bad input:** Out-of-bounds rectangles, a floor block or a bad mask fails when the world content is registered.

## `kurblanc:billboard`

**Applies to:** block

Draws an object-facing sprite so it turns with the camera.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | false | true, false | Only meaningful on the object layer. |

```json
{
  "kurblanc:billboard": true
}
```

**On bad input:** A non-boolean value fails when the world content is registered.

## `kurblanc:opacity`

**Applies to:** block

How much light the block absorbs.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | 0 | 0–15 | 0 is fully transparent; 15 stops light. |

```json
{
  "kurblanc:opacity": 15
}
```

**On bad input:** A value outside 0–15 or a non-integer fails when the world content is registered.

## `kurblanc:destructible_by_mining`

**Applies to:** block
**Aliases:** `minecraft:destructible_by_mining`

Sets mining time and the tools that speed it up or are required.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `seconds_to_destroy` | number | 1 second | 0 or greater | Converted to game ticks. |
| `preferred_tool` | string | none | axe, pickaxe, shovel, sword | A matching tool mines at its own speed. |
| `required_tool` | object | none | { kind, min_tier } | The block cannot be harvested without that tool kind and tier. |

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 1.2,
    "preferred_tool": "pickaxe"
  }
}
```

**On bad input:** A bad mining field fails while the block is parsed. false is accepted and leaves the default mining time.

## `kurblanc:loot`

**Applies to:** block

Points at a loot table instead of an inline drop list.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `table` | string | none | a loot table ID | Cannot be combined with kurblanc:drops. |

```json
{
  "kurblanc:loot": {
    "table": "mypack:stone_tile"
  }
}
```

**On bad input:** A missing table or a definition that also has kurblanc:drops fails.

## `kurblanc:drops`

**Applies to:** block

Lists the items a successful break can produce.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | array of { item, count, chance? } | no drops | item IDs, positive counts, chance 0–1 | Each entry rolls independently. Omit chance for a guaranteed drop. |

```json
{
  "kurblanc:drops": [
    {
      "item": "mypack:stone",
      "count": 1,
      "chance": 0.5
    }
  ]
}
```

**On bad input:** A non-array, an unknown item or a chance outside 0–1 fails.

## `kurblanc:light_emission`

**Applies to:** block
**Aliases:** `minecraft:light_emission`

Makes the block a light source.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | none | 1–15 | 0 or less is ignored and leaves the block unlit. |

```json
{
  "kurblanc:light_emission": 8
}
```

**On bad input:** A value above 15 fails when the world content is registered.

## `kurblanc:light_color`

**Applies to:** block

Tints the light the block emits.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | kurblanc:color | #rrggbb | Only used together with kurblanc:light_emission. |

```json
{
  "kurblanc:light_color": "#ffb45a"
}
```

**On bad input:** A value that is not #rrggbb fails when the world content is registered.

## `kurblanc:material_instances`

**Applies to:** block
**Aliases:** `minecraft:material_instances`

Binds the block faces to PNG paths from the active asset packs.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `* or up.texture` | string | none | a path under textures/ (or a texture key) | Primary face. Point at a PNG under textures/, or at a key in AP/textures/terrain_texture.json. |
| `* or up.rect` | [x, y, width, height] | the whole image | nonnegative origin, positive size | Crops one sprite from a packed sheet. |
| `front.texture` | string | none | a path under textures/ (or a texture key) | Front face of a wall. Separate from the top texture. |

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/stone_tile.png"
    }
  }
}
```

**On bad input:** A missing primary texture or a path no active asset pack provides fails while content is resolved.

## `kurblanc:biome_tint`

**Applies to:** block

Recolours greyscale art with the colour of the biome the tile stands in.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | false | true, false | The art must be authored neutral grey for the tint to read correctly. |

```json
{
  "kurblanc:biome_tint": true
}
```

**On bad input:** A non-boolean value fails while the block is parsed.

## `kurblanc:ground`

**Applies to:** block

Marks a floor block as natural ground with corner tiling and optional rotation.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `random_rotate` | boolean | false | true, false | Rotates each tile from a stable hash. |
| `group` | string | none | any non-empty string | Ground of the same group connects. |
| `substrate` | string | none | a floor block ID | The material shown under the surface. |
| `tint` | string | none | #rrggbb | Fixed colour multiply for the art. |
| `biome_tint` | boolean | false | true, false | Same as the top-level component when that is absent. |

```json
{
  "kurblanc:ground": {
    "random_rotate": true,
    "group": "grass",
    "substrate": "mypack:dirt"
  }
}
```

**On bad input:** Bad field types fail while the block is parsed or when content is registered.

## `kurblanc:surface`

**Applies to:** block

Marks a floor block as a built surface that connects in 47 shapes.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `group` | string | none | any non-empty string | Surfaces of the same group connect. |

```json
{
  "kurblanc:surface": {
    "group": "woodfloor"
  }
}
```

**On bad input:** The texture must use the surface sheet layout; the game does not slice an arbitrary image.

## `kurblanc:wall`

**Applies to:** block

Marks a block as a wall and sets how far its top is raised.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `lift` | integer | 0 | 0–32 | Top elevation in source pixels. |
| `group` | string | none | any non-empty string | Walls of the same group connect. |

```json
{
  "kurblanc:wall": {
    "lift": 18,
    "group": "stone"
  }
}
```

**On bad input:** A lift outside 0–32 fails when the world content is registered.

## `kurblanc:water`

**Applies to:** block

Turns a floor block into water with a visible bed underneath.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `bed` | string | none | a floor block ID | Shown where the water is shallow or exposed. |
| `opacity` | number | none | greater than 0, less than 1 | Water tint strength, not the 0–15 light opacity. |

```json
{
  "kurblanc:water": {
    "bed": "mypack:sand",
    "opacity": 0.6
  }
}
```

**On bad input:** A missing bed or an opacity outside the open range fails while the block is parsed.

## `kurblanc:object`

**Applies to:** block

Describes a raised sprite: crop, offset, depth, shadow and variants.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `height` | number | 8 | any finite number | Visual height only; collision stays on the tile footprint. |
| `rect` | [x, y, width, height] | the whole image | nonnegative origin, positive size | Crops the sprite from its sheet. |
| `sprite_offset` | [x, y] | [0, 0] | finite numbers | Moves the sprite relative to the tile. |
| `depth` | number | 0 | any finite number | Draw order against floors. |
| `vertical_depth` | number | depth | any finite number | Draw order against walls. |
| `vertical_rect` | [x, y, width, height] | rect | nonnegative origin, positive size | Alternate crop for a vertical face. |
| `vertical_offset` | [x, y] | sprite_offset | finite numbers | Offset for the vertical crop. |
| `vertical_masks` | integer[] | none | each 0–15 | Cardinal masks that use the vertical crop. |
| `shadow` | string | box shadow | sprite | Projects the sprite alpha instead of a box. |
| `contact_shadow` | [x, y, rx, ry] | none | center 0–32, radii 0–16 | Root-contact ellipse. |
| `group` | string | none | any non-empty string | Keeps neighbouring sprites sorted together. |
| `random_flip` | boolean | false | true, false | Mirrors from a stable tile hash. |
| `sway` | boolean | false | true, false | Adds ambient movement to foliage. |
| `variant_weights` | integer[] | stable hash | one positive weight per strip frame | The strip's cell is declared on the material instance. |
| `foliage` | object | none | { canopyEnd, leafTextures } | canopyEnd is greater than 0 and less than 1; leafTextures holds 1–32 keys. |
| `tint` | string | none | #rrggbb | Fixed colour multiply for the sprite. |
| `biome_tint` | boolean | false | true, false | Same as the top-level component when that is absent. |
| `biome_tint_scale` | number | 1 | 0–1 | Darkens a biome-tinted sprite. |

```json
{
  "kurblanc:object": {
    "height": 18,
    "sprite_offset": [
      -1,
      -14
    ],
    "rect": [
      0,
      0,
      18,
      31
    ],
    "depth": -1,
    "group": "fence"
  }
}
```

**On bad input:** Bad rectangle sizes, masks, shadow values or tint colours fail while the block is parsed.

## `kurblanc:terrain`

**Applies to:** block

Makes a floor block take part in buildable terrain fill or cover.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `mode` | string | none | fill, cover | fill forms the ground mass; cover is applied on top. |
| `face` | string | none | a wall block ID | Only allowed on fill, for the exposed edge. |

```json
{
  "kurblanc:terrain": {
    "mode": "fill"
  }
}
```

**On bad input:** Terrain on anything but a floor, or face on cover, fails when content is registered.

## `kurblanc:link`

**Applies to:** block

Lets one object sit on another, such as a ladder attached to a wall.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `down` | integer | none | 1–16 | How many levels down the support may be. |

```json
{
  "kurblanc:link": {
    "down": 1
  }
}
```

**On bad input:** A non-object link, an extra field or a level outside 1–16 fails.

## `kurblanc:pair`

**Applies to:** block

Groups matching door or gate leaves so they open and close together.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | none | any non-empty string | Both halves use the same value. Requires a kurblanc:toggle on both. |

```json
{
  "kurblanc:pair": "mypack:door_wood"
}
```

**On bad input:** Fails registration with: blocks: (block id).pair needs matching object toggle states. Pair is only valid on object-layer toggles.

## `kurblanc:toggle`

**Applies to:** block

Names the other state of a two-file door or gate.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | none | namespaced block ID | Point at the open file from the closed file, and back at the closed file from the open file. |

```json
{
  "kurblanc:toggle": "mypack:door_wood_open"
}
```

**On bad input:** Fails registration with: blocks: (block id).toggle must reference a block on the same layer.
