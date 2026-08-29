/**
 * Current drop only. Replace this list when new graphs ship — do not append.
 * See lib/docs/AGENTS.md
 */
export const NEW_SLUGS = ["graph-sheet", "graph-matrix", "graph-check"] as const

const newSlugSet = new Set<string>(NEW_SLUGS)

export function isNewSlug(slug: string) {
  return newSlugSet.has(slug)
}
