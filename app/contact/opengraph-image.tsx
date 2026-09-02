import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "Contact Markdown Graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="Mail hi@kshv.me. Bugs go to GitHub."
      kicker="MARKDOWN GRAPHS"
      title="Contact"
    />,
    { ...size }
  )
}
