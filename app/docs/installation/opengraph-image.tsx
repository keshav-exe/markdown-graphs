import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "Install markdown graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Add markdown graphs with the shadcn CLI, or copy the files by hand."
      kicker="DOCS"
      title="Installation"
    />,
    { ...size }
  )
}
