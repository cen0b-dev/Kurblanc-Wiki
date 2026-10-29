# Pack anatomy

A Kurblanc add-on is a folder with two halves:

```
my_pack/
  LP/                     Logic Pack — what the content does
    manifest.json
    blocks/<block>.json
    items/<item>.json
    entities/<entity>.json
    recipes.json
    player.json
  AP/                     Asset Pack — what it looks like
    manifest.json
    textures/blocks/*.png
    textures/entities/*.png
    textures/player/*.png
```

`recipes.json` and `player.json` are single files because there is one recipe
list and one player art definition. Everything else is one file per thing.

## Manifests

Both halves have a format-2 manifest. The Logic Pack declares a `data` module;
the Asset Pack declares a `resources` module.

```json
{
  "format_version": 2,
  "header": {
    "name": "My Pack",
    "description": "Adds stone tiles",
    "uuid": "5f6e7d8c-1234-4abc-9def-000000000001",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "5f6e7d8c-1234-4abc-9def-000000000002",
      "version": [1, 0, 0]
    }
  ]
}
```

Use a fresh UUID for each header and module. The Asset Pack manifest is the same
shape with `"type": "resources"` and its own UUIDs.

Unlike earlier Kurblanc packs, an LP does not have to depend on a specific AP.
The two halves install separately: a logic pack adds behaviour, an asset pack
retextures existing content, and a bundle zip ships both. The game resolves
`textures/...` against the active asset packs, with the higher-priority pack
winning when two supply the same path.

## IDs

Every definition has a namespaced identifier:

```json
{ "description": { "identifier": "mypack:stone_tile" } }
```

The namespace is yours; `kurblanc` belongs to the built-in pack. The local part
is lower snake case. The file's basename must equal the local part:
`LP/blocks/stone_tile.json` defines `mypack:stone_tile` (or
`kurblanc:stone_tile`; the namespace is not in the filename).

Every reference uses the full namespaced ID: drops, recipe stacks, water beds,
block placers, spawn floors. A bare name is an error, not an implicit
`kurblanc:` prefix.

## What is deliberately absent

There is no `LP/blocks.json`, `LP/items.json`, `LP/mobs.json`,
`AP/textures/terrain_texture.json` or `AP/textures/entity_texture.json`. The
loader enumerates folders; a zip's entry table or the dev server's file list is
the catalogue. If you add a file, it loads. If you delete it, it is gone.

There are also no per-frame texture folders. An entity animation is one packed
sheet.

## Where packs live

- Development: `public/packs/<name>/` in the game checkout. `?pack=<name>` picks
  a dev folder, and a reload picks up edits.
- Installed: zip files imported through the pack manager. Installed packs are
  stored by the game, not unpacked into the source tree.

Both kinds are a `PackSource` to the loader. The content set is resolved once at
boot; changing it reloads the page into the new set.

## Next

- [Build your first block](/guide/first-block)
- [Layers and collision](/blocks/layers-and-collision)
- [Reference: block components](/reference/components/blocks)
