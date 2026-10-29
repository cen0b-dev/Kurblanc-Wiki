# Changelog

This wiki documents **Kurblanc 0.2.0**, verified against build `87efd64`
(2026-10-29). The version banner on every page reads from `data/version.json`.

## 0.2.0

- One content pipeline: every system reads the same resolved revision.
- Pack stacks are ordered. Later logic packs replace a definition with the same
  ID; later asset packs win texture keys.
- Add-ons can be linked as dev folders or installed as `.kbpack` archives.
- Worlds store palette slots, so removing a block leaves a checked missing tile
  instead of silently becoming air.
- Entities, the player and animated objects share one animation-strip format.
- Multiplayer is host-authoritative: guests receive presentation and terrain,
  not host logic files.

## How this wiki is checked

- Every JSON fence is parsed by `npm run check:snippets`.
- The block component reference is generated from `data/components.json`.
- `npm run check:drift` compares that manifest with the game's parsers.
- `npm run check:fixture` loads `fixtures/full-pack/` through the real parser.

The game repository is private, so the last two checks run locally with
`GAME_DIR` and skip in CI.
