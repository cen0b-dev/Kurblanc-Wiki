import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { deflateSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const index = process.argv.indexOf('--game')
const game = process.env.GAME_DIR ?? (index < 0 ? undefined : process.argv[index + 1])
if (!game) {
  console.log('skipped: set GAME_DIR or pass --game <path>')
  process.exit(0)
}
const load = path => import(pathToFileURL(resolve(game, path)).href)
const { candidateFromSource, memorySource } = await load('src/packs/source.ts')
const { PackSourceRegistry } = await load('src/packs/registry.ts')
const { resolveWorldContent } = await load('src/packs/resolve.ts')
const { identityOf } = await load('src/packs/types.ts')

async function tree(directory, prefix = '') {
  const files = {}
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix + entry.name
    if (entry.isDirectory()) Object.assign(files, await tree(join(directory, entry.name), path + '/'))
    else files[path] = new Uint8Array(await readFile(join(directory, entry.name)))
  }
  return files
}
// A real 32×32 opaque PNG, standing in for the reader's hand-drawn tile.
function pngChunk(type, data) {
  const payload = Buffer.concat([Buffer.from(type), data])
  let crc = 0xffffffff
  for (const byte of payload) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0)
  }
  const size = Buffer.alloc(4), checksum = Buffer.alloc(4)
  size.writeUInt32BE(data.length)
  checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0)
  return Buffer.concat([size, payload, checksum])
}
const header = Buffer.alloc(13)
header.writeUInt32BE(32, 0); header.writeUInt32BE(32, 4)
header[8] = 8; header[9] = 6
const rows = Buffer.alloc(32 * (1 + 32 * 4))
for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) rows.set([141, 137, 120, 255], y * 129 + 1 + x * 4)
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  pngChunk('IHDR', header), pngChunk('IDAT', deflateSync(rows)), pngChunk('IEND', Buffer.alloc(0)),
])
const page = await readFile(join(root, 'docs/guide/first-block.md'), 'utf8')
const snippets = [...page.matchAll(/```json\n([\s\S]*?)\n```/g)].map(match => JSON.parse(match[1]))
const manifests = snippets.filter(value => value.header)
const block = snippets.find(value => value['kurblanc:block'])
const item = snippets.find(value => value.id === 'mypack:stone_tile')
assert.equal(manifests.length, 2)
assert.ok(block); assert.ok(item)
const encode = value => new TextEncoder().encode(JSON.stringify(value))
let registry = new PackSourceRegistry()
const stack = { logic: [], assets: [] }
async function add(files, name) {
  const candidate = await candidateFromSource(memorySource(files, `memory://${name}/`))
  if (registry.get(candidate.header.uuid)) {
    const updated = new PackSourceRegistry()
    updated.addAll(registry.all().filter(value => value.header.uuid !== candidate.header.uuid))
    registry = updated
    stack.logic = stack.logic.filter(value => value.uuid !== candidate.header.uuid)
    stack.assets = stack.assets.filter(value => value.uuid !== candidate.header.uuid)
  }
  registry.add(candidate)
  stack[candidate.header.kind === 'logic' ? 'logic' : 'assets'].push(identityOf(candidate))
}
await add(await tree(resolve(game, 'public/packs/forager/LP')), 'builtin-lp')
await add(await tree(resolve(game, 'public/packs/forager/AP')), 'builtin-ap')
for (const manifest of manifests) {
  const files = { 'manifest.json': encode(manifest) }
  if (manifest.modules[0].type === 'data') {
    files['blocks/stone_tile.json'] = encode(block)
    files['items/stone_tile.json'] = encode(item)
  } else files['textures/blocks/stone_tile.png'] = png
  await add(files, manifest.modules[0].type)
}
let result = await resolveWorldContent({ stack, sources: registry })
assert.deepEqual(result.errors, [])
assert.ok(result.content.items.some(value => value.id === item.id && value.block === item.block))
assert.ok(result.content.sources['textures/blocks/stone_tile.png'])
assert.equal(result.content.blockDefs.find(value => value.id === item.block).layer, 'floor')
// Check the optional self-drop fragment, too.
Object.assign(block['kurblanc:block'].components, snippets.find(value => value['kurblanc:drops']))
await add({
  'manifest.json': encode(manifests.find(value => value.modules[0].type === 'data')),
  'blocks/stone_tile.json': encode(block), 'items/stone_tile.json': encode(item),
}, 'data-with-drops')
result = await resolveWorldContent({ stack, sources: registry })
assert.deepEqual(result.errors, [])
assert.deepEqual(result.content.blockDefs.find(value => value.id === item.block).drops, [{ item: item.id, count: 1 }])
console.log('ok: first-block tutorial resolves with built-in packs, direct texture, item and optional drops')
