import { readdir, readFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = join(root, 'docs')

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name === '.vitepress' || entry.name === 'public' || entry.name === 'node_modules') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await markdownFiles(path))
    else if (entry.name.endsWith('.md')) files.push(path)
  }
  return files
}

const files = await markdownFiles(docs)
let checked = 0
const failures = []

for (const file of files) {
  const lines = (await readFile(file, 'utf8')).split('\n')
  let openLine = -1
  let buffer = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (openLine === -1) {
      if (/^```json\s*$/.test(line)) {
        openLine = index + 1
        buffer = []
      }
      continue
    }

    if (/^```\s*$/.test(line)) {
      checked += 1
      const source = buffer.join('\n').trim()
      if (!source) {
        failures.push(`${relative(root, file)}:${openLine}: empty JSON snippet`)
      } else {
        try {
          JSON.parse(source)
        } catch (error) {
          failures.push(`${relative(root, file)}:${openLine}: invalid JSON: ${error.message}`)
        }
      }
      openLine = -1
      continue
    }

    buffer.push(line)
  }

  if (openLine !== -1) {
    failures.push(`${relative(root, file)}:${openLine}: unterminated json fence`)
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else {
  console.log(`ok: ${checked} JSON snippets`)
}
