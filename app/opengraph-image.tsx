import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"
import { SITE_DESCRIPTION, SITE_NAME_SHORT } from "@/lib/site"

export const runtime = "nodejs"
export const alt = SITE_NAME_SHORT
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description={SITE_DESCRIPTION}
      kicker="OPEN SOURCE"
      title={SITE_NAME_SHORT}
    />,
    { ...size }
  )
}
