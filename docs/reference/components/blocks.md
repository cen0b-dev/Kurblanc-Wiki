<!-- generated: do not edit -->
# Block components

Put these components inside the `components` object of a block definition. Examples here are fragments. [Your first block](/guide/first-block) shows a complete file.

## `kurblanc:layer`

**Applies to:** block

Chooses the layer that the block uses. The layer decides how the game draws the block and whether the block is solid.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | floor | floor, wall, object | A block with kurblanc:wall defaults to wall. All other blocks default to floor. |

```json
{
  "kurblanc:layer": "wall"
}
```

**Validation:** An unknown value fails when the game registers the world content. Objects must set "object" explicitly.

## `kurblanc:color`

**Applies to:** block

Sets the fallback color for previews, break particles and light when you give no light color.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | #ffffff | #rrggbb | Six hex digits. The game rejects shorthand and named colors. |

```json
{
  "kurblanc:color": "#8d8978"
}
```

**Validation:** A value that is not #rrggbb fails when the game registers the world content.

## `kurblanc:label`

**Applies to:** block

Sets the display name for the block and for an item that places it.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | the block ID | any text | Optional. |

```json
{
  "kurblanc:label": "Stone Tile"
}
```

**Validation:** The game stores a non-string value as-is. Keep it a string.

## `kurblanc:sound`

**Applies to:** block

Chooses the sound set that the game uses to place, break and step on the block.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | the default block sound | lower_snake_case sound set name | The active asset pack must supply the set. |

```json
{
  "kurblanc:sound": "stone"
}
```

**Validation:** A name that is not lower_snake_case fails while the parser reads the block.

## `kurblanc:placeable`

**Applies to:** block

Allows or forbids placing this block from an item.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true | true, false | The open state of a door or gate sets this to false. The closed state is placeable. |

```json
{
  "kurblanc:placeable": false
}
```

**Validation:** kurblanc:placeable must be a boolean. An open toggle state must set it to false.

## `kurblanc:collision_box`

**Applies to:** block
**Aliases:** `minecraft:collision_box`

Makes a raised block solid or walk-through.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | true on wall and object layers, false on floor | true, false | Floor blocks cannot be solid. |

```json
{
  "kurblanc:collision_box": false
}
```

**Validation:** A non-boolean value fails when the game registers the world content. The game rejects a solid floor.

## `kurblanc:footprint`

**Applies to:** block

Gives a raised block a collision box that is smaller than its tile.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `box` | [x, y, width, height] | the full tile | origin -32 to 64, positive size, box inside 64×64 | Tile-local pixels. |
| `verticalBox` | [x, y, width, height] | box | same as box | The game uses it for a vertical face. |
| `group` | string | none | any non-empty string | Keeps neighbor footprints aligned. |
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

**Validation:** Out-of-bounds rectangles, a floor block or a bad mask fails when the game registers the world content.

## `kurblanc:billboard`

**Applies to:** block

Draws an object-facing sprite that turns with the camera.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | false | true, false | Meaningful only on the object layer. |

```json
{
  "kurblanc:billboard": true
}
```

**Validation:** A non-boolean value fails when the game registers the world content.

## `kurblanc:opacity`

**Applies to:** block

Sets how much light the block absorbs.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | 0 | 0–15 | A value of 0 is fully transparent. A value of 15 stops light. |

```json
{
  "kurblanc:opacity": 15
}
```

**Validation:** A value outside 0–15 or a non-integer fails when the game registers the world content.

## `kurblanc:destructible_by_mining`

**Applies to:** block
**Aliases:** `minecraft:destructible_by_mining`

