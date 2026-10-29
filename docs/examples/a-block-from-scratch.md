# A block from scratch

This example builds a wall. A wall exercises the layer, the top/front textures,
collision and an item in one small pack. The result is `mypack:stone_wall`.

## Files

```
stone-wall/
  LP/
    manifest.json
    blocks/stone_wall.json
    items/stone_wall.json
  AP/
    manifest.json
    textures/terrain_texture.json
    textures/blocks/stone_wall_top.png
    textures/blocks/stone_wall_front.png
```

## LP manifest

```json
{
  "header": {
    "name": "Stone Wall",
    "description": "Adds a stone wall",
    "uuid": "33333333-3333-4333-8333-333333333331",
    "version": [1, 0, 0]
  },
  "kurblanc": {
    "schema": 1,
    "namespace": "mypack",
    "min_engine": "0.1.1"
  },
  "modules": [
    {
      "type": "data",
      "uuid": "33333333-3333-4333-8333-333333333332",
      "version": [1, 0, 0]
    }
  ],
  "dependencies": [
    {
      "uuid": "44444444-4444-4444-8444-444444444441",
      "version": [1, 0, 0]
    }
  ]
}
```

## AP manifest

```json
{
  "header": {
    "name": "Stone Wall Assets",
    "description": "Textures for the stone wall",
    "uuid": "44444444-4444-4444-8444-444444444441",
    "version": [1, 0, 0]
  },
  "kurblanc": {
    "schema": 1,
    "namespace": "mypack",
    "min_engine": "0.1.1"
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

`LP/blocks/stone_wall.json`:

```json
{
  "kurblanc:format": 1,
  "kurblanc:block": {
    "description": { "identifier": "mypack:stone_wall" },
    "components": {
      "kurblanc:layer": "wall",
      "kurblanc:color": "#7c7d72",
      "kurblanc:label": "Stone Wall",
      "kurblanc:collision_box": true,
      "kurblanc:opacity": 15,
      "kurblanc:destructible_by_mining": {
        "seconds_to_destroy": 1.2,
        "preferred_tool": "pickaxe"
      },
      "kurblanc:material_instances": {
        "*": { "texture": "stone_wall_top" },
        "front": { "texture": "stone_wall_front" }
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

## Texture keys

`AP/textures/terrain_texture.json`:

```json
{
  "texture_data": {
    "stone_wall_top": { "textures": "textures/blocks/stone_wall_top.png" },
    "stone_wall_front": { "textures": "textures/blocks/stone_wall_front.png" }
  }
}
```

## Item

`LP/items/stone_wall.json`:

```json
{
  "id": "mypack:stone_wall",
  "label": "Stone Wall",
  "maxStack": 512,
  "block": "mypack:stone_wall",
  "icon": { "block": "mypack:stone_wall" },
  "categories": ["blocks"]
}
```

## Art

The top image uses the wall-top shape layout. A full sheet is 192×64; a compact
48×32 sheet is expanded by the game. The front image is a 64×19 strip of 16-pixel
face cells. Leave the front transparent for a top-only wall.

## Verify

1. Put the folder where you keep packs.
2. In Workshop, choose **Link a folder** and pick `stone-wall/`.
3. Enable the LP and AP on a world.
4. Place the wall and confirm it connects to a neighbouring wall of the same
   `group`.
5. Mine it and confirm it breaks in about 1.2 seconds.

If it fails, the message names the file and field:
[Validation errors](/reference/validation-errors).

## What to change for your own wall

- Replace `mypack` with your namespace.
- Keep the file basename equal to the ID's local part.
- Keep both texture keys in the AP and reference them from the block.
- Change `group` so walls of the same material connect.
- Adjust `lift` if the top should sit higher or lower.
