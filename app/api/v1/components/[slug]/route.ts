import { getComponent } from "@/lib/docs/catalog"
import { toComponentDetail } from "@/lib/agent/openapi"
import { notFoundProblem, problemResponse } from "@/lib/http/problem"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    return problemResponse(notFoundProblem(`/api/v1/components/${slug}`))
  }

  return Response.json(toComponentDetail(item), {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  })
}
