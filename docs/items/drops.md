# Drops and loot tables

A block can award items in two ways: an inline `kurblanc:drops` list, or a
namespaced loot table in `LP/loot_tables/`. Use one or the other, not both.

## Inline drops

```json
{
  "kurblanc:drops": [
    { "item": "mypack:stone", "count": 4 },
    { "item": "mypack:gem", "count": 1, "chance": 0.125 }
  ]
}
```

| Field | Notes |
|---|---|
| `item` | Namespaced item ID. Must exist in the active stack. |
| `count` | Positive integer. |
| `chance` | Optional 0–1. Omitted means guaranteed. Each entry rolls independently after a successful break. |

The drop list is metadata on the block; it does not change the resulting
inventory stack. A block that uses `kurblanc:loot` cannot also use
`kurblanc:drops`.

## Loot tables

Loot tables live in `LP/loot_tables/<name>.json`. A block points at one:

```json
{
  "kurblanc:loot": { "table": "mypack:stone" }
}
```

The table file:

```json
{
  "kurblanc:format": 1,
  "id": "mypack:stone",
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "mypack:stone",
          "weight": 1,
          "functions": [
            { "function": "set_count", "count": { "min": 1, "max": 3 } }
          ]
        }
      ]
    }
  ]
}
```

| Field | Notes |
|---|---|
| `kurblanc:format` | Must be `1`. |
| `id` | Namespaced table ID; unique in the active stack. |
| `pools` | 1–64 pools. |
| `rolls` | A number or `{ min, max }`; 0–64. |
| `entries` | 1–64 entries per pool. |
| `weight` | Positive integer; relative pick weight within the pool. |

Entry types:

- `item`: `name` is an item ID; optional `functions`.
- `empty`: no item; `name` is not allowed.
- `loot_table`: `name` is another table; nests.

Conditions:

```json
[
  { "condition": "random_chance", "chance": 0.25 },
  { "condition": "match_tool", "kind": "pickaxe", "min_tier": 2 }
]
```

`random_chance` is 0–1. `match_tool` requires a tool kind (`axe`, `pickaxe`,
`shovel`, `sword`) and an optional `min_tier`.

The only function is `set_count`:

```json
{ "function": "set_count", "count": { "min": 1, "max": 3 } }
```

`count` is a number or `{ min, max }`, from 0 to 512.

## Entities

Entities use the same tables through `kurblanc:loot`:

```json
{ "kurblanc:loot": { "table": "mypack:wisp" } }
```

An entity loot table is not the same as a block drop list. Do not also add
`kurblanc:drops` to the entity.

## Validation

| Message | Fix |
|---|---|
| `drops and loot table cannot both be defined` | Remove one. |
| `kurblanc:drops must be an array` | Use an array of stacks. |
| `drop chance must be a number between 0 and 1` | Fix the chance. |
| `unknown item` | Define the item, with the right namespace. |
| `table` / `pools` errors | Check the table shape and the limits above. |
| `duplicate loot table` | Two active packs use the same table ID. |

## Related

- [Block components](/reference/components/blocks): `kurblanc:drops` and `kurblanc:loot`
- [Items](/items/): item definitions
- [Entities](/entities/): entity loot
