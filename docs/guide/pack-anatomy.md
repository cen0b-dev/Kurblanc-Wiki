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
    textures/blocks/*.png
    textures/items/*.png
    textures/entities/*.png
    textures/player/*.png
    sounds.json
    music.json
```

A pack needs a manifest. Add only the folders you use. A texture replacement
pack, for example, can contain just an AP manifest and PNGs. A small add-on can
rely on the built-in packs for world generation, player art and other content.

The loader reads JSON files directly inside `blocks/`, `items/`, `recipes/` and
`entities/`. Keep those definitions in the named folder, without subfolders.
Loot tables can use subfolders. You do not need to maintain a content index.

## Manifests

Each pack has one manifest and exactly one module: `data` for an LP, `resources`
for an AP. Manifests do not use `format_version`. They use `kurblanc.schema`.

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

Use fresh UUIDs for every header and module. Add an entry to `dependencies`
only when a pack cannot work without another pack. The field is optional. The
game discovers LP and AP folders independently. A linked add-on does not need the
dependency just to find its art. A logic pack that uses only built-in art can
omit it.

`kurblanc.namespace` is the default for IDs written without a namespace.
`kurblanc.min_engine` is the oldest game version the pack accepts.

## IDs

Every definition has a namespaced identifier:

```json
{ "description": { "identifier": "mypack:stone_tile" } }
```

The namespace is yours. The `kurblanc` namespace belongs to the built-in
content. Both parts are lower snake case. Use the local part as the filename to
make files easy to find: `LP/blocks/stone_tile.json` can define
`mypack:stone_tile`. The identifier inside the JSON is authoritative. Matching
the filename is a convention.

References use the same IDs: drops, recipe ingredients, water beds, toggle
targets, spawn floors. A bare name uses the pack's namespace, but a full ID is
easier to read. It also survives moving a file between packs.

## How the loader finds content

There is no `LP/blocks.json`, `LP/items.json` or `LP/mobs.json` catalog, and no
`AP/textures/entity_texture.json`. The loader lists the folders. Save a new
definition in the right folder, then rescan or reload to load it.
Deleting a file removes that definition on the next successful reload, unless
another active pack supplies the same ID.

Blocks name PNG paths directly in `kurblanc:material_instances`. The loader
still reads a `terrain_texture.json` key table if a pack has one. New art does
not need it.

## Where packs live

- **Linked folder.** In Workshop, **Link a folder** points the game at a folder
  on disk. The game discovers and reads every pack in that folder directly. This
  is the normal way to work on a pack.
- **Installed pack.** A `.kbpack` is one zipped pack. A `.kbaddon` zips related
  LP and AP packs together. The game copies installed packs into its pack
  store.

Folder names are not identity. The manifest UUID is.

## Next

- [Load a pack](/guide/load-a-pack)
- [Build your first block](/guide/first-block)
- [Reference: block components](/reference/components/blocks)
