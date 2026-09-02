import { apiCatalog } from "@/lib/agent/openapi"
import { requestOrigin } from "@/lib/http/origin"

export async function GET(request: Request) {
  return Response.json(apiCatalog(requestOrigin(request)), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  })
}
