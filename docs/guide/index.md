# Make a content pack

You can add blocks, items, crafting recipes and creatures to Kurblanc. Edit JSON
files and draw textures. You do not need to write game code.

Start with [Your first block](/guide/first-block). It walks through a small
add-on: a stone floor tile. You can find the tile in the creative inventory and
place it in a world. Keep the built-in packs enabled while you test the add-on.
They supply the rest of the game.

## How the files fit together

An add-on usually contains two folders:

- **LP**, the logic pack, defines things such as a block's mining time or a recipe's ingredients.
- **AP**, the asset pack, holds textures, animation images and audio.

For example, an LP defines `mypack:stone_tile` and asks for an image named
`textures/blocks/stone_tile.png`. The AP supplies that image. An item in the LP
lets you hold and place the block.

Both packs have a `manifest.json`. The manifest gives the pack a name and a
unique ID. The packs appear separately in Workshop and in a world's pack list.

## After your first block

| I want to… | Read |
|---|---|
| Understand the folders and IDs | [Pack anatomy](/guide/pack-anatomy) |
| Load, update or share a pack | [Load a pack](/guide/load-a-pack) |
| Make a wall, door or decorative object | [Blocks](/blocks/) |
| Add something to hold or craft | [Items](/items/) and [Recipes](/items/recipes) |
| Change what mining or killing drops | [Drops and loot tables](/items/drops) |
| Add a creature | [Entities](/entities/) |
| Change terrain and biomes | [World generation](/worldgen/) |
| Fix a pack that will not load | [Validation errors](/reference/validation-errors) |
