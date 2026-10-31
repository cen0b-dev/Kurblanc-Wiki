# Limits

These are engine limits, not style advice. They apply to every pack.

| Limit | Value |
|---|---|
| Blocks in the palette | 65536 |
| Light levels | 0–15 |
| Tile size | 32×32 px |
| Bundled placeable-item stack size | 512 (each item declares its own `maxStack`) |
| Files in one pack | 4096 |
| One pack, uncompressed | 256 MiB |
| One file | 32 MiB |
| One JSON file | 4 MiB |
| One image | 16 MiB, 4096 px per side |
| Path length | 180 characters |
| Path depth | 12 segments |
| One `.kbpack` archive | 64 MiB |
| Variant strip | 64 frames, 256 px cells |

A limit breach rejects the whole pack. The game loads nothing partially.

## IDs

- Pattern: `namespace:lower_snake_case`.
- The namespace is yours. The `kurblanc` namespace belongs to the built-in content.
- By convention, the basename of a definition file matches the local part of the ID:
  `LP/blocks/stone_tile.json` → `mypack:stone_tile`.
- A bare identifier uses the pack namespace. A full ID is clearer.

## Texture paths

- A block names a PNG under `textures/`.
- A path is relative, uses `/`, ends in `.png`, and holds no `..` segments.
- A later asset pack wins when two packs supply the same path.
- A door is one block file with `kurblanc:door`. The loader generates its open
  state.

## Crops and offsets

- `rect`: `[x, y, width, height]`, origin 0 or greater, size greater than 0.
- `sprite_offset` and `vertical_offset`: `[x, y]`, finite numbers.
- `contact_shadow`: center 0–32, radii greater than 0 and at most 16.
- `vertical_masks`: integers 0–15.
- `foliage.canopyEnd`: greater than 0 and less than 1.
- `foliage.leafTextures`: 1–32 texture paths.
- `variant_weights`: one positive integer per strip frame.

## Packs and worlds

- A pack has exactly one module: `data` for an LP, `resources` for an AP.
- An add-on can ship an LP and an AP. The dependency is optional. Linked folders
  and world stacks resolve the two halves independently.
- A world remembers the packs that you saved it with. The game reports missing
  content. It does not replace the content.
- A later logic pack overrides an earlier definition with the same ID.
- Asset packs can overlap freely. The order decides the winner.
- Share a `.kbpack` or `.kbaddon` when another creator needs the files.
  Multiplayer guests receive assets from the host through the game.
