import { apiIndex } from "@/lib/agent/openapi"
import { jsonOk } from "@/lib/http/api"
import { methodNotAllowed } from "@/lib/http/api"
import { requestOrigin } from "@/lib/http/origin"

export async function GET(request: Request) {
  return jsonOk(apiIndex(requestOrigin(request)), {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  })
}

export async function POST() {
  return methodNotAllowed("/api/v1")
}
