"use client"

import dynamic from "next/dynamic"

const SponsorGrid = dynamic(
  () =>
    import("@/components/site/sponsor-grid").then((mod) => ({
      default: mod.SponsorGrid,
    })),
  { ssr: false }
)

function HeroSponsorPanel() {
  return (
    <div className="min-w-0">
      <SponsorGrid compactOnMobile />
    </div>
  )
}

export { HeroSponsorPanel }
