import { readdir, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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

const parserPath = resolve(game, 'src/world/block-parse.ts')
let parseBlockFile
try {
  ;({ parseBlockFile } = await import(pathToFileURL(parserPath).href))
} catch (error) {
  console.error(`could not import ${parserPath}: ${error.message}`)
  console.error('Node 24 strips types on import; use node --experimental-strip-types if needed.')
  process.exit(1)
}

const fixtureDir = join(root, 'fixtures/full-pack/LP/blocks')
const names = (await readdir(fixtureDir)).filter((name) => name.endsWith('.json')).sort()
const failures = []
let definitions = 0

for (const name of names) {
  const raw = JSON.parse(await readFile(join(fixtureDir, name), 'utf8'))
  try {
    const parsed = parseBlockFile(raw, `LP/blocks/${name}`)
    if (!parsed.defs.length) throw new Error('returned no definitions')
    definitions += parsed.defs.length
    if (name === 'door.json' && parsed.defs.length !== 2) {
      throw new Error(`expected 2 definitions for a toggle, got ${parsed.defs.length}`)
    }
    for (const def of parsed.defs) {
      if (!/^[a-z0-9_]+:[a-z0-9_]+$/.test(def.id)) throw new Error(`un-namespaced id ${def.id}`)
    }
    if (name === 'door.json' && !parsed.defs.some((def) => def.id.endsWith('_open'))) {
      throw new Error('toggle did not generate an _open state')
    }
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else {
  console.log(`ok: ${names.length} fixture blocks, ${definitions} definitions`)
}
