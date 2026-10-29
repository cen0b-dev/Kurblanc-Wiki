# Start here

Kurblanc content is data. A block, item, recipe or entity is a JSON file plus its
art; the game finds it in the pack folder. You do not edit engine code.

An add-on has two halves:

- **LP** (logic pack) — what the content is and how it plays.
- **AP** (asset pack) — what it looks like and sounds like.

You can ship the two halves together, or keep them apart so other packs can use
your logic with their own art.

## What you need

- A text editor.
- An image editor that saves PNGs with transparency.
- A folder on your computer for the add-on.
- Kurblanc, with the add-on folder linked in Workshop. See
  [Load a pack](/guide/load-a-pack).

## The shortest path

1. [Pack anatomy](/guide/pack-anatomy) — the files and folders every add-on has.
2. [Load a pack](/guide/load-a-pack) — link the folder and enable the packs.
3. [Build your first block](/guide/first-block) — a floor tile from zero to placed.
4. [Block components](/reference/components/blocks) — the field-by-field table.
5. [Validation errors](/reference/validation-errors) — when something does not load.

## The rules that never change

- IDs are namespaced: `mypack:stone_tile`. A bare name takes the pack's namespace,
  but writing the namespace is clearer.
- A definition file's basename is the ID's local part:
  `LP/blocks/stone_tile.json` defines `mypack:stone_tile`.
- Art is named by a path under `textures/` inside the asset pack.
- No block, item or mob catalogue. Adding a definition file is how you add
  content.
