# Component reference

Kurblanc content is data. A block definition is a `kurblanc:block` object with a
`description.identifier` and a `components` object; the fields in that object are
the API this wiki documents.

The component tables are generated from `data/components.json` and checked
against the game's parsers. The guides explain what to build; these pages say
what the loader accepts.

| Page | Covers |
|---|---|
| [Block components](/reference/components/blocks) | Every `kurblanc:*` key accepted in `LP/blocks/<id>.json` |
| [Validation errors](/reference/validation-errors) | The messages you will actually see |
| [Limits](/reference/limits) | IDs, texture paths, light, layers and block count |
| [Format changelog](/reference/format-changelog) | Which build each page was verified against |
| [Legacy catalogues](/reference/legacy-catalogues) | The pre-D25 format the public build still uses |

All pages here describe **D25**, verified against build `7050b38`
(2026-10-28). Where the D25 design prose and the parser disagree, the parser is
what this reference records.