Sets the mining time and the tools that speed it up. It also names the tools that the block needs.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `seconds_to_destroy` | number | 1 second | 0 or greater | The game converts it to game ticks. |
| `preferred_tool` | string | none | axe, pickaxe, shovel, sword | A matching tool mines at its own speed. |
| `required_tool` | object | none | { kind, min_tier } | You cannot harvest the block without that tool kind and tier. |

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 1.2,
    "preferred_tool": "pickaxe"
  }
}
```

**Validation:** A bad mining field fails while the parser reads the block. The game accepts false and keeps the default mining time.

## `kurblanc:loot`

**Applies to:** block

Points at a loot table instead of an inline drop list.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `table` | string | none | a loot table ID | You cannot combine it with kurblanc:drops. |

```json
{
  "kurblanc:loot": {
    "table": "mypack:stone_tile"
  }
}
```

**Validation:** A missing table or a definition that also holds kurblanc:drops fails.

## `kurblanc:drops`

**Applies to:** block

Lists the items that a successful break can produce.

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

**Validation:** A non-array, an unknown item or a chance outside 0–1 fails.

## `kurblanc:light_emission`

**Applies to:** block
**Aliases:** `minecraft:light_emission`

Makes the block a light source.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | integer | none | 1–15 | The game ignores 0 or less and leaves the block unlit. |

```json
{
  "kurblanc:light_emission": 8
}
```

**Validation:** A value above 15 fails when the game registers the world content.

## `kurblanc:light_color`

**Applies to:** block

Tints the light that the block emits.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | kurblanc:color | #rrggbb | The game uses it only with kurblanc:light_emission. |

```json
{
  "kurblanc:light_color": "#ffb45a"
}
```

**Validation:** A value that is not #rrggbb fails when the game registers the world content.

## `kurblanc:material_instances`

**Applies to:** block
**Aliases:** `minecraft:material_instances`

Chooses the primary texture of the block and an optional wall-front texture. Use a PNG path or a key in terrain_texture.json from an active AP.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `* or up.texture` | string | none | a path under textures/ (or a texture key) | The primary face. Point at a PNG under textures/, or at a key in AP/textures/terrain_texture.json. |
| `* or up.rect` | [x, y, width, height] | the whole image | nonnegative origin, positive size | Crops one sprite from a packed sheet. |
| `front.texture` | string | none | a path under textures/ (or a texture key) | The front face of a wall. It is separate from the top texture. |
| `*.cell` | [integer, integer] | omitted | 1–256 pixels per dimension | For a direct PNG path, declares the cell size of a horizontal variant strip. Frames have one-pixel gaps. For a texture key, declare cell in terrain_texture.json instead. Do not combine strips and crop rectangles. |

```json
{
  "kurblanc:material_instances": {
    "*": {
      "texture": "textures/blocks/stone_tile.png"
    }
  }
}
```

**Validation:** A missing primary texture fails while the game resolves content. A path that no active asset pack supplies also fails.

## `kurblanc:biome_tint`

**Applies to:** block

Recolors grayscale art with the color of the biome that the tile stands in.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | boolean | false | true, false | The art must use neutral gray for the tint to read correctly. |

```json
{
  "kurblanc:biome_tint": true
}
```

**Validation:** A non-boolean value fails while the parser reads the block.

## `kurblanc:ground`

**Applies to:** block

Marks a floor block as natural ground with corner tiling and optional rotation.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `random_rotate` | boolean | false | true, false | Rotates each tile from a stable hash. |
| `group` | string | none | any non-empty string | Ground of the same group connects. |
| `substrate` | string | none | a floor block ID | The material that the game shows under the surface. |
| `tint` | string | none | #rrggbb | A fixed color multiply for the art. |
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

**Validation:** Bad field types fail while the parser reads the block or when the game registers content.

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

**Validation:** The texture must use the surface sheet layout. The game does not slice an arbitrary image.

## `kurblanc:wall`

**Applies to:** block

Marks a block as a wall and sets the height of its raised top.

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

**Validation:** A lift outside 0–32 fails when the game registers the world content.

## `kurblanc:water`

**Applies to:** block

Turns a floor block into water with a visible bed underneath.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `bed` | string | none | a floor block ID | The game shows it where the water is shallow or exposed. |
| `opacity` | number | none | greater than 0, less than 1 | Water tint strength, not the 0–15 light opacity. |

```json
{
  "kurblanc:water": {
    "bed": "mypack:sand",
    "opacity": 0.6
  }
}
```

**Validation:** A missing bed or an opacity outside the open range fails while the parser reads the block.

## `kurblanc:object`

**Applies to:** block

Describes a raised sprite: crop, offset, depth, shadow and variants.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `height` | number | 8 | any finite number | Visual height only. Collision stays on the tile footprint. |
| `rect` | [x, y, width, height] | the whole image | nonnegative origin, positive size | Crops the sprite from its sheet. |
| `sprite_offset` | [x, y] | [0, 0] | finite numbers | Moves the sprite relative to the tile. |
| `depth` | number | 0 | any finite number | Draw order against floors. |
| `vertical_depth` | number | depth | any finite number | Draw order against walls. |
| `vertical_rect` | [x, y, width, height] | rect | nonnegative origin, positive size | An alternate crop for a vertical face. |
| `vertical_offset` | [x, y] | sprite_offset | finite numbers | The offset for the vertical crop. |
| `vertical_masks` | integer[] | none | each 0–15 | Cardinal masks that use the vertical crop. |
| `shadow` | string | box shadow | sprite | Projects the alpha of the sprite instead of a box. |
| `contact_shadow` | [x, y, rx, ry] | none | center 0–32, radii 0–16 | The root-contact ellipse. |
| `group` | string | none | any non-empty string | Keeps neighbor sprites sorted together. |
| `random_flip` | boolean | false | true, false | Mirrors from a stable tile hash. |
| `sway` | boolean | false | true, false | Adds ambient movement to foliage. |
| `variant_weights` | integer[] | stable hash | one positive weight per strip frame | Declare the cell of the strip on the material instance. |
| `foliage` | object | none | { canopyEnd, leafTextures } | canopyEnd is greater than 0 and less than 1. leafTextures holds 1–32 keys. |
| `tint` | string | none | #rrggbb | A fixed color multiply for the sprite. |
| `biome_tint` | boolean | false | true, false | Same as the top-level component when that is absent. |
| `biome_tint_scale` | number | 1 | 0–1 | Darkens a sprite that has a biome tint. |

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

**Validation:** Bad rectangle sizes, masks, shadow values or tint colors fail while the parser reads the block.

## `kurblanc:terrain`

**Applies to:** block

Makes a floor block take part in buildable terrain fill or cover.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `mode` | string | none | fill, cover | fill forms the ground mass. The game applies cover on top. |
| `face` | string | none | a wall block ID | Allowed only on fill, for the exposed edge. |

```json
{
  "kurblanc:terrain": {
    "mode": "fill"
  }
}
```

**Validation:** Terrain on anything but a floor, or face on cover, fails when the game registers content.

## `kurblanc:link`

**Applies to:** block

Lets one object sit on another, such as a ladder attached to a wall.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `down` | integer | none | 1–16 | How many levels down the support can be. |

```json
{
  "kurblanc:link": {
    "down": 1
  }
}
```

**Validation:** A non-object link, an extra field or a level outside 1–16 fails.

## `kurblanc:pair`

**Applies to:** block

Groups matching door or gate leaves so they open and close together.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | none | any non-empty string | Both halves use the same value. Both halves need a kurblanc:toggle. |

```json
{
  "kurblanc:pair": "mypack:door_wood"
}
```

**Validation:** Fails registration with: blocks: (block id).pair needs matching object toggle states. Pair is only valid on object-layer toggles.

## `kurblanc:toggle`

**Applies to:** block

Names the other state of a two-file door or gate.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `value` | string | none | namespaced block ID | The closed file points at the open file. The open file points back at the closed file. |

```json
{
  "kurblanc:toggle": "mypack:door_wood_open"
}
```

**Validation:** Fails registration with: blocks: (block id).toggle must reference a block on the same layer.

## `kurblanc:door`

**Applies to:** block

Turns one block file into a closed/open door pair.

| Field | Type | Default | Range | Notes |
|---|---|---|---|---|
| `closed` | string or state object | required | texture path, or an object with texture and optional art overrides | The placed state. A string names its texture. An object can add rect, sprite_offset, vertical_rect, vertical_offset, vertical_masks, height, depth, vertical_depth, footprint and label. |
| `open` | string or state object | required | texture path, or an object with texture and optional art overrides | The generated open state. It takes the same fields as closed. The game forces placeable, collision and opacity off. |

```json
{
  "kurblanc:door": {
    "closed": "textures/blocks/door_closed.png",
    "open": "textures/blocks/door_open.png"
  }
}
```

**Validation:** The loader generates (id)_open, cross-links kurblanc:toggle, and forces the open state non-placeable, non-solid and opacity 0. The closed state must be placeable and the layer must be object. Do not add a second _open file.
