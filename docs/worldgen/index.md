# Worldgen settings

You do not need worldgen files to add a block or item. Keep the built-in logic
pack enabled. Your add-on then uses its terrain.

To replace terrain generation, add these files to your LP:

```
LP/worldgen/settings.json
LP/worldgen/biomes/<id>.json
```

`settings.json` holds the shared scales and optional systems. Each biome is one
file in `biomes/`. A later logic pack in the stack can have its own settings.
That pack replaces the earlier settings and biome set as a whole. The game reads
biomes from the same pack as the selected settings. A stack with no
`worldgen/settings.json` cannot open a world.

The example below shows the structure. Every `mypack:` block reference needs a
matching definition. This example is not a standalone worldgen pack.

```json
{
  "biomeScale": 200,
  "warp": 40,
  "spawnBiome": "forest",
  "spawnClearRadius": 2,
  "water": "mypack:shallow_water",
  "treeDensityScale": 52,
  "biomeBlend": 0.012,
  "waterScale": 150,
  "hills": {
    "fill": "mypack:dirt",
    "scale": 56,
    "amplitude": 2,
    "mountainScale": 150,
    "mountainAmplitude": 5,
    "mountainThreshold": 0.58
  },
  "surfaceResource": {
    "block": "mypack:pebble",
    "chance": 0.012,
    "nearSpawnCount": 12
  },
  "caves": {
    "level": 1,
    "wall": "mypack:cave_rock",
    "floor": "mypack:cave_floor",
    "scale": 26,
    "warp": 18,
    "tunnelWidth": 0.09,
    "cavernScale": 60,
    "cavernThreshold": 0.84,
    "ambient": 8
  }
}
```

## Required settings

| Field | Range | Notes |
|---|---|---|
| `biomeScale` | 32–1024 | Climate field size. |
| `warp` | 0–256 | Coordinate warp applied to the climate field. |
| `spawnBiome` | biome ID | Must match one loaded biome. |
| `spawnClearRadius` | 2–12 | Tiles kept clear around spawn. |
| `water` | floor block | The water tile used by the generator. |
| `treeDensityScale` | 8–512 | Controls tree density. |
| `biomeBlend` | 0–0.2 | Transition width between biomes. |
| `waterScale` | 32–512 | Water body scale. |

## Optional systems

### Hills

```json
{
  "hills": {
    "fill": "mypack:dirt",
    "scale": 56,
    "amplitude": 2,
    "mountainScale": 150,
    "mountainAmplitude": 5,
    "mountainThreshold": 0.58
  }
}
```

| Field | Range |
|---|---|
| `fill` | terrain-fill floor block |
| `scale` | 16–512 |
| `amplitude` | integer 0–8 |
| `mountainScale` | 32–1024 |
| `mountainAmplitude` | integer 0–8 |
| `mountainThreshold` | 0–1 |

### Surface resources

```json
{
  "surfaceResource": {
    "block": "mypack:pebble",
    "chance": 0.012,
    "nearSpawnCount": 12
  }
}
```

`block` must be an object-layer block. `chance` is 0–1. `nearSpawnCount` is an
integer from 0 to 128. The generator places these blocks near the spawn.

### Caves

```json
{
  "caves": {
    "level": 1,
    "wall": "mypack:cave_rock",
    "floor": "mypack:cave_floor",
    "scale": 26,
    "warp": 18,
    "tunnelWidth": 0.09,
    "cavernScale": 60,
    "cavernThreshold": 0.84,
    "ambient": 8
  }
}
```

| Field | Range |
|---|---|
| `level` | integer 1–3 |
| `wall` | wall-layer block |
| `floor` | floor-layer block |
| `scale` | 8–128 |
| `warp` | 0–64 |
| `tunnelWidth` | 0.005–0.25 |
| `cavernScale` | 16–256 |
| `cavernThreshold` | 0.3–0.95 |
| `ambient` | integer 0–15 |

An optional `terrain` object adds a fill layer. The `fill` field must be a
terrain-fill floor block. `scale` is 16–512 and `amplitude` is an integer 0–8.

## Biomes

Each file in `biomes/` is one biome:

```json
{
  "id": "forest",
  "temperature": 0.44,
  "moisture": 0.7,
  "floor": "mypack:grass",
  "tint": "#657d50",
  "detail": "mypack:grass",
  "detailThreshold": 0,
  "hilliness": 0.85,
  "tree": "mypack:tree_oak",
  "treeChance": 0.62,
  "treeSpacing": 3,
  "waterThreshold": 0.975,
  "decorations": [
    { "block": "mypack:grass_tuft", "chance": 0.5 },
    { "block": "mypack:pebble", "chance": 0.02 }
  ]
}
```

See [Biomes](/worldgen/biomes) for every field and the layer rules.

## Validation

| Message | Fix |
|---|---|
| `the world stack has no worldgen configuration` | Add `worldgen/settings.json` to an active logic pack. |
| `invalid biome scale, warp, spawn radius…` | Check the required ranges. |
| `spawnBiome must exist` | Use a loaded biome ID. |
| `unknown block …` | Fix the block reference or load the pack that defines it. |
| `block … has the wrong layer` | Use floors, walls and objects in the matching slot. |
| `caves.level must be an integer from 1 to 3` | Fix the cave level. |
| `caves.terrain.fill must be a terrain fill block` | Use a block with the terrain fill role. |
