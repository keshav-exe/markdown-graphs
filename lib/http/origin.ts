import { SITE_URL } from "@/lib/site"

export function requestOrigin(request: Request) {
  const url = new URL(request.url)
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return url.origin
  }

  return SITE_URL
}

export function requestPath(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return "/"
  }

  const joined = `/${slug.join("/")}`
  return joined.replace(/\.md$/i, "") || "/"
}
