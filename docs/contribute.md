# Contribute

This site is a standalone VitePress repository: `cen0b-dev/Kurblanc-Wiki`. It
documents the content format of the game. It does not hold game code.

## Local setup

```bash
npm ci
npm run dev
```

The site serves under `/Kurblanc-Wiki/`. Use `BASE_PATH=/ npm run dev` for a
preview that serves from the root.

## Before you push

```bash
npm run check
npm run build
```

`check` parses every JSON snippet. It also regenerates the component reference in
check mode. If a game path is available, it loads the block fixtures. It loads
the first-block tutorial too. `build` fails on a broken internal link.

To run the checks that need the game:

```bash
GAME_DIR=~/Kurblonc npm run check:drift
GAME_DIR=~/Kurblonc npm run check:fixture
GAME_DIR=~/Kurblonc npm run check:tutorial
```

The game repository is private. Thus these checks skip with a message when
`GAME_DIR` is not set. They are advisory in CI.

## The rules

- Describe what the game does now. Do not add release names, old formats or a
  version history page.
- The parser is the source of truth. If the prose and the pack code of the game
  disagree, document what the code does. Then note the difference.
- Do not hand-edit generated pages. `docs/reference/components/*.md` comes from
  `data/components.json`. Edit the manifest, then run `npm run gen`.
- Do not duplicate field tables in guides. Link to the reference entry.
- Every JSON fence must parse. `npm run check:snippets` enforces it.
- No copied prose or assets. The structure follows other wikis. The words and art
  are Kurblanc's.

## When the format changes

1. Update `data/components.json` and the fixture pack.
2. Run `npm run gen`, `npm run check`, `GAME_DIR=… npm run check:drift` and
   `GAME_DIR=… npm run check:fixture`.
3. Update the guides where the task changed.

## Where to report a game bug

The game repository is private. Report content-format bugs to the owner. The wiki
must describe the game. It must not hide a defect.
