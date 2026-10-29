import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest } from './lib/load-manifest.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const check = process.argv.includes('--check')

function tableCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
}

function renderComponent(component) {
  const lines = []
  lines.push(`## \`${component.id}\``)
  lines.push('')
  lines.push(`**Applies to:** ${component.appliesTo}`)
  if (component.aliases?.length) {
    lines.push(`**Aliases:** ${component.aliases.map((alias) => `\`${alias}\``).join(', ')}`)
  }
  lines.push('')
  lines.push(component.summary)
  lines.push('')

  if (component.fields.length) {
    lines.push('| Field | Type | Default | Range | Notes |')
    lines.push('|---|---|---|---|---|')
    for (const field of component.fields) {
      lines.push(
        `| \`${tableCell(field.name)}\` | ${tableCell(field.type)} | ${tableCell(field.default ?? '—')} | ${tableCell(field.range ?? '—')} | ${tableCell(field.notes ?? '')} |`,
      )
    }
    lines.push('')
  }

  lines.push('```json')
  lines.push(JSON.stringify(component.example, null, 2))
  lines.push('```')
  lines.push('')
  lines.push(`**On bad input:** ${component.behavior}`)
  lines.push('')
  return lines.join('\n')
}

function renderGroup(group, manifest) {
  return [
    '<!-- generated: do not edit -->',
    `# ${group.title}`,
    '',
    `Generated from \`data/components.json\` for ${manifest.format}. Do not edit this page by hand; edit the manifest and run \`npm run gen\`.`,
    '',
    ...group.components.map(renderComponent),
  ].join('\n').replace(/\n+$/, '\n')
}

const manifest = await loadManifest(root)
let failures = 0

for (const group of manifest.groups) {
  const target = join(root, 'docs', 'reference', 'components', `${group.id}.md`)
  const rendered = renderGroup(group, manifest)

  if (check) {
    let existing = null
    try {
      existing = await readFile(target, 'utf8')
    } catch {
      // Missing counts as stale.
    }
    if (existing !== rendered) {
      console.error(`stale: ${target} — run npm run gen`)
      failures += 1
    }
    continue
  }

  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, rendered)
  console.log(`wrote ${target}`)
}

if (check) {
  if (failures) process.exitCode = 1
  else console.log(`ok: ${manifest.groups.length} generated page(s) current`)
}
