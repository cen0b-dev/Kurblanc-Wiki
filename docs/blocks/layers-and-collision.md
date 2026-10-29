# Layers and collision

Every block occupies exactly one layer. The layer decides how the renderer draws
it and whether the player can walk through it.

| Layer | Use for | Collision | Drawn as |
|---|---|---|---|
| `floor` | Ground, flooring, water | Never solid | Base tile |
| `wall` | Walls, windows, fences, gates | Solid by default | Raised top plus front face |
| `object` | Torches, trees, furniture, doors | Solid by default | Raised sprite with depth |

Set the layer with `kurblanc:layer`. If you omit it, a block with a
`kurblanc:wall` component becomes a wall; everything else becomes a floor.
**Objects must set `"kurblanc:layer": "object"` explicitly**, or they are treated
as floors.

## Collision

`kurblanc:collision_box` is a boolean. Raised blocks collide by default; set it to
`false` to walk through a torch, a low plant or an open door.

```json
{
  "kurblanc:layer": "object",
  "kurblanc:collision_box": false
}
```

Floors cannot be solid. A floor with `"kurblanc:collision_box": true` is a content
error, because the player would be trapped on the tile they stand on.

A solid raised block can use a smaller collision area with `kurblanc:footprint`:

```json
{
  "kurblanc:footprint": {
    "box": [4, 4, 24, 16],
    "group": "fence"
  }
}
```

Collision is independent of light. A framed window can be solid and still pass
light; a tall grass tuft can be passable and still block light.

## Mining

Mining time is set in seconds:

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 1.2,
    "preferred_tool": "pickaxe"
  }
}
```

A preferred tool mines faster. `required_tool` gates harvesting entirely:

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 2,
    "required_tool": { "kind": "pickaxe", "min_tier": 2 }
  }
}
```

Omitting the component gives the default one-second break. `false` is accepted but
does not make a block unbreakable.

## Drops

Drops are a list of items:

```json
{
  "kurblanc:drops": [
    { "item": "mypack:stone", "count": 1 },
    { "item": "mypack:gem", "count": 1, "chance": 0.125 }
  ]
}
```

`chance` is optional, and each entry rolls independently. The item must exist in
an active logic pack. To use a loot table instead, use `kurblanc:loot`; a block
cannot have both. See [Drops & loot](/items/drops) for table conditions and
nested pools.

## Doors and gates

A door is two block files. The closed file is placeable and solid and points at
the open file:

```json
{
  "kurblanc:layer": "object",
  "kurblanc:placeable": true,
  "kurblanc:collision_box": true,
  "kurblanc:toggle": "mypack:door_wood_open"
}
```

The open file points back at the closed block, sets `kurblanc:placeable` to
false, and turns collision off. A double door adds `kurblanc:pair` with the same
value on both leaves so they move together.

## Reference

See [`kurblanc:layer`](/reference/components/blocks#kurblanc-layer),
[`kurblanc:collision_box`](/reference/components/blocks#kurblanc-collision-box),
[`kurblanc:footprint`](/reference/components/blocks#kurblanc-footprint),
[`kurblanc:destructible_by_mining`](/reference/components/blocks#kurblanc-destructible-by-mining),
[`kurblanc:drops`](/reference/components/blocks#kurblanc-drops),
[`kurblanc:toggle`](/reference/components/blocks#kurblanc-toggle) and
[`kurblanc:pair`](/reference/components/blocks#kurblanc-pair) for the field
tables.
