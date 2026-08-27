import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "markdown graphs docs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="ASCII graph components for MDX. Install with the shadcn CLI or copy the files."
      kicker="DOCS"
      title="Introduction"
    />,
    { ...size }
  )
}
