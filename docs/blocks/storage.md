# Containers

`kurblanc:storage` gives an object or wall block a container. The chest in the
built-in pack is one example.

```json
{
  "kurblanc:layer": "object",
  "kurblanc:placeable": true,
  "kurblanc:label": "Chest",
  "kurblanc:material_instances": {
    "*": { "texture": "textures/blocks/chest_closed.png" }
  },
  "kurblanc:object": { "height": 0, "sprite_offset": [0, -6] },
  "kurblanc:storage": {
    "slots": 32,
    "open": {
      "texture": "textures/blocks/chest_open.png",
      "sprite_offset": [0, -9]
    }
  }
}
```

| Field | Type | Range | Notes |
|---|---|---|---|
| `slots` | integer | 1–64 | The number of stacks that the container holds. |
| `open.texture` | string | a path under `textures/` | The sprite to show while a player has the container open. |
| `open.sprite_offset` | `[x, y]` | finite numbers | Moves the open sprite from the closed position. |

An omitted `open` keeps the closed sprite. The open state is view only. It is
not saved world data.

## What the game does

- Placement creates contents for that tile.
- Opening shows the container beside the inventory. Crafting is hidden while the
  container is open.
- Whole-stack moves, right-click split and deposit-one, and shift-click transfer
  work across the container and the inventory.
- Walking out of reach, changing level, dying, removing the block or
  disconnecting closes the container.
- Mining the block drops one block item and its contents.

Contents are world state, keyed by `level,x,y`. They survive chunk eviction and
world save. An older save starts with no container contents.

## Multiplayer

The host owns the contents. Guests send deposit and withdraw requests. The host
checks the container, the level, the reach, the slot bounds and the request
identity before it changes anything.

A guest reserves a deposit before it sends the request. A retry cannot apply the
same request two times. Guest inventories stay on the guest, so a deposit is not
proof of ownership.

## Restrictions

- `kurblanc:storage` needs an object or wall block. The game rejects a floor
  block.
- The game rejects a slot count outside 1–64.
- The game rejects any key other than `slots` and `open`.

See [`kurblanc:storage`](/reference/components/blocks#kurblanc-storage) for the
field table.
