# Layers and collision

A world tile can hold a floor, a wall and an object. Each block definition picks
one of these layers. For example, a floor tile can sit under a torch, and the
torch stays.

| Layer | Use for | Collision | Drawn as |
|---|---|---|---|
| `floor` | Ground, flooring, water | Never solid | Base tile |
| `wall` | Walls, windows, fences, gates | Solid by default | Raised top plus front face |
| `object` | Torches, trees, furniture, doors | Solid by default | Raised sprite with depth |

Set the layer with `kurblanc:layer`. If you omit it, a block with a
`kurblanc:wall` component becomes a wall. All other blocks become a floor.
**Objects must set `"kurblanc:layer": "object"` explicitly**, or they are treated
as floors.

## Collision

`kurblanc:collision_box` is a boolean. Raised blocks collide by default. Set it to
`false` to walk through a torch, a low plant or an open door.

```json
{
  "kurblanc:layer": "object",
  "kurblanc:collision_box": false
}
```

Floors cannot be solid. Setting `"kurblanc:collision_box": true` on a floor
rejects the definition. Use a wall or object for an obstacle.

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
light. A tall grass tuft can be passable and still block light.

A multi-tile object collides across its whole rectangle. See [Multi-tile objects
and stations](/blocks/multi-tile).

## Mining

Set the mining time in seconds:

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 1.2,
    "preferred_tool": "pickaxe"
  }
}
```

A matching preferred tool applies its mining-speed multiplier. `required_tool`
requires the named tool family and the minimum tier. The block then needs that
tool before you can harvest it:

```json
{
  "kurblanc:destructible_by_mining": {
    "seconds_to_destroy": 2,
    "required_tool": { "kind": "pickaxe", "min_tier": 2 }
  }
}
```

An omitted component gives the default one-second break. The loader accepts
`false`, but that value does not make a block unbreakable.

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

`chance` is optional. Each entry rolls independently. The item must exist in
an active logic pack. To use a loot table instead, use `kurblanc:loot`. A block
cannot have both. See [Drops & loot](/items/drops) for table conditions and
nested pools.

## Doors and gates

A door is one block file with a `kurblanc:door` component. The `closed` and
`open` fields name a texture. A field can also name an object with a texture
plus art overrides:

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

The loader generates the open state and links both states. It also makes the
open state non-placeable, non-solid and opacity 0. The closed state must be
placeable. The layer must be `object`. A double door adds `kurblanc:pair`
with the same value on both leaves.

## Reference

See [`kurblanc:layer`](/reference/components/blocks#kurblanc-layer),
[`kurblanc:collision_box`](/reference/components/blocks#kurblanc-collision-box),
[`kurblanc:footprint`](/reference/components/blocks#kurblanc-footprint),
[`kurblanc:destructible_by_mining`](/reference/components/blocks#kurblanc-destructible-by-mining),
[`kurblanc:drops`](/reference/components/blocks#kurblanc-drops) and
[`kurblanc:door`](/reference/components/blocks#kurblanc-door) for the field
tables.
