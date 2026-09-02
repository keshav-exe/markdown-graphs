import { components } from "@/lib/docs/catalog"
import { toComponentJson } from "@/lib/agent/openapi"

export async function GET() {
  return Response.json(
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
