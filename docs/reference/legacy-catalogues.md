# Legacy catalogues

The public build and `Kurblanc-Samples` `v0.2.0` still use the format this wiki
calls **pre-D25**. This page maps it to the current format. Use it to convert a
pack; do not use it as the reference for new content.

## The differences

| Pre-D25 | D25 |
|---|---|
| `LP/blocks.json` lists active block files | The loader enumerates `LP/blocks/` |
| `AP/textures/terrain_texture.json` maps short keys to paths | Definitions name AP paths directly |
| `"texture": "stone"` | `"texture": "textures/blocks/stone.png"` |
| `door_wood.json` plus `door_wood_open.json` | One `door_wood.json` with `kurblanc:toggle_states` |
| `wall_top.png` plus `wall_front.png` | One `192×83` sheet |
| `LP/items.json` array or older per-file items | One `LP/items/<id>.json` with `kurblanc:block_placer` |
| `LP/mobs.json` plus `LP/mobs/<id>.json` | `LP/entities/<id>.json` |
| Per-frame PNG folders | One packed sheet per animation |
| `AP/textures/entity_texture.json` | Paths in the entity's render component |
| Items are still per file in `v0.2.0` | Same idea, but the definition is a `kurblanc:item` file |

Manifests stay format 2 with UUIDs. An LP no longer has to depend on a specific AP
UUID, but keeping the dependency is harmless during a migration.

## Convert a block

Before:

```json
{
  "kurblanc:format": 1,
  "kurblanc:block": {
    "description": { "identifier": "kurblanc:stone_floor" },
    "components": {
      "kurblanc:material_instances": {
        "*": { "texture": "stone" }
      }
    }
  }
}
```

After:

```json
{
  "format_version": "1.21.0",
  "kurblanc:block": {
    "description": { "identifier": "kurblanc:stone_floor" },
    "components": {
      "kurblanc:material_instances": {
        "*": { "texture": "textures/blocks/stone.png" }
      }
    }
  }
}
```

Then delete the `blocks.json` entry and the `terrain_texture.json` key.

## Convert a door

1. Move all shared components to the top level.
2. Put the closed-only components under `kurblanc:toggle_states.closed`.
3. Put the open-only components under `kurblanc:toggle_states.open`, with
   `"kurblanc:placeable": false`.
4. Delete the `_open.json` file. The loader generates the open ID.
5. Keep `kurblanc:pair` on both halves of a double door via the shared component.

## Convert a wall

Combine the top and front images into one `192×83` PNG: top at `(0, 0)`,
front at `(0, 64)`. Keep `kurblanc:wall.lift` and `group`. Delete the old
`_top` and `_front` files. If the art cannot be repacked, keep it with
`top_rect` and `front_rect` until it can.

## Convert items

Replace the old item object with a `kurblanc:item` file:

```json
{
  "format_version": "1.21.0",
  "kurblanc:item": {
    "description": { "identifier": "mypack:stone_tile" },
    "components": {
      "kurblanc:block_placer": { "block": "mypack:stone_tile" }
    }
  }
}
```

Label, icon and stack limit come from the block. Add `kurblanc:label`,
`kurblanc:icon`, `kurblanc:max_stack` or `kurblanc:categories` only when the
default is wrong.

## Convert entities

- Rename `LP/mobs/` to `LP/entities/` and delete `mobs.json`.
- Pack each animation's frames left to right into one PNG.
- In `kurblanc:render.animations`, give each animation `texture`, `frames` and
  `fps`.
- Delete the per-frame folders and `entity_texture.json`.

## What cannot be converted mechanically

The pre-D25 sample pack also ships `AP/sounds.json`, `AP/music.json`,
`AP/presentation/` and `LP/worldgen/`. D25 does not make those a pack-authoring
surface. Leave them out of a converted pack unless the build you target documents
them.

## Checking the conversion

Load the converted pack in a D25 build. The errors name the file and field; see
[Validation errors](/reference/validation-errors). The component reference is
[D25-only](/reference/components/blocks).
