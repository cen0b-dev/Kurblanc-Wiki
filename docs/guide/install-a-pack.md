---
gated: true
---

# Install a pack

This page describes the D25 pack manager. The public build does not ship it yet;
until it does, use a development build and a dev folder (see
[Build your first block](/guide/first-block)).

## Three kinds of download

| You have | It contains | What it does |
|---|---|---|
| A logic pack | `LP/` only | Adds blocks, items, recipes or entities. Uses installed art. |
| An asset pack | `AP/` only | Retextures paths already used by installed logic. |
| A bundle | `LP/` and `AP/` | Installs as the two packs it contains. |

A zip may have one top-level folder; the importer strips it.

## Install

1. Open the pack manager.
2. Choose **Install** and pick one or more `.zip` files.
3. Enable the packs you want. Asset packs can be reordered; later packs win when
   two supply the same texture path.
4. Start or open a world.

Installing a pack does not edit the world. The world records the exact pack set
and versions it was saved with, so installing a newer version later does not
break an existing save.

## Versions and worlds

- Versions coexist. Installing `1.1.0` keeps `1.0.0`.
- An existing world opens with the exact `uuid + kind + version` set it was
  saved with.
- A new world uses the highest installed version of each pack.
- Missing packs block opening the world with a named error. The game never
  substitutes air for missing content.

## Multiplayer

Both peers must simulate the same content, because the client also generates
terrain and applies tile changes. The host sends a content fingerprint when a
client joins:

- same fingerprint → the join continues;
- different fingerprint → the client sees the differing packs and may download
  missing zips from the host;
- a dev folder or a different game build cannot be transferred; the join ends
  with a named reason.

The session uses the host's pack set. Leaving restores your own set.

## Removing a pack

Removing a pack warns if a saved world or the current default set references that
version, and refuses unless you confirm. Content a world needs is never deleted
silently.

## Next

- [Pack anatomy](/guide/pack-anatomy)
- [Format changelog](/reference/format-changelog)
