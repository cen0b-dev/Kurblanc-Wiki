import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOTS = new Set([
  'kurblanc:block',
  'minecraft:block',
  'kurblanc:item',
  'minecraft:item',
  'kurblanc:entity',
  'minecraft:entity',
])

/**
 * Collects component identifiers from the parser files a manifest group names.
 * Root wrappers are structure, not components, and are ignored.
 */
export async function collectComponents(game, sources) {
  const found = new Set()
  for (const source of sources) {
    const text = await readFile(join(game, source), 'utf8')
    for (const match of text.matchAll(/\b(?:kurblanc|minecraft):[a-z0-9_]+\b/g)) {
      if (!ROOTS.has(match[0])) found.add(match[0])
    }
  }
  return found
}

export async function readSources(game, sources) {
  return Promise.all(sources.map(async (source) => ({
    source,
    text: await readFile(join(game, source), 'utf8'),
  })))
}
