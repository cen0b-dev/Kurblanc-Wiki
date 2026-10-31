# Entity rendering

Draw an entity's animations as PNG strips in the AP. Describe their frame sizes
and playback speed in either of these places:

- `kurblanc:render` inside `LP/entities/<name>.json`.
- `AP/presentation/entities/<name>.json`, with an `entity` field naming the entity ID.

The inline form takes priority if both exist. Here is the value to put inside
`kurblanc:render`:

```json
{
  "pixelScale": 2,
  "feet": 0,
  "alpha": 1,
  "variantMode": "none",
  "sourceFacing": "right",
  "strips": {
    "idle": {
      "texture": "textures/entities/wisp/idle.png",
      "cell": [8, 8],
      "frames": 2,
      "fps": 1,
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
```

## Fields

| Field | Default | Notes |
|---|---|---|
| `entity` | required in AP files | `namespace:name`. Not used in the inline form. |
| `pixelScale` | 2 | Integer 1–4. |
| `feet` | 0 | Integer 0–32. Baseline offset in source pixels. |
| `alpha` | 1 | Number 0.05–1. |
| `variantMode` | `none` | `none`, `tint` or `mask`. |
| `sourceFacing` | `left` | `left` or `right`. The renderer mirrors for travel. |
| `strips` | required | One entry per animation action. |

Action names are lower snake case, for example `idle`, `walk`, `jump` or
`attack`. A missing action falls back to `idle`.

## Strip geometry

A strip is one horizontal row of equal cells with a **one-pixel transparent gap**
between them:

```
width  = cell.width  * frames + (frames - 1)
height = cell.height
```

For a 4-frame 8×8 walk strip, the PNG is `35×8`. The loader checks the real image
size. It rejects a strip that does not fit and does not crop it.

| Limit | Value |
|---|---|
| Frames per strip | 1–64 |
| Cell width or height | 1–256 px |
| Image width or height | 4096 px |
| FPS | 0.1–60 |

## Masks

`variantMode: "mask"` recolors through a mask instead of a flat tint. Every
animation then needs a `mask` path:

```json
{
  "variantMode": "mask",
  "strips": {
    "idle": {
      "texture": "textures/entities/sheep/idle.png",
      "mask": "textures/entities/sheep/idle.mask.png",
      "cell": [32, 32],
      "frames": 4,
      "fps": 7,
      "loop": true
    }
  }
}
```

The mask must have the same geometry as its base strip.

## Texture paths

Strip paths are pack-relative and end in `.png`. The loader resolves them through
the active asset packs. Do not use `..` and do not use a leading slash. The art
does not need a `terrain_texture.json` entry. Naming the file is enough.

## Player

The player uses the same strip fields. You can put them in `LP/player.json`,
wrapped in `kurblanc:player`, as below. The loader also accepts
`AP/presentation/player.json` without that wrapper. An LP player definition takes
priority. If several LPs give one, the loader uses the first LP in resolved order.

```json
{
  "kurblanc:player": {
    "pixelScale": 2,
    "strips": {
      "idle": {
        "texture": "textures/player/idle.png",
        "cell": [20, 32],
        "frames": 1,
        "fps": 1,
        "loop": true
      },
      "walk": {
        "texture": "textures/player/walk.png",
        "cell": [20, 32],
        "frames": 4,
        "fps": 9.6,
        "loop": true
      }
    }
  }
}
```

## Validation

| Message | Fix |
|---|---|
| `entity must be a namespace:name identifier` | Use `mypack:wisp`. |
| `animations.<action> needs a mask` | Add masks or use `tint` / `none`. |
| `image is …; a … strip needs height …` | Make the image height equal the cell height. |
| `image is … past the 4096px limit` | Shorten the strip or cell. |
| `texture is not provided by any active asset pack` | Add the PNG to an enabled AP. |
