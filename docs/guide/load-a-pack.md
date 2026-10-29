# Load a pack

There are two ways to get a pack into the game: link the folder you are working
in, or install a finished archive. Linking is what you want while editing.

## Link a dev pack folder

Open **Workshop** from the main menu, find **Linked folders**, and choose
**Link a folder**. Pick the dev pack folder that contains your add-on.

A linked folder is a source, not a single pack. The game looks inside it and
treats each pack it finds as its own pack. Both of these layouts work:

```
Kurblanc Packs/
  my-addon/
    LP/
      manifest.json
    AP/
      manifest.json
```

```
Kurblanc Packs/
  stone-tiles/
    LP/
      manifest.json
    AP/
      manifest.json
  another-pack/
    LP/
      manifest.json
```

In the first layout, link `my-addon/` or `Kurblanc Packs/`. In the second, link
`Kurblanc Packs/` once and both packs appear.

After linking, the packs show up in Workshop as **Linked folder** packs. Changes
on disk are picked up when you rescan the folder, enter a world, or run
`/reload` inside a world.

If the game reports **Permission needed**, relink the folder to grant access. If
it reports a missing folder, the folder was moved or removed; relink it. Unlinking
never deletes or edits your files.

Some browsers do not expose a folder picker. When **Link a folder** is not
available, use **Add pack** with an archive instead.

## Enable the pack

Linking makes a pack available; it does not force it into every world. Open the
world's pack list and enable the LP and AP you want. The order matters when two
packs provide the same ID or texture path: the later pack wins.

## Install a finished pack

A shareable pack is a zip:

| File | Contains |
|---|---|
| `.kbpack` | One pack, with its `manifest.json` at the root or one folder deep |
| `.kbaddon` | Related LP and AP packs kept together |

In Workshop, choose **Add pack** and pick the file. You can also drop a pack file
on the main menu. Installed packs are copied into the game's pack store, so the
original file can be moved afterwards.

Installing a pack does not change a world. A world remembers the packs it was
saved with, so a newer version does not silently replace the content inside an
existing save. Missing content is reported by name instead of being replaced with
air.

## Removing a pack

Deleting an installed pack asks for confirmation, and tells you which worlds use
it. A linked folder can be unlinked at any time; the folder on disk is left
alone.

## Multiplayer

Both players need the same content. The host sends a content fingerprint, and a
guest with different packs sees which ones differ. Asset packs can be downloaded
from the host; logic is not transferred. A linked dev folder cannot be sent to
another player, so share a `.kbpack` or `.kbaddon` instead.

## Next

- [Pack anatomy](/guide/pack-anatomy)
- [Build your first block](/guide/first-block)
