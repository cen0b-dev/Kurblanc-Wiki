# Load a pack

While making a pack, link its folder so Kurblanc can read your edits. To install
someone else's pack, import a `.kbpack` or `.kbaddon` file.

## Link your working folder

1. Open **Workshop** from the main menu.
2. Under **Linked folders**, choose **Link a folder**.
3. Select the add-on folder containing `LP/` and `AP/`.

For this layout, select `stone-tiles/`:

```text
stone-tiles/
  LP/manifest.json
  AP/manifest.json
```

The LP and AP appear as separate packs. You can also link a parent folder that
holds several add-ons. The game finds pack folders directly inside the selected
folder, one wrapper folder deeper, and inside pack archives.

Linking makes packs available. Open the world's pack list and add both your LP
and AP. For an add-on, leave the built-in packs enabled and put your packs after
them. Use a creative world for testing, so you can find your items immediately.

## See your edits

Save your files, then use **Rescan linked folders**, enter the world again, or
run `/reload` in the world's chat. An edit to a file alone does not reload the
world.

If a reload fails, read the error and fix the named file. A linked source keeps
its last valid snapshot when a new scan fails. The game does not apply the
rejected edit.

If Workshop says **Permission needed**, grant access again. If you moved or
deleted the folder, link its new location. Unlinking leaves your files on disk.

Browsers without a folder picker cannot use this workflow. Import a new archive
after each round of edits instead.

## Import an archive

In Workshop, choose **Add pack** and select the file, or drop it on the main menu.

| Extension | ZIP contents |
|---|---|
| `.kbpack` | One pack, with `manifest.json` at the root or inside one wrapper folder |
| `.kbaddon` | Several related packs, usually `LP/` and `AP/` |

To share your add-on, zip its LP and AP folders together and give the archive a
`.kbaddon` extension. To share only one pack, zip that pack's contents and use
`.kbpack`. Renaming an ordinary folder does not create an archive.

Kurblanc copies imported files into the browser's pack store. Re-import an
updated archive to update that stored copy. The game does not watch changes to
the original ZIP.

## Pack order and existing worlds

Each world has its own pack list. When two logic packs define the same block,
item, recipe or loot-table ID, the later definition wins. Asset packs can replace
the same texture path or texture key in the same way. The game loads dependencies
before the packs that require them.

A pack's header UUID identifies it. Changing its version does not create a
separate identity or pin a world to the older files. Test changes in a spare
world before you update a pack used by a world you care about.

Removing a block definition from a saved world leaves a missing-content
placeholder. The world keeps its palette slot rather than turning the block
into air. Restoring the definition lets that slot resolve again.

## Multiplayer

The host chooses the world's content. Guests receive the block and item data
needed to display and interact with that world. They do not need to install the
host's logic packs. The host offers asset packs for download, with consent. A
cache means unchanged assets need no second download.

A host can reload content while players are connected. Guests synchronize with
the new content revision. Linking a development folder does not share access to
your disk. Guests receive the assets that the game offers.
