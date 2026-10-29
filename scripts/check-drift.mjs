import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest } from './lib/load-manifest.mjs'
import { collectComponents, readSources } from './lib/collect-components.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function argValue(name) {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

const game = process.env.GAME_DIR ?? argValue('--game')
if (!game) {
  console.log('skipped: set GAME_DIR or pass --game <path>')
  process.exit(0)
}

const manifest = await loadManifest(root)
const sources = [...new Set(manifest.groups.flatMap((group) => group.sources))]
const sourceComponents = await collectComponents(game, sources)
const sourceText = (await readSources(game, sources)).map(({ text }) => text).join('\n')

const expected = new Set()
const fields = []
for (const group of manifest.groups) {
  for (const component of group.components) {
    expected.add(component.id)
    for (const alias of component.aliases ?? []) expected.add(alias)
    for (const field of component.fields) {
      const name = field.name.split('.').pop()
      fields.push({ component: component.id, name })
    }
  }
}

const missing = [...sourceComponents].filter((id) => !expected.has(id)).sort()
const stale = [...expected].filter((id) => !sourceComponents.has(id)).sort()
const unknownFields = fields
  .filter(({ name }) => !sourceText.includes(name))
  .map(({ component, name }) => `${component}.${name}`)

const failures = []
if (missing.length) failures.push(`missing from manifest: ${missing.join(', ')}`)
if (stale.length) failures.push(`stale in manifest: ${stale.join(', ')}`)
if (unknownFields.length) failures.push(`field not found in parser: ${unknownFields.join(', ')}`)

if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else {
  console.log(`ok: ${expected.size} components across ${sources.length} parser files`)
}
