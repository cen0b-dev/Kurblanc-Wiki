# Biomes

One file per biome in `LP/worldgen/biomes/`. The filename is the roster; the
`id` is the identity used by `spawnBiome` and by cave inheritance.

```json
{
  "id": "desert",
  "temperature": 0.84,
  "moisture": 0.18,
  "floor": "mypack:sand",
  "minedFloor": "mypack:sand",
  "tint": "#92905f",
  "detail": "mypack:cave_floor",
  "detailThreshold": 0.06,
  "hilliness": 0.8,
  "tree": "mypack:tree_palm",
  "treeChance": 0.18,
  "treeSpacing": 6,
  "waterThreshold": 1,
  "decorations": [
    { "block": "mypack:dry_grass", "chance": 0.5 },
    { "block": "mypack:pebble", "chance": 0.06 }
  ]
}
```

## Fields

| Field | Type / range | Notes |
|---|---|---|
| `id` | string | Unique. Must match `spawnBiome` when selected. |
| `temperature` | 0–1 | Climate axis. |
| `moisture` | 0–1 | Climate axis. |
| `floor` | floor block | The biome's ground. |
| `minedFloor` | floor block | Optional ground left after mining a raised tile. |
| `tint` | `#rrggbb` | Biome colour used by tinted art and maps. |
| `detail` | floor block | Detail patch material. |
| `detailThreshold` | 0–1 | How often detail patches appear. |
| `hilliness` | 0–1 | Optional local relief strength. |
| `tree` | object block | Tree or plant placed by the generator. |
| `treeChance` | 0–1 | Tree placement chance. |
| `treeSpacing` | integer 3–12 | Optional minimum spacing. |
| `waterThreshold` | 0–1 | Water placement threshold. |

## Decorations

Use either the list form:

```json
{
  "decorations": [
    { "block": "mypack:grass_tuft", "chance": 0.5 },
    { "block": "mypack:pebble", "chance": 0.02 }
  ]
}
```

or the older single form:

```json
{
  "decoration": "mypack:grass_tuft",
  "decorationChance": 0.5
}
```

A biome cannot define both. Decorations are object-layer blocks.

## Layer rules

The generator checks every reference:

- `floor`, `minedFloor` and `detail` must be floor blocks.
- `tree` must be an object block.
- Every decoration must be an object block.

A wrong layer rejects the worldgen configuration by name.

## Climate

`temperature` and `moisture` place the biome in a two-axis climate field. The
generator blends neighbouring centres (`biomeBlend`) and warps the field
(`warp`), so boundaries are not straight lines. `spawnBiome` chooses the biome
around the starting area, and the spawn clearing stays free of trees.

## Caves

Cave levels inherit the surface biome at the same coordinates. A biome can
therefore carry its own cave palette through the blocks it names in
`worldgen/settings.json`; see [Worldgen settings](/worldgen/).

## Validation

| Message | Fix |
|---|---|
| `biome IDs must be unique` | Rename one `id`. |
| `biome … needs a climate centre from 0 to 1` | Fix temperature or moisture. |
| `biome … needs a #rrggbb tint` | Fix the tint. |
| `invalid probability in biome …` | Check detail, tree or water chance. |
| `biome … cannot define both decoration and decorations` | Remove one form. |
| `biome … decorations need a block and a chance from 0 to 1` | Fix the entry. |
| `block … has the wrong layer` | Use a floor for ground, an object for trees and decorations. |
