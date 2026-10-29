# Your first block

We will add a placeable stone floor tile. It needs four files: two manifests, one
block definition, one item definition, and one texture.

The namespace is `mypack`. The local ID is `stone_tile`, so the block file is
`LP/blocks/stone_tile.json` and the texture is
`textures/blocks/stone_tile.png`.

## 1. Make the folders

```
public/packs/my_pack/
  LP/
    manifest.json
    blocks/stone_tile.json
    items/stone_tile.json
  AP/
    manifest.json
    textures/blocks/stone_tile.png
```

`my_pack` is the dev-folder name. You will select it with `?pack=my_pack`.

## 2. Write the Logic Pack manifest

`LP/manifest.json`:

```json
{
  "format_version": 2,
  "header": {
    "name": "My Pack",
    "description": "Adds a stone floor tile",
    "uuid": "11111111-1111-4111-8111-111111111111",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "11111111-1111-4111-8111-111111111112",
      "version": [1, 0, 0]
    }
  ]
}
```

Use your own UUIDs. The header and module UUIDs must be different, and a header
UUID identifies the pack across versions.

## 3. Write the Asset Pack manifest

`AP/manifest.json`:

```json
{
  "format_version": 2,
  "header": {
    "name": "My Pack Assets",
    "description": "Textures for My Pack",
    "uuid": "22222222-2222-4222-8222-222222222221",
    "version": [1, 0, 0]
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
  "format_version": "1.21.0",
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_tile" },
    "components": {
      "kurblanc:layer": "floor",
      "kurblanc:color": "#8d8978",
      "kurblanc:label": "Stone Tile",
      "kurblanc:destructible_by_mining": { "seconds_to_destroy": 0.8 },
      "kurblanc:opacity": 0,
      "kurblanc:material_instances": {
        "*": { "texture": "textures/blocks/stone_tile.png" }
      }
    }
  }
}
```

A floor tile is walkable; do not set `kurblanc:collision_box` to `true` on a
floor. The texture path is relative to the Asset Pack, not the block file.

## 5. Make it placeable

D25 does not invent items from blocks. A block with no item cannot be held, so
add `LP/items/stone_tile.json`:

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

The label, icon and 512 stack limit come from the placed block by default.

## 6. Draw the texture

Create a 32×32 PNG at `AP/textures/blocks/stone_tile.png`. Nearest-neighbour
scaling is used, so keep pixels hard. Transparent pixels are allowed.

## 7. Load it

Start the development build and open the dev folder:

```
http://localhost:5173/?pack=my_pack
```

Open the creative catalog or materials browser and place the tile. In a D25
build, a dev-folder change reloads the page and the new content appears on the
next load.

## When it does not load

The error names the file and the field. The common ones:

| Message | Fix |
|---|---|
| `description.identifier must be namespace:lower_snake_case` | Use `mypack:stone_tile`, lowercase. |
| `must match the file name` | Rename the file to the ID's local part: `stone_tile.json`. |
| `must be an AP path` | Use `textures/blocks/stone_tile.png`, not `stone_tile` or an absolute path. |
| `kurblanc:collision_box must be a boolean` | Use `true` or `false`, not `"true"`. |
| `unknown block` from an item | The item's `block_placer.block` must match a loaded block ID exactly. |

See [Validation errors](/reference/validation-errors) for the full list.

## Next

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Block components](/reference/components/blocks)
