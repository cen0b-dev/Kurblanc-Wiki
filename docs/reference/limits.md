# Limits

These are engine limits, not style advice. They apply to every pack.

| Limit | Value | Notes |
|---|---|---|
| Blocks | 256 | A door's generated open state counts as a block. `kurblanc:air` must be first. |
| Light levels | 0–15 | Emission is 1–15; opacity is 0–15. |
| Tile size | 32×32 px | Art is drawn at integer pixel scale. |
| Wall sheet | 192×83 px | Top `192×64` at `(0, 0)`, front `64×19` at `(0, 64)`. |
| Default stack | 512 | Override with `kurblanc:max_stack`. |
| Player definitions | 1 | Exactly one active logic pack may provide `player.json`. |

## IDs

- Pattern: `namespace:lower_snake_case`.
- The namespace is yours; `kurblanc` belongs to the built-in pack.
- A definition file's basename equals the local part:
  `LP/blocks/stone_tile.json` → `mypack:stone_tile`.
- References are always fully namespaced. A bare name is an error.

## Texture paths

- Start with `textures/`.
- End with `.png`.
- No `..` segments.
- Resolved against the active asset packs; the higher-priority pack wins when two
  supply the same path.

## Crops and offsets

- `rect`: `[x, y, width, height]`, origin 0 or greater, size greater than 0.
- `sprite_offset`: `[x, y]`, finite numbers.
- `contact_shadow`: radii 0–16.
- `vertical_masks`: integers 0–15.
- `foliage.canopyEnd`: greater than 0, less than 1.
- `foliage.leafTextures`: 1–32 paths.

## Packs

- Versions coexist; a world pins the exact set it was saved with.
- A bundle installs as one logic pack and one asset pack.
- Logic packs cannot redefine another active logic pack's IDs.
- Asset packs may overlap freely; order decides.
- Dev folders and different game builds cannot be sent over the network.
