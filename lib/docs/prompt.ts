import type { ComponentDoc, PropRow } from "@/lib/docs/catalog"

export const DESIGN_AND_MOOD = `Design
- Geist Mono. Dashed frame, plus-sign corners, title as [ TITLE ] on the top edge.
- One accent color: CSS variable --graph-accent. Unused rows recede with opacity (~0.4). Drawing graphs accept palette="mono" | "duo" | "multi" (default mono). duo uses --graph-accent-2 for the second series. multi cycles three accents. Do not invent extra hues.
- Glyphs do the drawing: █ ░ - = + ├ └ ✓. Borders are dashes, not SVG strokes.
- Numbers use tabular-nums and sit right-aligned.
- Motion is transform and opacity only, 220ms cubic-bezier(0.215, 0.61, 0.355, 1). Nothing loops. If prefers-reduced-motion, duration is 0.

Mood
Typed, not illustrated. Quiet monospace figures that sit next to prose. Restraint over decoration. Do not restyle the frame. Default is one accent; palette is opt-in.`

export function installCli(origin: string, registry: string) {
  const host = origin || "<origin>"
  return `pnpm dlx shadcn@latest add ${host}/r/${registry}.json`
}

export function formatProps(props: PropRow[]) {
  return props
    .map((row) => {
      const fallback = row.default ? `, default ${row.default}` : ""
      return `- ${row.name} (${row.type}${fallback}): ${row.description}`
    })
    .join("\n")
}

type AgentPromptInput = {
  origin: string
  registry: string
  doc?: Pick<
    ComponentDoc,
    "title" | "name" | "description" | "dependencies" | "props"
  >
  example?: string
}

export function agentPrompt({
  origin,
  registry,
  doc,
  example,
}: AgentPromptInput) {
  const command = installCli(origin, registry)
  const deps = doc?.dependencies?.length
    ? doc.dependencies.map((item) => `\`${item}\``).join(", ")
    : "`motion`"

  if (!doc) {
    return `Install markdown graphs into this shadcn project.

${command}

These are React source files, not an npm package. You need ${deps}. Files land under @/registry/default. Import from there, or add a barrel.

${DESIGN_AND_MOOD}`
  }

  const usage = example
    ? `\nUsage\n\n${example.trim()}\n`
    : `\nImport\n\nimport { ${doc.name} } from "@/registry/default/${registry}/${registry}"\n`

  return `Install ${doc.name} (${doc.title}) from markdown graphs into this shadcn project.

${command}

These are React source files, not an npm package. You need ${deps}. Files land under @/registry/default.

What it is
${doc.description}
${usage}
Props
${formatProps(doc.props)}

${DESIGN_AND_MOOD}`
}

type PageExample = {
  title: string
  description?: string
  code: string
}

export type PageCopy = {
  title: string
  description: string
  kicker?: string
  registry?: string
  doc?: Pick<
    ComponentDoc,
    "title" | "name" | "description" | "dependencies" | "props" | "registry"
  >
  examples?: PageExample[]
  extra?: string
}

export function pageMarkdown({
  origin,
  title,
  description,
  kicker,
  registry,
  doc,
  examples,
  extra,
}: PageCopy & { origin: string }) {
  const parts = [`# ${title}`]

  if (kicker) {
    parts.push("", kicker)
  }

  parts.push("", description)

  const name = registry ?? doc?.registry
  if (name) {
    parts.push("", "## Install", "", installCli(origin, name))
    parts.push(
      "",
      "## Agent",
      "",
      agentPrompt({ origin, registry: name, doc, example: examples?.[0]?.code })
    )
  }

  if (examples && examples.length > 0) {
    parts.push("", "## Examples")
    for (const example of examples) {
      parts.push("", `### ${example.title}`)
      if (example.description) {
        parts.push("", example.description)
      }
      parts.push("", example.code.trim())
    }
  }

  if (doc?.props.length) {
    parts.push("", "## Props", "")
    parts.push("| Prop | Type | Default | Description |")
    parts.push("| --- | --- | --- | --- |")
    for (const row of doc.props) {
      const fallback = row.default ?? "—"
      parts.push(
        `| ${row.name} | ${row.type} | ${fallback} | ${row.description} |`
      )
    }
  }

  if (extra) {
    parts.push("", extra.trim())
  }

  return parts.join("\n").replaceAll("$ORIGIN", origin || "<origin>")
}
