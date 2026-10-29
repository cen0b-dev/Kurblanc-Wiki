import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Reads the single source of truth for the generated reference.
 * Throws on shape errors, duplicate component IDs and missing summary/example.
 */
export async function loadManifest(root) {
  const path = join(root, 'data/components.json')
  let raw
  try {
    raw = JSON.parse(await readFile(path, 'utf8'))
  } catch (error) {
    throw new Error(`data/components.json: ${error.message}`)
  }

  if (!raw || !Array.isArray(raw.groups)) {
    throw new Error('data/components.json: expected { groups: [] }')
  }

  const seen = new Set()
  for (const group of raw.groups) {
    if (!group || typeof group.id !== 'string' || typeof group.title !== 'string' || !Array.isArray(group.components)) {
      throw new Error('data/components.json: each group needs id, title and components[]')
    }
    if (!Array.isArray(group.sources) || group.sources.some((source) => typeof source !== 'string' || !source)) {
      throw new Error(`data/components.json: ${group.id} needs sources[] of parser files`)
    }
    for (const component of group.components) {
      if (!component || typeof component.id !== 'string') {
        throw new Error(`data/components.json: ${group.id} has a component without an id`)
      }
      if (seen.has(component.id)) {
        throw new Error(`data/components.json: duplicate component ${component.id}`)
      }
      seen.add(component.id)
      if (typeof component.summary !== 'string' || !component.summary.trim()) {
        throw new Error(`data/components.json: ${component.id} needs a summary`)
      }
      if (!('example' in component)) {
        throw new Error(`data/components.json: ${component.id} needs an example`)
      }
      if (!Array.isArray(component.fields)) {
        throw new Error(`data/components.json: ${component.id} needs fields[]`)
      }
    }
  }

  return raw
}
