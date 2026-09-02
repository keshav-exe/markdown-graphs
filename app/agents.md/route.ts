import { markdownForPath } from "@/lib/agent/pages"
import { MARKDOWN_TYPE } from "@/lib/http/accept"

export async function GET() {
  const body = await markdownForPath("/agents")

  return new Response(body, {
    headers: {
      "Content-Type": MARKDOWN_TYPE,
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  })
}
