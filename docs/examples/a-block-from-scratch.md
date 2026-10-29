# A block from scratch

This example builds a wall. A wall is a good test because it exercises the layer,
the combined sheet, collision and an item in one small pack. The result is
`mypack:stone_wall`.

## Files

```
public/packs/stone_wall/
  LP/
    manifest.json
    blocks/stone_wall.json
    items/stone_wall.json
  AP/
    manifest.json
    textures/blocks/stone_wall.png
```

## LP manifest

```json
{
  "format_version": 2,
  "header": {
    "name": "Stone Wall",
    "description": "Adds a stone wall",
    "uuid": "33333333-3333-4333-8333-333333333331",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "33333333-3333-4333-8333-333333333332",
      "version": [1, 0, 0]
    }
  ]
}
```

## AP manifest

```json
{
  "format_version": 2,
  "header": {
    "name": "Stone Wall Assets",
    "description": "Texture for the stone wall",
    "uuid": "44444444-4444-4444-8444-444444444441",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "44444444-4444-4444-8444-444444444442",
      "version": [1, 0, 0]
    }
  ]
}
```

## Block

```json
{
  "format_version": "1.21.0",
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_wall" },
    "components": {
      "kurblanc:layer": "wall",
      "kurblanc:color": "#7c7d72",
      "kurblanc:label": "Stone Wall",
      "kurblanc:collision_box": true,
      "kurblanc:opacity": 15,
      "kurblanc:destructible_by_mining": { "seconds_to_destroy": 1.2 },
      "kurblanc:material_instances": {
        "*": { "texture": "textures/blocks/stone_wall.png" }
      },
      "kurblanc:wall": {
        "lift": 18,
        "group": "stone"
      }
    }
  }
}
```

`kurblanc:layer: "wall"` is what makes the block raised. `opacity: 15` is light
blocking, not collision; the wall is both.

## Item

```json
{
  "format_version": "1.21.0",
  "kurblanc:item": {
    "description": { "identifier": "mypack:stone_wall" },
    "components": {
      "kurblanc:block_placer": { "block": "mypack:stone_wall" }
    }
  }
}
```

## Texture

Make a `192×83` PNG:

- top shape table at `(0, 0)`, `192×64`;
- front strip at `(0, 64)`, `64×19`.

The wall reads the top region for connection shapes and the front strip for the
face. Leave the front region transparent for a top-only wall.

## Verify

1. Put the folder at `public/packs/stone_wall/` in a D25 development build.
2. Open `http://localhost:5173/?pack=stone_wall`.
3. Take the item from the creative catalog and place it.
4. Mine it and confirm it breaks in about 1.2 seconds.

If it fails, the message names the file and field:
[Validation errors](/reference/validation-errors).

## What to change for your own wall

- Replace `mypack` with your namespace.
- Keep the file basename equal to the ID's local part.
- Keep the texture path relative to the AP.
- Change `group` so walls of the same material connect.
- If your sheet is not in the standard layout, add `top_rect` and `front_rect`
  instead of moving pixels.
