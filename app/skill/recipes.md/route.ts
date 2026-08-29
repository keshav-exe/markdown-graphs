import { readSkillFile } from "@/lib/docs/skill-files"

export async function GET() {
  const body = await readSkillFile("recipes.md")
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
