/**
 * Current drop only. Replace this list when new graphs ship — do not append.
 * See lib/docs/AGENTS.md
 */
export const NEW_SLUGS = [
  "graph-activity",
  "graph-heatmap",
  "graph-calendar",
  "graph-waterfall",
  "graph-uptime",
  "graph-slope",
  "graph-bullet",
  "graph-rank",
  "graph-kpi",
  "graph-timer",
  "graph-countdown",
] as const

const newSlugSet = new Set<string>(NEW_SLUGS)

export function isNewSlug(slug: string) {
  return newSlugSet.has(slug)
}
