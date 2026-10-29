# Blocks overview

A block is one JSON file in `LP/blocks/`. It defines what the tile *is*: which
layer it occupies, whether it collides, how long it takes to mine, what it emits,
and which texture key it uses. The art lives in an asset pack.

```json
{
  "kurblanc:format": 1,
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_tile" },
    "components": {
      "kurblanc:layer": "floor",
      "kurblanc:color": "#8d8978",
      "kurblanc:material_instances": {
        "*": { "texture": "stone_tile" }
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
   `object`) and the texture key binding.

The [component reference](/reference/components/blocks) has every field. The
concept pages explain the choices:

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Light](/blocks/light)

## Doors and gates

A door is two block files with matching `kurblanc:toggle` values. The closed file
is placeable and solid; the open file is not placeable and has no collision. A
double door adds `kurblanc:pair` to both leaves so they move together. There is no
generated state and no hidden second block.

## Block, item and texture are separate

- A block becomes holdable when you add `LP/items/<id>.json` with `block` set to
  the block ID.
- A block names a texture key, and `AP/textures/terrain_texture.json` maps that key
  to a PNG. An asset pack can replace the key without touching the logic file.
