# Contribute

This site is a standalone VitePress repository:
`cen0b-dev/Kurblanc-Wiki`. It documents the game's content format; it does not
contain game code.

## Local setup

```bash
npm ci
npm run dev
```

The site serves under `/Kurblanc-Wiki/`. Use `BASE_PATH=/ npm run dev` for a
root-served preview.

## Before you push

```bash
npm run check
npm run build
```

`check` parses every JSON snippet, regenerates the component reference in check
mode, and loads the fixture pack if a game path is available. `build` fails on
broken internal links.

To run the game-dependent checks:

```bash
GAME_DIR=~/Kurblonc npm run check:drift
GAME_DIR=~/Kurblonc npm run check:fixture
```

The game repository is private, so these skip with a message when `GAME_DIR` is
not set and are advisory in CI.

## The rules

- Describe what the game does now. Do not add release names, old formats or a
  version history page.
- The parser is the source of truth: if the prose and the game's pack code
  disagree, document what the code does and note the difference.
- Do not hand-edit generated pages. `docs/reference/components/*.md` comes from
  `data/components.json`. Edit the manifest, then `npm run gen`.
- Do not duplicate field tables in guides. Link to the reference entry.
- Every JSON fence must parse. `npm run check:snippets` enforces it.
- No copied prose or assets. The structure follows other wikis; the words and art
  are Kurblanc's.

## When the format changes

1. Update `data/components.json` and the fixture pack.
2. Run `npm run gen`, `npm run check`, `GAME_DIR=… npm run check:drift` and
   `GAME_DIR=… npm run check:fixture`.
3. Update the guides where the task changed.

## Where to report a game bug

The game repository is private. Report content-format bugs to the owner; the wiki
should describe the game, not paper over it.
