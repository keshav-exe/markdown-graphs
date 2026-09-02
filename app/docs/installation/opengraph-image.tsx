import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "Install markdown graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Copy the source into a shadcn project. Then give the agent the skill."
      kicker="DOCS"
      title="Installation"
    />,
    { ...size }
  )
}
