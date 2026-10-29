# Examples

Two ways to see a complete pack:

- [A block from scratch](/examples/a-block-from-scratch): a wall, its item and
  its one-sheet texture, assembled step by step.
- [The sample pack](/examples/sample-pack): the public sample repository, with a
  warning about which format it currently uses.

The fixtures in the wiki repository are the examples the checks actually load.
`fixtures/full-pack/` has one definition for every documented block component.
To start from a working file, copy the fixture that matches your archetype and
change the IDs and texture path.

Every JSON example on this site is parsed by `npm run check:snippets`; the
fixture pack is loaded through the real D25 parsers by `npm run check:fixture`.
