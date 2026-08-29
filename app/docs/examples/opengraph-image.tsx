import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "markdown graphs examples"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Short write-ups with two graphs each. A refactor, an incident, a tradeoff."
      kicker="DOCS"
      title="Examples"
    />,
    { ...size }
  )
}
