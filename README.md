# Kurblanc Creator Wiki

Public, task-oriented documentation for adding content to Kurblanc: blocks,
walls, doors, items and recipes, the packs that carry them, and the textures they
use.

The site describes the current content format: two packs (`LP/` for logic, `AP/`
for assets), one manifest each, and a definition file per thing.

## Local development

```bash
npm ci
npm run dev
```

The site is served under `/Kurblanc-Wiki/`. Override the base with
`BASE_PATH=/ npm run dev` for a root-served preview.

## Checks

```bash
npm run check          # snippets, generated reference, fixture (skips without a game path)
GAME_DIR=~/Kurblonc npm run check:drift
GAME_DIR=~/Kurblonc npm run check:fixture
```

`check:drift` and `check:fixture` read the game repository, which is private.
They run locally with `GAME_DIR` (or `--game <path>`) and skip with a message when
no game path is supplied. CI runs the rest.

Fields in the reference are fixture-backed and presence-checked against the
parsers, not extracted with an AST. When the game's content format changes, run
both game checks and update `data/components.json` and `fixtures/full-pack/`.

## Generated files

`data/components.json` is the only hand-maintained source for the component
reference. Run `npm run gen` after editing it; generated pages carry a
`<!-- generated: do not edit -->` header and are committed so diffs are
reviewable. `npm run check:generated` fails when they are stale.

## Licence

MIT.
