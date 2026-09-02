import { components } from "@/lib/docs/catalog"
import { toComponentJson } from "@/lib/agent/openapi"
import { jsonOk, methodNotAllowed } from "@/lib/http/api"

export async function GET() {
  return jsonOk(
    {
      components: components.map(toComponentJson),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
      },
    }
  )
}

export async function POST() {
  return methodNotAllowed("/api/v1/components")
}
