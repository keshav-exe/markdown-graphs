import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"
import { AGENTS_DESCRIPTION } from "@/lib/site"

export const runtime = "nodejs"
export const alt = "markdown graphs for agents"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description={AGENTS_DESCRIPTION}
      kicker="FOR AGENTS"
      title="For agents"
    />,
    { ...size }
  )
}
