# Format changelog

This wiki documents one build at a time. There is no invented release number: the
game has no public version that matches a pack format, so the build commit and
date are the identity.

## D25 — build `7050b38` — 2026-10-28

The current documented format.

- No catalogues: `LP/blocks.json`, `LP/items.json`, `LP/mobs.json`,
  `terrain_texture.json` and `entity_texture.json` are gone. The loader enumerates
  folders from a zip entry table or a dev-folder listing.
- Definitions name textures by AP-relative path. Asset packs override by path.
- Walls are one combined `192×83` sheet; the two-file top/front split is gone.
- Doors and gates are one file with `closed` and `open` toggle states. The loader
  generates `${id}_open`.
- Items are one file each under `LP/items/` with `kurblanc:block_placer`. Items are
  no longer derived from blocks.
- Entities are one file each under `LP/entities/`, one packed sheet per animation.
  Per-frame folders and `entity_texture.json` are gone.
- Logic packs, asset packs and bundles install separately.
- Content IDs are namespaced in files, saves and network traffic; numeric indices
  stay in memory.
- Versions coexist; a world pins its exact pack set.
- Multiplayer verifies a content fingerprint before world sync.

The D25 design also introduced the pack manager and zip import. Those pages are
marked **not in the public build yet** until the build ships.

## Pre-D25 — the public build and `Kurblanc-Samples` `v0.2.0`

The public game still loads an intermediate format:

- `LP/blocks.json` lists the active block files.
- `AP/textures/terrain_texture.json` maps short texture keys to paths.
- Doors use separate `*_open.json` files.
- Walls use separate `*_wall_top.png` and `*_wall_front.png` images.
- Items and entities are already per-file, but use the older item shape.
- `LP/recipes/` and `LP/worldgen/` may be present in the sample pack.

This is **not** the format the wiki documents. Use
[Legacy catalogues](/reference/legacy-catalogues) to convert.
