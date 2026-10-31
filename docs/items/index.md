# Items

An item is one JSON file in `LP/items/`. Save the file directly in that folder,
then reload the pack to add the item. Item files do not use a `kurblanc:format`
marker. They are plain objects.

Here is a tool item. Its icon image belongs at
`AP/textures/items/stone_axe.png`:

```json
{
  "id": "mypack:stone_axe",
  "label": "Stone axe",
  "maxStack": 1,
  "icon": { "texture": "textures/items/stone_axe.png" },
  "categories": ["items", "tools"],
  "tool": {
    "kind": "axe",
    "tier": 2,
    "speed": 4,
    "maxDurability": 132,
    "attackDamage": 1
  }
}
```

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `namespace:lower_snake_case`. A bare name uses the pack's namespace. |
| `label` | string | yes | Display name. |
| `maxStack` | integer | yes | Greater than zero. Tools must use `1`. |
| `block` | block ID | no | Makes the item placeable. The block must exist in the active stack. |
| `icon` | object | yes | `{ "block": "mypack:stone_tile" }` for a block preview, or `{ "texture": "textures/items/stone_axe.png" }` for AP art. |
| `categories` | string array | no | Lower-snake-case names used by inventory filters. |
| `tool` | object | no | Turns the item into a tool. See below. |

## Placeable items

A block does not become an item by itself. Give the item a `block` reference:

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

The item does not copy the label and art of the placed block. The game shows the
`label` and `icon` of the item.

## Tools

The `tool` object makes an item mine faster. It also restricts harvesting. It
accepts exactly these fields:

| Field | Type | Notes |
|---|---|---|
| `kind` | `axe`, `pickaxe`, `shovel`, `sword` | Tool family. |
| `tier` | positive integer | Compared with a block's `required_tool.min_tier`. |
| `speed` | positive integer | Mining speed multiplier. |
| `maxDurability` | positive integer | Uses before the tool breaks. |
| `attackDamage` | positive integer | Added melee damage. |

A tool must set `maxStack` to `1`. An unknown field rejects the item.

## Icons

`icon.texture` is an AP-relative path under `textures/`. The path ends in `.png`
and has no `..`. The bundled pack uses 16×16 item icons:

```json
{ "icon": { "texture": "textures/items/stone_floor.png" } }
```

`icon.block` shows a preview of the block. Use it to show the block appearance in
the inventory icon. Then you do not draw a separate item icon.

## Drops

Blocks award items through `kurblanc:drops`:

```json
{
  "kurblanc:drops": [
    { "item": "mypack:stone", "count": 4 },
    { "item": "mypack:gem", "count": 1, "chance": 0.125 }
  ]
}
```

`chance` is optional, from 0 to 1. Each entry rolls independently after a
successful break. The item must exist in the active stack. A block that uses
`kurblanc:loot` cannot also use `kurblanc:drops`.

For weighted pools, tool conditions and nested tables, see
[Drops & loot](/items/drops).

## Recipes

Recipes are in `LP/recipes/`, one file per recipe. See
[Recipes](/items/recipes).

## Validation

Common item errors:

| Message | Fix |
|---|---|
| `missing label` | Add `label`. |
| `expected positive integer` | `maxStack` must be a whole number above zero. |
| `tools require maxStack 1` | Set `maxStack` to `1`. |
| `invalid tool kind` | Use `axe`, `pickaxe`, `shovel` or `sword`. |
| `unknown tool field` | Remove the extra key. |
| `icon needs a known block or AP textures/*.png path` | Fix `icon.block` or `icon.texture`. |
| `unknown block` | The `block` reference does not exist. |
| `duplicate item` | Two files in one pack define the same ID. |
