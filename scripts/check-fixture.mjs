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
let parseBedrockBlock
let parseTerrainTexture
try {
  ;({ parseBedrockBlock, parseTerrainTexture } = await import(pathToFileURL(parserPath).href))
} catch (error) {
  console.error(`could not import ${parserPath}: ${error.message}`)
  console.error('Node 24 strips types on import; use node --experimental-strip-types if needed.')
  process.exit(1)
}

const fixture = join(root, 'fixtures/full-pack')
const fixtureDir = join(fixture, 'LP/blocks')
const names = (await readdir(fixtureDir)).filter((name) => name.endsWith('.json')).sort()
const failures = []
let definitions = 0

for (const name of names) {
  const raw = JSON.parse(await readFile(join(fixtureDir, name), 'utf8'))
  try {
    const { def } = parseBedrockBlock(raw, 'kurblanc', `LP/blocks/${name}`)
    if (!def?.id) throw new Error('returned no block definition')
    definitions += 1
    if (!/^[a-z0-9_]+:[a-z0-9_]+$/.test(def.id)) throw new Error(`un-namespaced id ${def.id}`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
  }
}

try {
  const catalog = JSON.parse(await readFile(join(fixture, 'AP/textures/terrain_texture.json'), 'utf8'))
  const parsed = parseTerrainTexture(catalog, 'memory://fixture/')
  if (!parsed.sources.tile) throw new Error('missing "tile" texture key')
} catch (error) {
  failures.push(`AP/textures/terrain_texture.json: ${error.message}`)
}

if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else {
  console.log(`ok: ${names.length} fixture blocks, ${definitions} definitions`)
}
