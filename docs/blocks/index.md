# Blocks overview

A block is one JSON file in `LP/blocks/`. It defines what the tile *is*: which
layer it occupies, whether it collides, how long it takes to mine, what it emits,
and which texture it uses. The art lives in the Asset Pack.

```json
{
  "format_version": "1.21.0",
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

Only two things are structurally required: `description.identifier` and
`components`. Everything else has a default.

## The block's three jobs

1. **Gameplay:** layer, collision, mining hardness, drops.
2. **Light:** opacity and emission.
3. **Rendering:** the archetype (`ground`, `surface`, `wall`, `water`, `object`)
   and texture binding.

The [component reference](/reference/components/blocks) has every field. The
concept pages explain the choices:

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Light](/blocks/light)

## Doors and gates

A door is still one file. Add `kurblanc:toggle_states` with `closed` and `open`
objects; the loader generates the base block and `${id}_open`, cross-links them,
and refuses an open state that can be placed. That is the whole pattern.

## What a block is not

- A block is not its item. Add `LP/items/<id>.json` with
  `kurblanc:block_placer` if the player should hold and place it.
- A block is not its texture. The definition names an AP path; an asset pack can
  replace that path without touching the logic file.
