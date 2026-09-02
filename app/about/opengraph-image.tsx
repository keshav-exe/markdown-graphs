import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "About Markdown Graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Open-source ASCII-framed React diagrams for MDX. MIT. Copied with shadcn."
      kicker="MARKDOWN GRAPHS"
      title="About"
    />,
    { ...size }
  )
}
