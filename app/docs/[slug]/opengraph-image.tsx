import { ImageResponse } from "next/og"

import { components, getComponent } from "@/lib/docs/catalog"
import { OgFrame, ogSize, ogType } from "@/lib/og/image"
import { SITE_NAME_SHORT } from "@/lib/site"

export const runtime = "nodejs"
export const size = ogSize
export const contentType = ogType

export function generateStaticParams() {
  return components.map((item) => ({ slug: item.slug }))
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getComponent(slug)

  return [
    {
      id: "og",
      alt: item ? `${item.title}. ${item.description}` : SITE_NAME_SHORT,
      size: ogSize,
      contentType: ogType,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
  id: Promise<string>
}) {
  const { slug } = await params
  const item = getComponent(slug)

  return new ImageResponse(
    <OgFrame
      description={
        item?.description ?? "ASCII tables, charts, and diagrams for MDX."
      }
      kicker={item?.name ?? "component"}
      title={item?.title ?? SITE_NAME_SHORT}
    />,
    { ...ogSize }
  )
}
