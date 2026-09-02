import type { Metadata } from "next"
import Link from "next/link"

import { CopyBlock } from "@/components/docs/install"
import { SkillInstall } from "@/components/docs/skill-install"
import {
  GraphCheck,
  GraphCompare,
  GraphFlow,
  GraphSpec,
} from "@/components/graphs"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteContainer } from "@/components/site/container"
import { Button } from "@/components/ui/button"
import { components } from "@/lib/docs/catalog"
import { skillExamples } from "@/lib/docs/skill"
import { agentsJsonLd, pageMeta } from "@/lib/seo"
import { AGENTS_DESCRIPTION } from "@/lib/site"

const tries = skillExamples.filter((item) =>
  ["Refactor", "README"].includes(item.label)
)

const kit = [
  {
    name: "Skill",
    detail:
      "When to use a figure, which one, and whether to write JSX or paste the official fence. Same two files in Cursor, Claude Code, Codex, or OpenCode.",
  },
  {
    name: "Recipes",
    detail:
      "Worked write-ups with real props. Copy the JSX, swap the labels. At most two graphs, prose between them.",
  },
  {
    name: "Twins",
    detail:
      "Fenced ASCII that survives GitHub, Linear, and a PR comment. Swap labels, keep the frame. Do not invent a fence.",
  },
  {
    name: "llms.txt",
    detail:
      "Chooser plus twins in one file, if the skill is not installed.",
  },
]

export const metadata: Metadata = pageMeta({
  title: "For agents",
  description: AGENTS_DESCRIPTION,
  path: "/agents",
})

export default function AgentsPage() {
  return (
    <main id="main">
      <JsonLd data={agentsJsonLd()} />
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              Skill · llms.txt · MDX
            </p>
            <h1 className="max-w-[16ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              For agents
            </h1>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              When a write-up needs a figure, the agent already has one. A skill
              file picks the graph. JSX goes in MDX. The official fence goes in
              a README, a PR, or Linear.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<a href="#install" />}>
              Install the skill
            </Button>
            <Button
              nativeButton={false}
              render={<a href="/llms.txt" />}
              variant="outline"
            >
              Fetch llms.txt
            </Button>
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
              Write and read
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Writing — the agent emits at most two graphs next to the claim.
              React gets JSX. Plain Markdown gets the official twin from{" "}
              <code className="font-mono">/llms.txt</code>.
            </p>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Reading — the figure is characters in the file. Opening the MDX
              shows labels and values, not a screenshot. The agent can edit the
              frame the same way it wrote it.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <GraphCompare
              columns={["JSX", "ASCII"]}
              rows={[
                { label: "MDX / React", values: [true, false] },
                { label: "README", values: [false, true] },
                { label: "GitHub / Linear", values: [false, true] },
                { label: "PR comment", values: [false, true] },
                { label: "Edit the labels", values: [true, true] },
              ]}
              title="HOST"
            />
            <GraphFlow
              rows={[
                {
                  nodes: [
                    { label: "write-up" },
                    { label: "chooser" },
                    { label: "JSX or twin", tone: "accent" },
                  ],
                },
                {
                  nodes: [
                    { label: "open the file" },
                    { label: "read the frame" },
                    { label: "edit labels", tone: "accent" },
                  ],
                },
              ]}
              title="LOOP"
            />
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              What you drop in
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              {components.length} graphs. Most have an official ASCII twin for
              files that cannot run React. The skill picks at most two.
            </p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {kit.map((entry) => (
              <div className="flex flex-col gap-2" key={entry.name}>
                <dt className="font-medium">{entry.name}</dt>
                <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                  {entry.detail}
                </dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <GraphSpec
              rows={[
                { label: "/skill.md", value: "the skill", accent: true },
                { label: "/skill/recipes.md", value: "jsx recipes" },
                { label: "/llms.txt", value: "chooser + twins" },
                { label: "/developers", value: "api + openapi" },
              ]}
              title="FETCH"
            />
            <GraphCheck
              items={[
                { label: "at most two graphs", done: true },
                { label: "prose between them", done: true },
                { label: "official twin, not homemade", done: true },
                { label: "no SVG", done: true },
              ]}
              title="RULES"
            />
          </div>
        </SiteContainer>
      </section>

      <section id="install">
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Install the skill
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Project copy travels with the repo. Personal copy is this machine
              only. If the host is React,{" "}
              <Link
                className="text-foreground underline-offset-4 hover:underline"
                href="/docs/installation"
              >
                install the components
              </Link>{" "}
              first. The graphs themselves still need to be in the project.
            </p>
          </div>
          <SkillInstall />
          <p className="max-w-[48ch] text-pretty text-muted-foreground">
            Chooser table and the full file:{" "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs/skill"
            >
              Skill
            </Link>
            .
          </p>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
              Try it
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Paste one of these after install. Each should pick two graphs and
              put prose between them.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {tries.map((item) => (
              <CopyBlock
                key={item.label}
                label={`${item.label} · ${item.hint}`}
                value={item.prompt}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs/skill"
            >
              All prompts
            </Link>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs/examples"
            >
              Examples
            </Link>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs"
            >
              Library
            </Link>
          </div>
        </SiteContainer>
      </section>
    </main>
  )
}
