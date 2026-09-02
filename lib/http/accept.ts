export type AcceptEntry = {
  type: string
  q: number
  specificity: number
}

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((item) => item.trim())
    const type = (parts[0] ?? "").toLowerCase()
    let q = 1

    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((item) => item.trim())
      if (name === "q") {
        const parsed = Number(value)
        if (!Number.isNaN(parsed)) {
          q = Math.max(0, Math.min(1, parsed))
        }
      }
    }

    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2
    return { type, q, specificity }
  })
}

function matches(entry: AcceptEntry, candidate: string) {
  if (entry.type === "*/*") {
    return true
  }

  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1))
  }

  return entry.type === candidate
}

export function preferredType(
  header: string | null,
  produces: readonly string[]
): string | null {
  if (!header) {
    return produces[0] ?? null
  }

  const entries = parseAccept(header)
  if (entries.length === 0) {
    return produces[0] ?? null
  }

  let bestType: string | null = null
  let bestQ = -1
  let bestPosition = Infinity

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null
    let matchedPosition = Infinity

    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      if (!entry || !matches(entry, candidate)) {
        continue
      }

      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && index < matchedPosition)
      ) {
        matched = entry
        matchedPosition = index
      }
    }

    if (matched === null || matched.q <= 0) {
      continue
    }

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q
      bestPosition = matchedPosition
      bestType = candidate
    }
  }

  return bestType
}

export function isShadcnAccept(header: string | null) {
  return Boolean(header?.toLowerCase().includes("application/vnd.shadcn"))
}

export function appendVaryAccept(headers: Headers) {
  const existing = headers.get("Vary")
  if (!existing) {
    headers.set("Vary", "Accept")
    return
  }

  const tokens = existing.split(",").map((item) => item.trim().toLowerCase())
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`)
  }
}

export const PAGE_TYPES = ["text/html", "text/markdown"] as const
export const MARKDOWN_TYPE = "text/markdown; charset=utf-8"
export const PROBLEM_TYPE = "application/problem+json; charset=utf-8"
