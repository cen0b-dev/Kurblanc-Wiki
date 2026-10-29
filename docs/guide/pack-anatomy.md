# Pack anatomy

An add-on is a folder with two packs side by side:

```
my-addon/
  LP/                      Logic pack — what the content does
    manifest.json
    blocks/<name>.json
    items/<name>.json
    recipes/<name>.json
    entities/<name>.json
    loot_tables/<name>.json
    player.json
    worldgen/settings.json
  AP/                      Asset pack — what the content looks like
    manifest.json
    textures/terrain_texture.json
    textures/blocks/*.png
    textures/items/*.png
    presentation/entities/<name>.json
    presentation/player.json
    sounds.json
    music.json
```

Only the manifests are required. Every other file is optional, and each folder
adds content by the files inside it. There is no index file to update.

## Manifests

Each pack has one manifest and exactly one module: `data` for an LP, `resources`
for an AP. Manifests do not use `format_version`; they use `kurblanc.schema`.

`LP/manifest.json`:

```json
{
  "header": {
    "name": "My Add-on Logic",
    "description": "Adds a stone tile",
    "uuid": "5f6e7d8c-1234-4abc-9def-000000000001",
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
      "uuid": "5f6e7d8c-1234-4abc-9def-000000000002",
      "version": [1, 0, 0]
    }
  ],
  "dependencies": [
    {
      "uuid": "5f6e7d8c-1234-4abc-9def-000000000003",
      "version": [1, 0, 0]
    }
  ]
}
```

`AP/manifest.json` uses `"type": "resources"` and its own UUIDs:

```json
{
  "header": {
    "name": "My Add-on Assets",
    "description": "Art for My Add-on",
    "uuid": "5f6e7d8c-1234-4abc-9def-000000000003",
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
      "uuid": "5f6e7d8c-1234-4abc-9def-000000000004",
      "version": [1, 0, 0]
    }
  ]
}
```

Use fresh UUIDs for every header and module. The `dependencies` entry in the LP
points at the AP's `header.uuid`; without it the game does not know to load the
art. A logic pack that only uses built-in art can omit `dependencies`.

`kurblanc.namespace` is the default for IDs written without a namespace.
`kurblanc.min_engine` is the oldest game version the pack accepts.

## IDs

Every definition has a namespaced identifier:

```json
{ "description": { "identifier": "mypack:stone_tile" } }
```

The namespace is yours; `kurblanc` belongs to the built-in content. Both parts
are lower snake case. The file's basename must equal the local part:
`LP/blocks/stone_tile.json` defines `mypack:stone_tile`.

References use the same IDs: drops, recipe ingredients, water beds, toggle
targets, spawn floors. A bare name uses the pack's namespace, but a full ID is
easier to read and survives moving a file between packs.

## What is deliberately absent

There is no `LP/blocks.json`, `LP/items.json` or `LP/mobs.json` catalogue, and no
`AP/textures/entity_texture.json`. The loader lists the folders. If you add a
file, it loads; if you delete it, it is gone.

## Where packs live

- **Linked folder.** In Workshop, **Link a folder** points the game at a folder
  on disk. Every pack in that folder is discovered and read directly. This is the
  normal way to work on a pack.
- **Installed pack.** A `.kbpack` is one zipped pack. A `.kbaddon` zips related
  LP and AP packs together. Installed packs are copied into the game's pack
  store.

Folder names are not identity. The manifest UUID is.

## Next

- [Load a pack](/guide/load-a-pack)
- [Build your first block](/guide/first-block)
- [Reference: block components](/reference/components/blocks)
