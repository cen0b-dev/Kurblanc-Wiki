# Blocks overview

A block is one JSON file in `LP/blocks/`. It defines what the tile *is*: which
layer it occupies, whether it collides, how long it takes to mine, what it emits,
and which texture file it uses. The art lives in an asset pack.

```json
{
  "kurblanc:format": 1,
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_tile" },
    "components": {
      "kurblanc:layer": "floor",
      "kurblanc:color": "#8d8978",
      "kurblanc:material_instances": {
        "*": { "texture": "textures/blocks/stone_tile.png" }
      }
    }
  }
}
```

The file needs `kurblanc:format`, `description.identifier` and `components`.
Everything else has a default.

## The block's three jobs

1. **Gameplay:** layer, collision, mining, drops.
2. **Light:** opacity and emission.
3. **Rendering:** the tiling style (`ground`, `surface`, `wall`, `water` or
   `object`) and the texture path binding.

The [component reference](/reference/components/blocks) has every field. The
concept pages explain the choices:

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Light](/blocks/light)

## Doors and gates

A door is two block files: the closed state and the open state. Each names the
other with `kurblanc:toggle`. The closed file is placeable and solid; the open
file sets `kurblanc:placeable` to false and turns collision off.

```json
{
  "kurblanc:layer": "object",
  "kurblanc:placeable": true,
  "kurblanc:collision_box": true,
  "kurblanc:toggle": "mypack:door_wood_open"
}
```

The open file points back at `mypack:door_wood`. A double door adds
`kurblanc:pair` with the same value on both leaves.

## Block, item and texture are separate

- A block becomes holdable when you add `LP/items/<id>.json` with `block` set to
  the block ID.
- A block names a PNG under `textures/` in an asset pack. A later asset pack can
  replace the same path, which is how a retexture works without touching the logic
  file.
