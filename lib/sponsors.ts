import { SITE_EMAIL } from "@/lib/site"

export const CELL_USD = 100
export const YEAR_MONTHS = 10

export type Slot = 1 | 2 | 3 | 4

export type SponsorSlots =
  | readonly [1]
  | readonly [2]
  | readonly [3]
  | readonly [4]
  | readonly [1, 2]
  | readonly [3, 4]
  | readonly [1, 3]
  | readonly [2, 4]
  | readonly [1, 2, 3, 4]

export type Sponsor = {
  name: string
  href: string
  line: string
  slots: SponsorSlots
  logo?: string
  logoDark?: string
}

// Paste a row when someone pays. Logos go in /public/sponsors.
// After the mail, send a Dodo payment link. No checkout on this site.
//
// {
//   name: "Resend",
//   href: "https://resend.com",
//   line: "email for developers",
//   slots: [1],
//   logo: "/sponsors/resend.svg",
// },
export const sponsors: Sponsor[] = []

const ALL_SLOTS: Slot[] = [1, 2, 3, 4]

export function usd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export const sponsorPlans = [
  { cells: 1 as const, month: CELL_USD, year: CELL_USD * YEAR_MONTHS },
  {
    cells: 2 as const,
    month: CELL_USD * 2,
    year: CELL_USD * 2 * YEAR_MONTHS,
  },
  {
    cells: 4 as const,
    month: CELL_USD * 4,
    year: CELL_USD * 4 * YEAR_MONTHS,
  },
]

export function sponsorMailHref() {
  const subject = "Homepage sponsor"
  const body = ["Brand:", "URL:", "Cells (1, 2, or 4):", "Months:"].join("\n")

  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function placedSponsors(list: readonly Sponsor[] = sponsors) {
  const taken = new Set<Slot>()
  const placed: Sponsor[] = []

  for (const sponsor of list) {
    if (sponsor.slots.some((slot) => taken.has(slot))) {
      continue
    }

    for (const slot of sponsor.slots) {
      taken.add(slot)
    }

    placed.push(sponsor)
  }

  return {
    placed,
    open: ALL_SLOTS.filter((slot) => !taken.has(slot)),
  }
}

export function sponsorTitle(placed: readonly Sponsor[]) {
  if (placed.length === 1 && placed[0].slots.length === 4) {
    return placed[0].name
  }

  return "Sponsors"
}

export function slotPos(slot: Slot): { col: 1 | 2; row: 1 | 2 } {
  if (slot === 1) {
    return { col: 1, row: 1 }
  }

  if (slot === 2) {
    return { col: 2, row: 1 }
  }

  if (slot === 3) {
    return { col: 1, row: 2 }
  }

  return { col: 2, row: 2 }
}

export function gridPlacement(slots: readonly Slot[]) {
  const key = [...slots].sort((a, b) => a - b).join(",")

  switch (key) {
    case "1":
      return "col-start-1 row-start-1"
    case "2":
      return "col-start-2 row-start-1"
    case "3":
      return "col-start-1 row-start-2"
    case "4":
      return "col-start-2 row-start-2"
    case "1,2":
      return "col-span-2 col-start-1 row-start-1"
    case "3,4":
      return "col-span-2 col-start-1 row-start-2"
    case "1,3":
      return "row-span-2 col-start-1 row-start-1"
    case "2,4":
      return "row-span-2 col-start-2 row-start-1"
    case "1,2,3,4":
      return "col-span-2 row-span-2 col-start-1 row-start-1"
    default:
      return "col-start-1 row-start-1"
  }
}
