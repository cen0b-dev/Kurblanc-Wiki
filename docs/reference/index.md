# Reference

Kurblanc content is data. A block definition is a `kurblanc:block` object with a
`description.identifier` and a `components` object; the fields in that object are
the API this wiki documents.

The component tables are generated from `data/components.json` and checked against
the game's parsers. The guides explain what to build; these pages say what the
loader accepts.

| Page | Covers |
|---|---|
| [Block components](/reference/components/blocks) | Every `kurblanc:*` key accepted in `LP/blocks/<id>.json` |
| [Validation errors](/reference/validation-errors) | The messages you will actually see |
| [Limits](/reference/limits) | IDs, textures, light, layers and pack sizes |

The parser is the source of truth. When a guide and this reference disagree, the
reference is the safer answer.
