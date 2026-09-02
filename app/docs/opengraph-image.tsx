import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "markdown graphs docs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Framed graphs for MDX. A skill so agents pick a component instead of drawing SVG."
      kicker="DOCS"
      title="Introduction"
    />,
    { ...size }
  )
}
