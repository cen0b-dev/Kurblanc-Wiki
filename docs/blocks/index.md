# Blocks overview

A block is a thing you place in the world: ground, a wall, a door, a tree or a
torch. Its JSON file goes in `LP/blocks/`. Its PNG goes in the AP.

The simplest example is a floor tile. Save this as `LP/blocks/stone_tile.json`:

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

The format marker identifies a Kurblanc block file. The identifier gives the
block its ID. Components describe how the block looks and acts. This example
sets its layer and color explicitly. An omitted field uses the loader default.

To hold and place this tile, add an item that references it.

[Your first block](/guide/first-block) includes that item and both manifests.

## Choose what to change

Use [the component reference](/reference/components/blocks) to look up a field.
For examples and explanations, read:

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Multi-tile objects and stations](/blocks/multi-tile)
- [Containers](/blocks/storage)
- [Light](/blocks/light)

## Doors and gates

A door is one block file with a `kurblanc:door` component. The `closed` and
`open` fields each name a texture. A field can also name an object with that
texture plus art overrides. The loader generates `<id>_open` and links the two
states. The open state then becomes non-placeable, non-solid and opacity 0.

```json
{
  "kurblanc:layer": "object",
  "kurblanc:placeable": true,
  "kurblanc:collision_box": true,
  "kurblanc:door": {
    "closed": "textures/blocks/door_closed.png",
    "open": "textures/blocks/door_open.png"
  }
}
```

Use an object when the open art needs different geometry:

```json
{
  "open": {
    "texture": "textures/blocks/door_sheet.png",
    "rect": [0, 84, 21, 34],
    "sprite_offset": [-10, -23],
    "height": 36
  }
}
```

A double door adds `kurblanc:pair` with the same value on both leaves.

## Block, item and texture are separate

- A block becomes holdable when you add `LP/items/<id>.json` with `block` set to
  the block ID.
- A block names a PNG under `textures/` in an asset pack. A later asset pack can
  replace the same path. That is how you retexture a block without a change to
  the logic file.
