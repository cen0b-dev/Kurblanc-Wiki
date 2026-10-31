# Recipes

A recipe is one JSON file in `LP/recipes/`. The game finds these files without
a recipe index. The filename is for your reference. The `id` is authoritative.

This recipe uses three stones and two sticks to make one axe. Define all
three items in the active packs before you load the recipe.

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
| `id` | string | `namespace:lower_snake_case`. A later logic pack can override the same ID. |
| `ingredients` | array | One or more `{ item, count }` stacks. A recipe with none is rejected. |
| `output` | object | `{ item, count }`. The item and count must be valid. |

All item references use namespaced IDs or a bare name. A bare name takes the
pack's namespace. Every referenced item must exist in the active stack.

## Stack rules

- `count` is a positive integer.
- You can repeat ingredients. Their totals must stay within a safe integer.
- Crafting checks the full ingredient set and the output capacity before
  it changes the inventory. A failed craft consumes nothing.
- Two files in one pack cannot define the same recipe ID. A later logic pack
  can override an earlier pack's recipe.

## Drops are not recipes

A block's `kurblanc:drops` list is separate. You craft recipes from the
inventory. Drops come from breaking a block. Both use `{ item, count }` stacks.

## Validation

| Message | Fix |
|---|---|
| `recipe needs ingredients` | Add at least one ingredient. |
| `unknown item` | Define the item, with the right namespace. |
| `duplicate recipe` | Two files in one pack use the same recipe ID. |
| `expected positive integer` | Fix the count. |
