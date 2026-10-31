# Your first block

This tutorial adds a stone floor tile to the creative inventory. You will make
two small packs: one for the block and item, and one for their texture.

Use a text editor, a PNG editor and a spare creative world. Enable the built-in
logic and asset packs in that world. This add-on supplies only the new tile.

We will call the block `mypack:stone_tile`. The namespace `mypack` is a prefix
that keeps your IDs separate from the IDs of other creators. Name the file
`stone_tile.json` to keep it easy to find. The ID inside the file is what
matters.

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

The dependency UUID matches the asset pack's `header.uuid` below. It tells the
game this LP needs that AP. The four UUIDs in these two examples work together.
When you publish your own pack, generate four new UUIDs. Then update the
dependency to match your new AP header UUID. Keep them unchanged when you update
that pack.

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

This block goes on the `floor` layer, so you can walk over it. The `color`
component supplies the fallback color and break particles. The mining component
sets the base break time to 0.8 seconds.

`material_instances.*.texture` points to the PNG inside your AP. Do not include
`AP/` in this path. You can also use a texture key from an AP catalog, but this
example uses the path directly.

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

The `block` field sets what the game places. `icon` can name a block or a
texture path under `textures/`.

## 6. Draw the texture

Create a 32×32 PNG at `AP/textures/blocks/stone_tile.png`. The game scales pixels
nearest-neighbor, so keep edges hard. You can use transparent pixels.

## 7. Load it

In Kurblanc, open **Workshop**, choose **Link a folder**, and pick `my-addon/`.
The game finds the LP and AP and lists both as linked packs. Add both to your
creative world's pack list, after the built-in packs, then enter the world.
Open the inventory, search for **Stone Tile**, put it on the hotbar and place it.
You should be able to walk across it and mine it.

Mining removes this example tile without dropping an item. To make it drop
itself, add this component beside `kurblanc:layer` in the block file:

```json
{ "kurblanc:drops": [{ "item": "mypack:stone_tile", "count": 1 }] }
```

This is a component fragment, not a replacement for the whole file. The other
small JSON examples in the block guides use the same convention.

After an edit, rescan the linked folder or run `/reload` inside the world.

## When it does not load

The error names the file and the field. These are the most common errors:

| Message | Fix |
|---|---|
| `block files use "kurblanc:format": 1` | Add `"kurblanc:format": 1` at the top of the block file. |
| `Kurblanc manifests use kurblanc.schema` | Remove `format_version` from the manifest and add `kurblanc.schema`. |
| `header.uuid must be a UUID` | Use a real UUID, not a short name. |
| `A pack must contain exactly one module` | An LP has one `data` module. An AP has one `resources` module. |
| `texture is not provided by any active asset pack` | Check the path against the AP. |
| `unknown block` from an item | The item's `block` must match a loaded block ID. |

See [Validation errors](/reference/validation-errors) for the full list.

## Next

- [Layers and collision](/blocks/layers-and-collision)
- [Textures and tiling](/blocks/textures-and-tiling)
- [Block components](/reference/components/blocks)
