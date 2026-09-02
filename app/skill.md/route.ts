import { readSkillFile } from "@/lib/docs/skill-files"

export async function GET() {
  const body = await readSkillFile("SKILL.md")
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
