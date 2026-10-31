# Multi-tile objects and stations

An object can cover more than one tile. The placed tile is the **anchor**. The
other tiles belong to the anchor.

## Make an object cover two tiles

Add `kurblanc:occupancy` with a width and a height:

```json
{
  "kurblanc:layer": "object",
  "kurblanc:placeable": true,
  "kurblanc:occupancy": [2, 1],
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/workbench.png" }
  },
  "kurblanc:object": { "height": 0, "sprite_offset": [4, -8] }
}
```

The value is `[width, height]` in tiles, from 1 to 4 per axis. An omitted value
means `[1, 1]`.

The game applies these rules:

- Only the anchor tile stores the block. A covered tile resolves to the anchor
  for placement, targeting, mining, interaction and collision.
- Placement needs the whole rectangle free.
- Mining either covered tile removes the whole block one time.
- A save and a chunk snapshot store the anchor only. The rectangle costs no
  extra save data.
- Walls do not use occupancy. They keep the wall layer and the front-face
  placement rule.

The break particles and the drop use the anchor. Place the anchor art so that
the rectangle reads as one object. `sprite_offset` moves the art into the
covered tiles.

## Protect tiles from mining

`kurblanc:mining_protection` refuses a mining attempt inside a tile rectangle
around the object:

```json
{
  "kurblanc:layer": "object",
  "kurblanc:mining_protection": { "box": [0, 0, 1, 1] }
}
```

`box` is `[dx, dy, width, height]` in tile offsets from the block's own tile.
The origin runs from -8 to 8. Each size is 1 or more. The far edge must stay at
or below 9.

Use this component for a structure that must stay intact, such as a cave mouth.
The player can still walk through the protected tiles.

## Mark a crafting station

Add `kurblanc:station` to an object block:

```json
{
  "kurblanc:layer": "object",
  "kurblanc:station": {},
  "kurblanc:placeable": true,
  "kurblanc:label": "Workbench",
  "kurblanc:occupancy": [2, 1]
}
```

The value must be an empty object. The station holds no contents and adds no
save state.

A recipe joins the station's set when its `station` field names the block:

```json
{
  "id": "mypack:stone_axe",
  "ingredients": [
    { "item": "mypack:stone", "count": 3 },
    { "item": "mypack:sticks", "count": 2 }
  ],
  "output": { "item": "mypack:stone_axe", "count": 1 },
  "station": "mypack:workbench"
}
```

- A recipe without `station` stays in hand crafting.
- The game rejects a recipe when its station block does not exist, is not on the
  object layer, or has no `kurblanc:station` component.
- Interacting with the station opens the inventory on its recipe set.
- A station within reach also enables its button in the crafting panel.
- Walking away, removing the station, changing level or dying returns the panel
  to hand crafting. Station recipes then become uncraftable.

Search, categories, the craftable filter, shift-crafting and the output-capacity
check work inside each set.

See [`kurblanc:occupancy`](/reference/components/blocks#kurblanc-occupancy),
[`kurblanc:mining_protection`](/reference/components/blocks#kurblanc-mining-protection)
and [`kurblanc:station`](/reference/components/blocks#kurblanc-station) for the
field tables.
