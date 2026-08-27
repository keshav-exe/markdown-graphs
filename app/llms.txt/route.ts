import { components } from "@/lib/docs/catalog"
import { chooserMarkdown } from "@/lib/docs/chooser"

export async function GET() {
  return new Response(chooserMarkdown(components), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
