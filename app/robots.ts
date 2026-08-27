import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/r/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: "mdx-graphs.kshv.me",
  }
}
