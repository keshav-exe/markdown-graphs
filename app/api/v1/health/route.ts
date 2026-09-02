import { jsonOk } from "@/lib/http/api"
import { methodNotAllowed } from "@/lib/http/api"
import { SITE_URL } from "@/lib/site"

export async function GET() {
  return jsonOk(
    {
      ok: true,
      service: "Markdown Graphs",
      version: "1.0.0",
      url: SITE_URL,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  )
}

export async function POST() {
  return methodNotAllowed("/api/v1/health")
}
