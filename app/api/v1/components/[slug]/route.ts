import { getComponent } from "@/lib/docs/catalog"
import { toComponentDetail } from "@/lib/agent/openapi"
import { apiNotFound, jsonOk, methodNotAllowed } from "@/lib/http/api"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    return apiNotFound(`/api/v1/components/${slug}`)
  }

  return jsonOk(toComponentDetail(item), {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  })
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return methodNotAllowed(`/api/v1/components/${slug}`)
}
