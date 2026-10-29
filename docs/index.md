---
layout: home

hero:
  name: Kurblanc Creator Wiki
  text: Make content for the game
  tagline: Blocks and the packs that carry them — as data, not engine code.
  actions:
    - theme: brand
      text: Your first block
      link: /guide/first-block
    - theme: alt
      text: Pack anatomy
      link: /guide/pack-anatomy

features:
  - title: One definition, one texture
    details: A block is a JSON file and a texture path. Adding the file is how you add the block.
  - title: Logic and art stay separate
    details: A logic pack describes behaviour. An asset pack supplies the art it names.
  - title: Edit from a linked folder
    details: Link your add-on folder in Workshop and the game loads it straight from disk.
---

## Start here

1. [Pack anatomy](/guide/pack-anatomy): the `LP/` and `AP/` folders, manifests and IDs.
2. [Load a pack](/guide/load-a-pack): link a dev folder in Workshop, or install a `.kbpack`.
3. [Build your first block](/guide/first-block): a floor tile from empty folder to placed block.
4. [Block components](/reference/components/blocks): every field a block accepts.

The guides show a task in order. The reference states what the loader accepts. When
the two disagree, the reference is the safer answer.
