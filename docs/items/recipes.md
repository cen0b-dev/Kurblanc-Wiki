# Recipes

A recipe is one JSON file in `LP/recipes/`. The folder is the roster; there is no
recipe catalogue. The filename is for your reference, the `id` is authoritative.

```json
{
  "id": "mypack:stone_axe",
  "ingredients": [
    { "item": "mypack:stone", "count": 3 },
    { "item": "mypack:sticks", "count": 2 }
  ],
  "output": { "item": "mypack:stone_axe", "count": 1 }
}
```

## Fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | `namespace:lower_snake_case`. Must be unique across the active stack. |
| `ingredients` | array | One or more `{ item, count }` stacks. A recipe with none is rejected. |
| `output` | object | `{ item, count }`. The item and count must be valid. |

All item references use namespaced IDs, or a bare name that takes the pack's
namespace. Every referenced item must exist in the active stack.

## Stack rules

- `count` is a positive integer.
- Repeat ingredients are allowed; their totals must stay within a safe integer.
- Crafting checks the full ingredient set and the output capacity before
  changing the inventory, so a failed craft consumes nothing.
- Two active packs may not define the same recipe ID.

## Drops are not recipes

A block's `kurblanc:drops` list is separate. Recipes are crafted from the
inventory; drops come from breaking a block. Both use `{ item, count }` stacks.

## Validation

| Message | Fix |
|---|---|
| `recipe needs ingredients` | Add at least one ingredient. |
| `unknown item` | Define the item, with the right namespace. |
| `duplicate recipe` | Two active packs use the same recipe ID. |
| `expected positive integer` | Fix the count. |
