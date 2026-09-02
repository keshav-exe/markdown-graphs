import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"

export const runtime = "nodejs"
export const alt = "Privacy · Markdown Graphs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description="No accounts. Vercel Analytics. Public GitHub star count."
      kicker="MARKDOWN GRAPHS"
      title="Privacy"
    />,
    { ...size }
  )
}
