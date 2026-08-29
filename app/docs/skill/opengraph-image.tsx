import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "markdown graphs skill"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="A SKILL.md that picks a framed graph instead of drawing SVG."
      kicker="DOCS"
      title="Skill"
    />,
    { ...size }
  )
}
