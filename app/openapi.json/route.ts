import { openApiSpec } from "@/lib/agent/openapi"
import { jsonOk } from "@/lib/http/api"
import { requestOrigin } from "@/lib/http/origin"

export async function GET(request: Request) {
  return jsonOk(openApiSpec(requestOrigin(request)), {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  })
}
