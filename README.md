# Kurblanc Creator Wiki

Public, task-oriented documentation for adding content to Kurblanc. This covers
blocks, walls, doors, items and recipes, the packs that carry them, and the
textures they use.

The site describes the current content format. There are two packs (`LP/` for
logic, `AP/` for assets), one manifest for each pack, and one definition file for
each thing.

## Local development

```bash
npm ci
npm run dev
```

The site runs under `/Kurblanc-Wiki/`. To preview from the root, use
`BASE_PATH=/ npm run dev`.

## Checks

```bash
npm run check          # snippets, generated reference, fixture (skips without a game path)
GAME_DIR=~/Kurblonc npm run check:drift
GAME_DIR=~/Kurblonc npm run check:fixture
GAME_DIR=~/Kurblonc npm run check:tutorial
```

`check:drift` and `check:fixture` read the game repository, which is private.
They run locally with `GAME_DIR` (or `--game <path>`). They skip with a message
when you supply no game path. CI runs the rest.

Fields in the reference come from fixtures, and a check compares their presence
against the parsers. The check does not extract them with an AST. When the game's
content format changes, run both game checks. Then update `data/components.json`
and `fixtures/full-pack/`.

## Generated files

`data/components.json` is the only hand-maintained source for the component
reference. Run `npm run gen` after you edit it. Generated pages carry a
`<!-- generated: do not edit -->` header. You commit them with the rest, so
diffs stay reviewable. `npm run check:generated` fails when they are stale.

## License

MIT.
