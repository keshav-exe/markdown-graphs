import { ImageResponse } from "next/og"

import { OgMark } from "@/lib/og/image"

export const runtime = "nodejs"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(<OgMark size={32} />, {
    width: 32,
    height: 32,
  })
}
