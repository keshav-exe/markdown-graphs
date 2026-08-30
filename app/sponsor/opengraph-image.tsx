import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "Sponsor markdown graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Four cells on the homepage, next to the title. $100 each per month."
      kicker="HOMEPAGE"
      title="Sponsor"
    />,
    { ...size }
  )
}
