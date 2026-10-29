# Start here

Kurblanc content is data. A block, wall, door, item or entity is a JSON file plus
textures; the game discovers it from the pack's folder. You do not edit engine
code, and you do not update a catalogue.

This wiki documents the **D25** format, verified against build `7050b38`
(2026-10-28). The public game still runs the earlier format. See
[Legacy catalogues](/reference/legacy-catalogues) if that is what you are
modding.

## What you need

- A text editor.
- An image editor that can save PNGs with transparency.
- A Kurblanc D25 build that can load a dev folder or install a pack. The public
  build cannot yet; [Install a pack](/guide/install-a-pack) says so plainly.

## The shortest path

1. [Pack anatomy](/guide/pack-anatomy): the two folders every pack has.
2. [Build your first block](/guide/first-block): a floor tile from zero to loading.
3. [Block components](/reference/components/blocks): the field-by-field table.
4. [Validation errors](/reference/validation-errors): when it does not load.

## The two kinds of documentation

**Guides** teach a task in order. **Reference** pages say what the loader
accepts. If a guide and the reference disagree, the reference wins; if the
reference and the game disagree, the game wins, and that is a wiki bug worth
reporting.

## The rules that never change

- IDs are namespaced: `mypack:stone_tile`, never `stone_tile`.
- A definition file's basename is the ID's local part:
  `LP/blocks/stone_tile.json` → `mypack:stone_tile`.
- Textures are AP-relative paths: `textures/blocks/stone_tile.png`.
- No catalogues. Adding a file is how you add content.
