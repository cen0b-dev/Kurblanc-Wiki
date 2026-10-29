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

const parserPath = resolve(game, 'src/world/bedrock-pack.ts')
let parseBlockDefinitions
try {
  ;({ parseBlockDefinitions } = await import(pathToFileURL(parserPath).href))
} catch (error) {
  console.error(`could not import ${parserPath}: ${error.message}`)
  console.error('Node 24 strips types on import; use node --experimental-strip-types if needed.')
  process.exit(1)
}

const fixture = join(root, 'fixtures/full-pack')
const fixtureDir = join(fixture, 'LP/blocks')
const names = (await readdir(fixtureDir)).filter((name) => name.endsWith('.json')).sort()
const failures = []
const defs = []
let definitions = 0

for (const name of names) {
  const raw = JSON.parse(await readFile(join(fixtureDir, name), 'utf8'))
  try {
    const parsed = parseBlockDefinitions(raw, 'kurblanc', `LP/blocks/${name}`)
    if (!parsed.defs.length) throw new Error('returned no block definition')
    definitions += parsed.defs.length
    defs.push(...parsed.defs)
    for (const def of parsed.defs) {
      if (!/^[a-z0-9_]+:[a-z0-9_]+$/.test(def.id)) throw new Error(`un-namespaced id ${def.id}`)
    }
    if (name === 'door.json' && parsed.defs.length !== 2) {
      throw new Error(`expected the door to expand to 2 definitions, got ${parsed.defs.length}`)
    }
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
  }
}

if (!failures.length) {
  try {
    const door = defs.find((def) => def.id === 'kurblanc:door')
    const open = defs.find((def) => def.id === 'kurblanc:door_open')
    if (!door || !open) throw new Error('door did not generate kurblanc:door_open')
    if (door.toggle !== open.id || open.toggle !== door.id) throw new Error('door states are not cross-linked')
    if (open.placeable !== false) throw new Error('open door must not be placeable')
    if (open.solid !== false) throw new Error('open door must not be solid')
    if (open.opacity !== 0) throw new Error('open door must have opacity 0')
  } catch (error) {
    failures.push(`door: ${error.message}`)
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else {
  console.log(`ok: ${names.length} fixture blocks, ${definitions} definitions, door expansion checked`)
}
