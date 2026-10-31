# Entities

An entity is one JSON file in `LP/entities/`. It defines the simulation:
health, movement, collision, behavior, combat, spawning and loot. Its animation
images live in an AP. You can describe the animations in this file with
`kurblanc:render`, or in a separate AP presentation file. The example below uses
the inline form.

The example below shows a passive creature. It also references a grass block, a
loot table and animation PNGs. Create those files, or substitute IDs and paths
from your pack before you load it. Start by copying a similar working creature.
Then change one part at a time.

```json
{
  "kurblanc:format": 1,
  "kurblanc:entity": {
    "description": { "identifier": "mypack:wisp" },
    "components": {
      "kurblanc:health": { "value": 4 },
      "kurblanc:movement": { "value": 2.1 },
      "kurblanc:collision_box": { "width": 0.7, "height": 0.5 },
      "kurblanc:behavior": {
        "kind": "passive",
        "panic_speed": 3.2,
        "panic_seconds": 2.4,
        "wander_min": 1.2,
        "wander_max": 3.5,
        "sight": 0,
        "attack_damage": 0,
        "attack_interval": 0,
        "attack_reach": 0
      },
      "kurblanc:combat": {
        "knockback": 3.25,
        "knockback_cap": 8.875,
        "knockback_decay": 12,
        "invulnerability_seconds": 0.5,
        "death_seconds": 0.8
      },
      "kurblanc:spawn": {
        "role": "passive",
        "min_light": 6,
        "max_light": 15,
        "interval_seconds": 24,
        "attempts": 6,
        "tries": 12,
        "group": [1, 2],
        "min_distance": 22,
        "max_distance": 64,
        "max_per_column": 2,
        "floors": ["mypack:grass"]
      },
      "kurblanc:sound": "wisp",
      "kurblanc:loot": { "table": "mypack:wisp" },
      "kurblanc:render": {
        "pixelScale": 2,
        "feet": 0,
        "alpha": 1,
        "variantMode": "none",
        "sourceFacing": "left",
        "strips": {
          "idle": {
            "texture": "textures/entities/wisp/idle.png",
            "cell": [8, 8],
            "frames": 2,
            "fps": 4,
            "loop": true
          },
          "walk": {
            "texture": "textures/entities/wisp/walk.png",
            "cell": [8, 8],
            "frames": 4,
            "fps": 8,
            "loop": true
          }
        }
      }
    }
  }
}
```

`kurblanc:format` must be `1`. `description.identifier` is the entity ID. By
convention, the filename matches its local part.

## Required components

| Component | Fields | Notes |
|---|---|---|
| `kurblanc:health` | `value` 1–1000 | Hit points. |
| `kurblanc:movement` | `value` 0.1–40 | Blocks per second while wandering. |
| `kurblanc:collision_box` | `width`, `height` 0.1–8 | Footprint in blocks. |
| `kurblanc:behavior` | see below | Passive or hostile steering. |
| `kurblanc:combat` | see below | Knockback and death timing. |
| `kurblanc:spawn` | see below | Natural spawning rules. |

`kurblanc:health`, `kurblanc:movement` and `kurblanc:collision_box` also accept
the `minecraft:` alias.

## Behavior

| Field | Range | Notes |
|---|---|---|
| `kind` | `passive`, `hostile` | Hostile mobs need sight and an attack interval. |
| `panic_speed` | 0.1–40 | Must be at least `movement`. |
| `panic_seconds` | 0–60 | Flee duration after damage. |
| `wander_min` / `wander_max` | 0.05–60 | Idle walk interval. `wander_min` cannot exceed `wander_max`. |
| `sight` | 0–128 | Detection range. |
| `attack_damage` | 0–100 | Passive mobs must use 0. |
| `attack_interval` | 0–60 | Seconds between hits. |
| `attack_reach` | 0–4 | Attack distance in blocks. |

An optional `hop` object gives a bouncing walk. It has `variance` 0–0.5, `duration`
0.05–5, `pause` 0.05–10 and `height` 0.1–4 (default 0.75). It also has optional
`distance` 0.05–16 and `range` 0–128.

## Combat

| Field | Range |
|---|---|
| `knockback` | 0–40 |
| `knockback_cap` | 0–40. Not below `knockback` |
| `knockback_decay` | 0–120 |
| `invulnerability_seconds` | 0–5 |
| `death_seconds` | 0.05–10 |

## Variants

`kurblanc:variants.palette` is a non-empty array. Each entry has:

| Field | Notes |
|---|---|
| `tint` | `#rrggbb` recolor. |
| `weight` | 0.0001–100000. Relative spawn weight. |
| `damage` | Optional 0–100 override. |
| `loot_table` | Optional namespaced loot table for this variant. |

Use `variantMode: "mask"` in the render component when variants must recolor
through a mask. Every animation then needs a `mask` path.

## Spawning

| Field | Range | Notes |
|---|---|---|
| `role` | `passive`, `hostile` | Hostile spawns require hostile behavior. |
| `min_light` / `max_light` | 0–15 | Inclusive light window. |
| `interval_seconds` | 0.5–600 | Spawn attempt cadence. |
| `night_interval_seconds` | 0.5–600 | Optional night override. |
| `group` | `[min, max]` 1–8 | Ascending integers. |
| `attempts` | 1–32 | |
| `tries` | 1–64 | |
| `max_per_column` | 0–16 | Default 2. |
| `min_distance` / `max_distance` | 2–256 | From the player. Max must not be below min. |
| `floors` | block ID array | Optional. Each must be a floor block. |

## Rendering

`kurblanc:render` is the inline render component. It accepts `pixelScale` 1–4
(default 2), `feet` 0–32, `alpha` 0.05–1 and `strips`. It also accepts
`variantMode` `none` / `tint` / `mask` and `sourceFacing` `left` / `right`.

Each animation strip needs `texture`, `cell: [width, height]`, `frames`, `fps` and
`loop`. The `mask` field is optional unless `variantMode` is `mask`. A strip is one
horizontal row with a one-pixel transparent gap between cells. Its width is
`cell.width * frames + (frames - 1)` and its height is `cell.height`. A missing
action falls back to `idle`.

`kurblanc:render` names texture files supplied by the AP. The loader also accepts
`AP/presentation/entities/<name>.json`. An inline render component takes priority
over a separate presentation for that entity. See
[Entity rendering](/entities/rendering).

`kurblanc:footprints` is optional. It accepts `{ "legs": 0 }`, `2` or `4`
(default `2`) and sets how many feet leave snow prints. Use `0` for a slime and
`4` for a four-legged animal.

## Loot and sound

- `kurblanc:loot.table` names a file in `LP/loot_tables/<name>.json`. Do not also
  use `kurblanc:drops`.
- `kurblanc:sound` is a sound-set name such as `"wisp"`. The events live in the
  asset pack's `sounds.json`.

## Trying it

`/summon mypack:wisp [count]` spawns one to twenty, two blocks in front of the
player. Unknown IDs list the loaded roster.

## Validation

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
| `kurblanc:footprints.legs must be 0, 2 or 4` | Use one of the three values. |
| `image is …; a … strip needs height …` | Fix the strip geometry. |
