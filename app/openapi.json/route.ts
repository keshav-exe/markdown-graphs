import { openApiSpec } from "@/lib/agent/openapi"
import { requestOrigin } from "@/lib/http/origin"

export async function GET(request: Request) {
  return Response.json(openApiSpec(requestOrigin(request)), {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  })
}
