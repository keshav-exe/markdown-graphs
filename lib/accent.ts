export const ACCENT_STORAGE_KEY = "graph-accent"
export const ACCENT_EVENT = "graph-accent"
export const DEFAULT_ACCENT_ID = "blue"

export type Accent = {
  id: string
  label: string
  light: string
  dark: string
  swatch: string
}

export const accents: Accent[] = [
  {
    id: "paper",
    label: "Paper",
    light: "oklch(0.32 0 0)",
    dark: "oklch(0.92 0 0)",
    swatch: "oklch(0.92 0 0)",
  },
  {
    id: "mint",
    label: "Mint",
    light: "oklch(0.5 0.12 165)",
    dark: "oklch(0.78 0.1 165)",
    swatch: "oklch(0.78 0.1 165)",
  },
  {
    id: "orange",
    label: "Orange",
    light: "oklch(0.58 0.16 55)",
    dark: "oklch(0.76 0.14 55)",
    swatch: "oklch(0.76 0.14 55)",
  },
  {
    id: "green",
    label: "Green",
    light: "oklch(0.5 0.14 145)",
    dark: "oklch(0.74 0.14 145)",
    swatch: "oklch(0.74 0.14 145)",
  },
  {
    id: "cyan",
    label: "Cyan",
    light: "oklch(0.5 0.1 210)",
    dark: "oklch(0.76 0.1 210)",
    swatch: "oklch(0.76 0.1 210)",
  },
  {
    id: "blue",
    label: "Blue",
    light: "oklch(0.5 0.18 255)",
    dark: "oklch(0.7 0.12 255)",
    swatch: "oklch(0.7 0.12 255)",
  },
  {
    id: "purple",
    label: "Purple",
    light: "oklch(0.5 0.16 300)",
    dark: "oklch(0.72 0.12 300)",
    swatch: "oklch(0.72 0.12 300)",
  },
  {
    id: "pink",
    label: "Pink",
    light: "oklch(0.55 0.18 8)",
    dark: "oklch(0.74 0.14 8)",
    swatch: "oklch(0.74 0.14 8)",
  },
]

const accentById = new Map(accents.map((item) => [item.id, item]))

export function getAccent(id: string): Accent {
  return accentById.get(id) ?? accentById.get(DEFAULT_ACCENT_ID)!
}

export function isAccentId(value: string | null): value is string {
  return Boolean(value && accents.some((item) => item.id === value))
}

export function accentCss(id: string) {
  const accent = getAccent(id)

  return `:root {
  --graph-accent: ${accent.light};
}

.dark {
  --graph-accent: ${accent.dark};
}`
}

export function setAccent(id: string) {
  const accent = getAccent(id)
  document.documentElement.setAttribute("data-accent", accent.id)
  localStorage.setItem(ACCENT_STORAGE_KEY, accent.id)
  window.dispatchEvent(new Event(ACCENT_EVENT))
}

export function accentBlockingScript() {
  const ids = JSON.stringify(accents.map((item) => item.id))
  const key = JSON.stringify(ACCENT_STORAGE_KEY)
  const fallback = JSON.stringify(DEFAULT_ACCENT_ID)

  return `(function(){try{var i=localStorage.getItem(${key});var ids=${ids};if(ids.indexOf(i)===-1)i=${fallback};document.documentElement.setAttribute("data-accent",i);}catch(e){document.documentElement.setAttribute("data-accent",${fallback});}})();`
}
