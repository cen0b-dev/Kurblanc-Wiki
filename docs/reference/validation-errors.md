# Validation errors

Kurblanc fails loudly. A content error names the file and the JSON path, and the
world does not open with a half-loaded pack. This page groups the messages you are
most likely to see.

## Pack and manifest

| Message | Cause |
|---|---|
| `LP/manifest.json: invalid JSON` | A trailing comma or comment in a manifest. |
| `header.uuid and header.name are required` | One manifest header is missing a field. |
| `version must be [major, minor, patch]` | Use three nonnegative integers, e.g. `[1, 0, 0]`. |
| `block "…" is already defined by …` | Two active logic packs define the same namespaced ID. |

## Block file

| Message | Fix |
|---|---|
| `description.identifier must be namespace:lower_snake_case` | Use `mypack:stone_tile`. |
| `description.identifier "…" must match the file name "…"` | Rename the file to the ID's local part. |
| `kurblanc:block must be an object` | The root needs a `kurblanc:block` object. |
| `kurblanc:color must be a #rrggbb string` | Six hex digits, no shorthand. |
| `kurblanc:collision_box must be a boolean` | `true` or `false`, not `"true"`. |
| `kurblanc:opacity must be an integer 0-15` | Use a whole number in range. |
| `kurblanc:destructible_by_mining must be an object` | Use `{ "seconds_to_destroy": 0.8 }`, or `false`. |
| `seconds_to_destroy must be positive` | Mining time must be greater than zero. |
| `kurblanc:light_emission must be an integer 1-15` | Emit at least 1 and at most 15. |
| `kurblanc:drops must be an array` | Use `[{ "item": "mypack:stone", "count": 4 }]`. |
| `kurblanc:material_instances must be an object` | The component needs a `*` (or `up`) entry. |
| `must be an AP path such as "textures/blocks/stone.png"` | Use a relative path under `textures/`, ending in `.png`, with no `..`. |
| `must be [x, y, width, height] with a nonnegative origin and positive size` | Fix the crop or contact shadow. |
| `material tint must be #rrggbb` | Tint colours use six hex digits. |
| `kurblanc:wall.lift must be an integer 0-32` | Wall lift is a source-pixel elevation. |
| `kurblanc:water.bed must be a namespaced block ID` | Use `mypack:sand`, not `sand`. |
| `kurblanc:water.opacity must be from 0 to 1` | Water tint is a fraction, not 0–15. |
| `kurblanc:object.contact_shadow radii must be 0-16` | Keep the width and height at 16 or below. |
| `kurblanc:object.vertical_masks must contain cardinal masks 0-15` | Each mask is a cardinal bitmask. |
| `foliage requires canopyEnd between 0 and 1 and 1–32 leaf texture keys` | Fix the canopy fraction or the leaf list. |

### Toggle states

| Message | Fix |
|---|---|
| `kurblanc:toggle_states must contain exactly "closed" and "open"` | Both keys, no others. |
| `the open state must set kurblanc:placeable to false` | Open doors cannot be placed. |
| `the closed state must be placeable` | The base state is the one an item places. |

### Content registry

These fire after parsing, when the blocks are registered:

| Message | Fix |
|---|---|
| `content: the first block must be "kurblanc:air"` | The built-in pack must provide `kurblanc:air` first. Third-party packs add to it. |
| `content: more than 256 blocks are not supported` | Remove content; open door states count separately. |
| `has an unknown layer` | Use `floor`, `wall` or `object`. |
| `floor … cannot be solid` | Floors are walkable. |
| `shadow must be sprite on a raised block` | Sprite shadows are for walls and objects. |
| `needs an integer opacity 0-15` | The registry double-checks opacity. |

## Items and recipes

| Message | Fix |
|---|---|
| `kurblanc:block_placer names unknown block` | The placed block must exist and be namespaced. |
| `kurblanc:max_stack must be a positive integer` | Use a whole number above zero. |
| `kurblanc:categories must be an array of lower_snake_case category names` | Fix the category list. |
| `unknown item` in a recipe or drop | Define the item, and use its full namespaced ID. |
| `duplicate recipe` | Two logic packs define the same recipe ID. |

## World and pack set

| Message | Fix |
|---|---|
| `Missing packs block opening the world` | Reinstall or enable the exact `uuid + kind + version` set. |
| `host runs a dev pack` / `game versions differ` | Use matching builds and installed zips for multiplayer. |

## Reading an error

1. The path before the colon is the file.
2. The rest names the field or the rule.
3. Fix the definition, not the engine.

If the message is not on this page, the component reference is the next stop:
[Block components](/reference/components/blocks).
