export const ACCENT_STORAGE_KEY = "graph-accent"
export const ACCENT_EVENT = "graph-accent"
export const DEFAULT_ACCENT_ID = "sky"

type Hue = {
  light: string
  dark: string
}

export type Accent = {
  id: string
  label: string
  kind: "solid" | "duo"
  light: string
  dark: string
  swatch: string
  duo: Hue
  tri: Hue
}

const LEGACY_ACCENTS: Record<string, string> = {
  orange: "gold",
  green: "lime",
  cyan: "sky",
  blue: "sky",
  purple: "dusk",
  pink: "coral",
}

function resolveAccentId(id: string) {
  return LEGACY_ACCENTS[id] ?? id
}

function gradientSwatch(from: string, to: string) {
  return `linear-gradient(135deg, ${from}, ${to})`
}

export const accents: Accent[] = [
  {
    id: "paper",
    label: "Mono",
    kind: "solid",
    light: "oklch(0.32 0 0)",
    dark: "oklch(0.92 0 0)",
    swatch: "oklch(0.92 0 0)",
    duo: { light: "oklch(0.5 0 0)", dark: "oklch(0.72 0 0)" },
    tri: { light: "oklch(0.42 0 0)", dark: "oklch(0.55 0 0)" },
  },
  {
    id: "mint",
    label: "Mint",
    kind: "solid",
    light: "oklch(0.5 0.12 165)",
    dark: "oklch(0.78 0.12 170)",
    swatch: "oklch(0.78 0.12 170)",
    duo: { light: "oklch(0.58 0.1 165)", dark: "oklch(0.68 0.08 165)" },
    tri: { light: "oklch(0.45 0.08 165)", dark: "oklch(0.55 0.06 165)" },
  },
  {
    id: "gold",
    label: "Gold",
    kind: "duo",
    light: "oklch(0.58 0.14 75)",
    dark: "oklch(0.82 0.14 78)",
    swatch: gradientSwatch("oklch(0.84 0.1 48)", "oklch(0.82 0.14 78)"),
    duo: { light: "oklch(0.62 0.12 45)", dark: "oklch(0.84 0.1 48)" },
    tri: { light: "oklch(0.55 0.14 90)", dark: "oklch(0.86 0.12 95)" },
  },
  {
    id: "sky",
    label: "Sky",
    kind: "duo",
    light: "oklch(0.48 0.16 265)",
    dark: "oklch(0.62 0.18 265)",
    swatch: gradientSwatch("oklch(0.78 0.12 230)", "oklch(0.58 0.2 265)"),
    duo: { light: "oklch(0.52 0.12 220)", dark: "oklch(0.78 0.12 230)" },
    tri: { light: "oklch(0.45 0.16 280)", dark: "oklch(0.7 0.14 250)" },
  },
  {
    id: "lime",
    label: "Lime",
    kind: "duo",
    light: "oklch(0.52 0.16 135)",
    dark: "oklch(0.84 0.18 135)",
    swatch: gradientSwatch("oklch(0.86 0.2 128)", "oklch(0.78 0.14 195)"),
    duo: { light: "oklch(0.5 0.1 195)", dark: "oklch(0.78 0.14 195)" },
    tri: { light: "oklch(0.5 0.12 165)", dark: "oklch(0.8 0.12 165)" },
  },
  {
    id: "dusk",
    label: "Dusk",
    kind: "duo",
    light: "oklch(0.52 0.18 320)",
    dark: "oklch(0.7 0.2 320)",
    swatch: gradientSwatch("oklch(0.7 0.22 325)", "oklch(0.52 0.2 270)"),
    duo: { light: "oklch(0.48 0.16 270)", dark: "oklch(0.58 0.18 270)" },
    tri: { light: "oklch(0.5 0.14 295)", dark: "oklch(0.66 0.16 295)" },
  },
  {
    id: "coral",
    label: "Coral",
    kind: "duo",
    light: "oklch(0.55 0.18 25)",
    dark: "oklch(0.72 0.18 22)",
    swatch: gradientSwatch("oklch(0.7 0.2 18)", "oklch(0.76 0.16 55)"),
    duo: { light: "oklch(0.58 0.16 55)", dark: "oklch(0.76 0.16 55)" },
    tri: { light: "oklch(0.55 0.14 40)", dark: "oklch(0.78 0.14 40)" },
  },
  {
    id: "mist",
    label: "Mist",
    kind: "duo",
    light: "oklch(0.52 0.14 300)",
    dark: "oklch(0.76 0.12 300)",
    swatch: gradientSwatch("oklch(0.78 0.12 295)", "oklch(0.7 0.16 265)"),
    duo: { light: "oklch(0.5 0.14 270)", dark: "oklch(0.72 0.14 268)" },
    tri: { light: "oklch(0.5 0.1 285)", dark: "oklch(0.78 0.1 285)" },
  },
]

const accentById = new Map(accents.map((item) => [item.id, item]))

export function getAccent(id: string): Accent {
  return (
    accentById.get(resolveAccentId(id)) ?? accentById.get(DEFAULT_ACCENT_ID)!
  )
}

export function isAccentId(value: string | null): value is string {
  if (!value) {
    return false
  }

  return Boolean(accentById.get(resolveAccentId(value)))
}

export function accentCss(id: string) {
  const accent = getAccent(id)

  return `:root {
  --graph-accent: ${accent.light};
  --graph-accent-2: ${accent.duo.light};
  --graph-accent-3: ${accent.tri.light};
}

.dark {
  --graph-accent: ${accent.dark};
  --graph-accent-2: ${accent.duo.dark};
  --graph-accent-3: ${accent.tri.dark};
}`
}

export function setAccent(id: string) {
  const accent = getAccent(id)
  const root = document.documentElement

  if (root.getAttribute("data-accent") === accent.id) {
    return
  }

  const apply = () => {
    root.setAttribute("data-accent", accent.id)
    root.setAttribute("data-accent-kind", accent.kind)
    localStorage.setItem(ACCENT_STORAGE_KEY, accent.id)
    window.dispatchEvent(new Event(ACCENT_EVENT))
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const start = document.startViewTransition

  if (!reduce && typeof start === "function") {
    root.classList.add("accent-wiping")
    const transition = start.call(document, apply)
    void transition.finished.finally(() => {
      root.classList.remove("accent-wiping")
    })
    return
  }

  apply()

  if (!reduce) {
    root.classList.remove("accent-shimmer")
    void root.offsetWidth
    root.classList.add("accent-shimmer")
    window.setTimeout(() => {
      root.classList.remove("accent-shimmer")
    }, 420)
  }
}

export function accentBlockingScript() {
  const ids = JSON.stringify(accents.map((item) => item.id))
  const legacy = JSON.stringify(LEGACY_ACCENTS)
  const key = JSON.stringify(ACCENT_STORAGE_KEY)
  const fallback = JSON.stringify(DEFAULT_ACCENT_ID)

  return `(function(){try{var i=localStorage.getItem(${key});var ids=${ids};var legacy=${legacy};if(legacy[i])i=legacy[i];if(ids.indexOf(i)===-1)i=${fallback};var kind=(i==="paper"||i==="mint")?"solid":"duo";document.documentElement.setAttribute("data-accent",i);document.documentElement.setAttribute("data-accent-kind",kind);}catch(e){document.documentElement.setAttribute("data-accent",${fallback});document.documentElement.setAttribute("data-accent-kind","duo");}})();`
}
