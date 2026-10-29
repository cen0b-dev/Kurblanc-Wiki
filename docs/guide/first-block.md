# Your first block

This walkthrough adds a placeable stone floor tile. It needs two manifests, one
block file, one item file and one texture.

The namespace is `mypack`. The block's ID is `mypack:stone_tile`, so its file is
`LP/blocks/stone_tile.json`.

## 1. Make the folder

```
my-addon/
  LP/
    manifest.json
    blocks/stone_tile.json
    items/stone_tile.json
  AP/
    manifest.json
    textures/blocks/stone_tile.png
```

## 2. Write the logic manifest

`LP/manifest.json`:

```json
{
  "header": {
    "name": "Stone Tile",
    "description": "Adds a stone floor tile",
    "uuid": "11111111-1111-4111-8111-111111111111",
    "version": [1, 0, 0]
  },
  "kurblanc": {
    "schema": 1,
    "namespace": "mypack",
    "min_engine": "0.1.1"
  },
  "modules": [
    {
      "type": "data",
      "uuid": "11111111-1111-4111-8111-111111111112",
      "version": [1, 0, 0]
    }
  ],
  "dependencies": [
    {
      "uuid": "22222222-2222-4222-8222-222222222221",
      "version": [1, 0, 0]
    }
  ]
}
```

The dependency UUID must match the asset pack's `header.uuid` in the next step.
Use your own UUIDs everywhere; a header UUID identifies the pack.

## 3. Write the asset manifest

`AP/manifest.json`:

```json
{
  "header": {
    "name": "Stone Tile Assets",
    "description": "Texture for Stone Tile",
    "uuid": "22222222-2222-4222-8222-222222222221",
    "version": [1, 0, 0]
  },
  "kurblanc": {
    "schema": 1,
    "namespace": "mypack",
    "min_engine": "0.1.1"
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "22222222-2222-4222-8222-222222222222",
      "version": [1, 0, 0]
    }
  ]
}
```

## 4. Write the block

`LP/blocks/stone_tile.json`:

```json
{
  "kurblanc:format": 1,
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_tile" },
    "components": {
      "kurblanc:layer": "floor",
      "kurblanc:color": "#8d8978",
      "kurblanc:label": "Stone Tile",
      "kurblanc:destructible_by_mining": { "seconds_to_destroy": 0.8 },
      "kurblanc:material_instances": {
        "*": { "texture": "textures/blocks/stone_tile.png" }
      }
    }
  }
}
```

The texture path is relative to the asset pack, starts with `textures/` and ends
in `.png`.

## 5. Make it placeable

A block does not become an item by itself. Add `LP/items/stone_tile.json`:

```json
{
  "id": "mypack:stone_tile",
  "label": "Stone Tile",
  "maxStack": 512,
  "block": "mypack:stone_tile",
  "icon": { "block": "mypack:stone_tile" },
  "categories": ["blocks"]
}
```

`block` is what gets placed. `icon` can name a block or a texture path under
`textures/`.

## 6. Draw the texture

Create a 32×32 PNG at `AP/textures/blocks/stone_tile.png`. Pixels are scaled
nearest-neighbour, so keep edges hard. Transparent pixels are allowed.

## 7. Load it

In Kurblanc, open **Workshop**, choose **Link a folder**, and pick `my-addon/`.
The game finds the LP and AP and lists both as linked packs. Enable them on a
world, then place the tile from the creative inventory.

After an edit, rescan the linked folder or run `/reload` inside the world.

## When it does not load

The error names the file and the field. The most common ones:

| Message | Fix |
|---|---|
| `block files use "kurblanc:format": 1` | Add `"kurblanc:format": 1` at the top of the block file. |
| `Kurblanc manifests use kurblanc.schema` | Remove `format_version` from the manifest and add `kurblanc.schema`. |
| `header.uuid must be a UUID` | Use a real UUID, not a short name. |
| `A pack must contain exactly one module` | An LP has one `data` module; an AP has one `resources` module. |
| `texture is not provided by any active asset pack` | Check the path against the AP. |
| `unknown block` from an item | The item's `block` must match a loaded block ID. |

See [Validation errors](/reference/validation-errors) for the full list.

## Next

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Block components](/reference/components/blocks)
