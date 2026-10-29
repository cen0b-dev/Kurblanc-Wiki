# Limits

These are engine limits, not style advice. They apply to every pack.

| Limit | Value |
|---|---|
| Blocks in the palette | 65536 |
| Light levels | 0–15 |
| Tile size | 32×32 px |
| Default stack | 512 |
| Files in one pack | 4096 |
| One pack, uncompressed | 256 MiB |
| One file | 32 MiB |
| One JSON file | 4 MiB |
| One image | 16 MiB, 4096 px per side |
| Path length | 180 characters |
| Path depth | 12 segments |
| One `.kbpack` archive | 64 MiB |
| Variant strip | 64 frames, 256 px cells |

A limit breach rejects the whole pack. Nothing is loaded partially.

## IDs

- Pattern: `namespace:lower_snake_case`.
- The namespace is yours; `kurblanc` belongs to the built-in content.
- A definition file's basename equals the local part:
  `LP/blocks/stone_tile.json` → `mypack:stone_tile`.
- A bare identifier uses the pack namespace. A full ID is clearer.

## Texture keys and paths

- A block names a texture key, not a file path.
- `AP/textures/terrain_texture.json` maps the key to a PNG under `textures/`.
- Paths are relative, use `/`, end in `.png`, and contain no `..` segments.
- Later asset packs win when two supply the same key.

## Crops and offsets

- `rect`: `[x, y, width, height]`, origin 0 or greater, size greater than 0.
- `sprite_offset` and `vertical_offset`: `[x, y]`, finite numbers.
- `contact_shadow`: centre 0–32, radii greater than 0 and at most 16.
- `vertical_masks`: integers 0–15.
- `foliage.canopyEnd`: greater than 0 and less than 1.
- `foliage.leafTextures`: 1–32 texture keys.
- `variant_weights`: one positive integer per strip frame.

## Packs and worlds

- A pack has exactly one module: `data` for an LP, `resources` for an AP.
- An add-on is one LP and one AP that depend on each other.
- A world remembers the packs it was saved with. Missing content is reported, not
  replaced.
- Logic packs cannot define the same IDs unless the later pack in the stack wins.
- Asset packs may overlap freely; order decides the winner.
- A linked dev folder cannot be sent to another player. Share a `.kbpack` or
  `.kbaddon`.
