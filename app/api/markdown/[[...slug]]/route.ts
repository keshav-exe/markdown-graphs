import { markdownForPath } from "@/lib/agent/pages"
import { notFoundMarkdown } from "@/lib/agent/not-found"
import { MARKDOWN_TYPE } from "@/lib/http/accept"
import { requestOrigin, requestPath } from "@/lib/http/origin"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const origin = requestOrigin(request)
  const path = requestPath(slug)
  const body = await markdownForPath(path, origin)

  if (!body) {
    return new Response(notFoundMarkdown(origin, path), {
      status: 404,
      headers: {
        "Content-Type": MARKDOWN_TYPE,
        Vary: "Accept",
        "Cache-Control": "no-store",
      },
    })
  }

  return new Response(body, {
    headers: {
      "Content-Type": MARKDOWN_TYPE,
      Vary: "Accept",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  })
}
