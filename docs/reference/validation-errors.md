# Validation errors

Start with the file name in the error. Open that file, then find the named field.
Check its spelling, type and references. After you fix it, rescan or reload.

A failed content reload keeps the previous valid content active. The errors below
follow the file that you probably edit.

## Manifest

| Message | Fix |
|---|---|
| `Kurblanc manifests use kurblanc.schema` | Remove `format_version`. Use `kurblanc.schema`. |
| `header.uuid must be a UUID` | Use a UUID for the header, not a name. |
| `header.name must be a non-empty string` | Give the pack a display name. |
| `kurblanc.namespace must be lower_snake_case` | Use `mypack`, not `MyPack`. |
| `kurblanc.min_engine must be a major.minor.patch version string` | Use a value such as `0.1.1`. |
| `a pack must contain exactly one module` | An LP has one `data` module. An AP has one `resources` module. |
| `format_version` / `header.min_engine_version` | The game does not interpret Minecraft keys. Use the Kurblanc keys. |

## Block file

| Message | Fix |
|---|---|
| `block files need "kurblanc:format": 1` | Add the marker at the top of the file. |
| `Block definition missing kurblanc:block.description.identifier` | Add the block ID. |
| `must be namespace:name in lower_snake_case` | Use `mypack:stone_tile`. |
| `kurblanc:color must be #rrggbb` | Six hex digits, no shorthand. |
| `kurblanc:collision_box must be a boolean` | Use `true` or `false`, not `"true"`. |
| `kurblanc:opacity needs an integer opacity 0-15` | Use a whole number in range. |
| `seconds_to_destroy must be finite and nonnegative` | Use 0 or more. |
| `preferred_tool must be a tool kind` | Use `axe`, `pickaxe`, `shovel` or `sword`. |
| `required_tool needs a tool kind and nonnegative min_tier` | Check the object. |
| `kurblanc:drops must be an array` | Use `[{ "item": "mypack:stone", "count": 1 }]`. |
| `drop chance must be a number between 0 and 1` | Fix the chance. |
| `texture is not provided by any active asset pack` | Fix the path or enable the AP. |
| `rect must have nonnegative origin and positive size` | Fix the crop. |
| `kurblanc:wall.lift must be an integer 0-32` | Use a source-pixel elevation. |
| `kurblanc:water needs a bed block` | Use a floor block ID. |
| `water opacity must be between 0 and 1` | Water tint is a fraction, not 0–15. |
| `kurblanc:object.contactShadow needs a tile-local center and radii 0-16` | Fix the shadow. |
| `kurblanc:object.verticalMasks must contain cardinal masks 0-15` | Fix the masks. |
| `foliage requires canopyEnd between 0 and 1 and 1–32 leaf texture paths` | Fix the canopy. |
| `variant_rects is gone` | Declare `cell` on the material instance instead. |

### Content registry

These errors fire after parsing, when the game registers the blocks:

| Message | Fix |
|---|---|
| `the first block must be "kurblanc:air"` | The built-in pack supplies air. Third-party packs add to it. |
| `blocks exceed the 65536-slot palette` | Remove content. |
| `has an unknown layer` | Use `floor`, `wall` or `object`. |
| `floor … cannot be solid` | Floors are walkable. |
| `shadow must be sprite on a raised block` | Sprite shadows are for walls and objects. |
| `kurblanc:door must contain exactly closed and open` | Fix the door component. |
| `kurblanc:door needs kurblanc:layer "object"` | Doors are object-layer blocks. |
| `kurblanc:door.closed needs a texture path` | Give the closed state a texture. |
| `kurblanc:door.<state>.<key> is not a door state field` | Remove the unknown state override. |
| `the closed door must be placeable` | Do not set `kurblanc:placeable` to false on the base. |
| `kurblanc:door cannot be combined with kurblanc:toggle` | Remove the old two-file toggle. |

## Items and recipes

| Message | Fix |
|---|---|
| `missing label` | Add `label`. |
| `expected positive integer` | `maxStack` is a whole number above zero. |
| `tools require maxStack 1` | A tool must stack to 1. |
| `invalid tool kind` | Use `axe`, `pickaxe`, `shovel` or `sword`. |
| `unknown tool field` | Remove the extra tool key. |
| `icon needs a known block or AP textures/*.png path` | Fix the icon. |
| `unknown block` | The item's `block` must exist. |
| `unknown item` in a recipe or drop | Define the item, with the right namespace. |
| `recipe needs ingredients` | Add at least one ingredient. |
| `duplicate block` / `duplicate item` / `duplicate recipe` | Two files in one pack define the same ID. A later pack can override an earlier pack. |

## Entities

| Message | Fix |
|---|---|
| `description.identifier … must be namespace:name` | Use `mypack:wisp`. |
| `kurblanc:behavior.kind must be "passive" or "hostile"` | Fix the kind. |
| `panic_speed must not be slower than movement` | Raise panic speed. |
| `a passive mob cannot deal attack damage` | Set damage to 0. |
| `a hostile mob needs a sight range and an attack interval` | Set both above 0. |
| `kurblanc:spawn.floors names unknown block` | Use a loaded block ID. |
| `spawn floor … must be a floor block` | Spawn floors cannot be walls or objects. |
| `animations.<action> needs a mask` | Add masks or change `variantMode`. |

## World and packs

| Message | Fix |
|---|---|
| `required by … but not available` | Enable or reinstall the dependency. |
| `needs … or newer` | Update the dependency. |
| `the world stack has no available logic pack` | Enable at least one LP. |
| `the world stack has no worldgen configuration` | Add `worldgen/settings.json` to a logic pack. |
| `the first block in a world stack must be kurblanc:air` | Keep the built-in pack in the stack. |

## Still stuck?

Make sure the world has both halves of your add-on enabled. An unknown block or
item usually means a misspelled ID or a missing LP. A missing texture usually
means a wrong path or a missing AP. IDs contain colons, so read the whole error.
Do not split the error at the first colon.

For field types and defaults, see
[Block components](/reference/components/blocks).
