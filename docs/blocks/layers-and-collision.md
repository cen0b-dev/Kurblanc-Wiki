# Layers and collision

Every block occupies exactly one layer. The layer decides what the renderer draws
and what the player can walk through.

| Layer | Use for | Collision | Drawn as |
|---|---|---|---|
| `floor` | Ground, flooring, water | Never solid | Base tile |
| `wall` | Walls, windows, fences, gates | Solid by default | Wall top plus front face |
| `object` | Torches, trees, furniture | Solid by default | Raised sprite with depth |

Set it with `kurblanc:layer`. If you omit it, a block with a `kurblanc:wall`
component becomes a wall; everything else becomes a floor. **Objects must set
`"kurblanc:layer": "object"` explicitly**, or they will be treated as floors.

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

Collision is independent of light. A framed window can be solid and still pass
light; a tall grass tuft can be passable and still block light.

## Mining and drops

`kurblanc:destructible_by_mining.seconds_to_destroy` sets the mining time. Omitting
the component leaves the block unbreakable; `"kurblanc:destructible_by_mining": false`
says the same thing explicitly.

Drops are a list of namespaced items:

```json
{
  "kurblanc:drops": [{ "item": "mypack:stone", "count": 4 }]
}
```

The item must exist in an active logic pack. The loader validates drops after all
packs are registered, so a drop can come from another pack.

## Doors, gates and pairs

`kurblanc:toggle_states` turns one definition into two runtime blocks:
`mypack:door_wood` and `mypack:door_wood_open`. Shared components are written
once; each state overrides what differs. The closed state must be placeable, the
open state must not be, and the loader cross-links them automatically.

`kurblanc:pair` groups two matching doors or gates so they mirror and toggle
together. Give both halves the same pair string.

## Reference

- [`kurblanc:layer`](/reference/components/blocks#kurblanc-layer)
- [`kurblanc:collision_box`](/reference/components/blocks#kurblanc-collision-box)
- [`kurblanc:destructible_by_mining`](/reference/components/blocks#kurblanc-destructible-by-mining)
- [`kurblanc:toggle_states`](/reference/components/blocks#kurblanc-toggle-states)
