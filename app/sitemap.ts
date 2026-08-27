import type { MetadataRoute } from "next"

import { components } from "@/lib/docs/catalog"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/docs",
    "/docs/installation",
    ...components.map((item) => `/docs/${item.slug}`),
  ]

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : new URL(path, SITE_URL).toString(),
  }))
}
