import { SITE_AUTHOR, SITE_EMAIL, SITE_URL } from "@/lib/site"
import { GITHUB_URL } from "@/lib/github"

export const HOME_WHAT =
  "Markdown Graphs is a set of ASCII-framed React diagrams you copy into a shadcn project. It is not an npm package of components. Each figure sits in a dashed frame with a title on the top edge."

export const HOME_WRITE =
  "An agent writing a refactor, an incident, a tradeoff, or a PR can put at most two graphs next to the prose. If the file can import React, it writes JSX. If the file is a README, a GitHub comment, Linear, or any plain Markdown, it pastes the official fenced ASCII twin from /llms.txt. It should not invent SVG, Mermaid, or homemade ASCII."

export const HOME_READ =
  "The figure is characters in the file. Opening the MDX later shows the labels and values. The agent can edit the frame the same way it wrote it."

export const HOME_INSTALL = `pnpm dlx shadcn@latest add ${SITE_URL}/r/all.json`

export const HOME_NEXT =
  "Then copy the skill from /skill.md. Fetch /llms.txt if the skill is not installed. The catalog is /docs. OpenAPI is /openapi.json."

export function homeMarkdown(origin = SITE_URL) {
  const host = origin || SITE_URL

  return `# Markdown Graphs

${HOME_WHAT}

${HOME_WRITE}

## Write

Install the skill into the folder the agent already reads. Ask for a write-up. The chooser picks the graph. Copy the props from the docs or a recipe, then swap the labels.

## Read

${HOME_READ}

## Install

${HOME_INSTALL}

${HOME_NEXT}

## Links

- For agents: ${host}/agents
- Docs: ${host}/docs
- Examples: ${host}/docs/examples
- Skill: ${host}/docs/skill
- llms.txt: ${host}/llms.txt
- OpenAPI: ${host}/openapi.json
- JSON catalog: ${host}/api/v1/components
- Sitemap: ${host}/sitemap.xml
`
}

export const ABOUT_PARAS = [
  `Markdown Graphs is an open-source library of ASCII-framed React diagrams for MDX. ${SITE_AUTHOR.name} publishes the source on GitHub under the MIT license. You copy the files into an existing shadcn project with the shadcn CLI. This is not an npm package of components.`,
  "Each graph sits in a dashed frame with a title on the top edge. Drawing graphs use one accent by default. Most graphs have an official fenced ASCII twin for README files, GitHub, Linear, and PR comments.",
  `The site at ${SITE_URL.replace("https://", "")} is the catalog, the shadcn registry, and the agent skill. The skill file tells an agent which graph to put next to prose, and whether to write JSX or paste the official fence.`,
  `Source: ${GITHUB_URL}. Mail: ${SITE_EMAIL}.`,
] as const

export const CONTACT_PARAS = [
  `Mail ${SITE_AUTHOR.name} at ${SITE_EMAIL}. That address is for the library, the site, and homepage sponsor cells.`,
  `Bugs and patches go to ${GITHUB_URL}/issues. The repository is public. The license is MIT.`,
  `On X: ${SITE_AUTHOR.x}. The handle is @kshvbgde.`,
  "There is no support desk and no SLA. If a graph is wrong, open an issue with the slug and the props you passed. If you want a homepage cell, use the sponsor page and the same email. For the skill or the registry, start on /docs/skill or /openapi.json.",
] as const

export const PRIVACY_PARAS = [
  "Markdown Graphs does not have accounts, logins, or user profiles. Copying a graph into your repo does not send us the file.",
  "The site is hosted on Vercel. Vercel Analytics records page views. We do not run ads, and we do not sell visitor data.",
  "The header may fetch the public GitHub star count for keshav-exe/markdown-graphs. That request goes to api.github.com. We do not send your identity with it.",
  `Mail to ${SITE_EMAIL} is ordinary email. Do not send secrets. The registry JSON under /r/ and the skill files are public.`,
  "If this policy changes, the new text replaces this page. There is no separate legal entity behind the project beyond the author named on /about.",
] as const

export function aboutMarkdown(origin = SITE_URL) {
  return `# About Markdown Graphs

${ABOUT_PARAS.join("\n\n")}

## Also

- Contact: ${origin}/contact
- Privacy: ${origin}/privacy
- Source: ${GITHUB_URL}
`
}

export function contactMarkdown(origin = SITE_URL) {
  return `# Contact Markdown Graphs

${CONTACT_PARAS.join("\n\n")}

- About: ${origin}/about
- Sponsor: ${origin}/sponsor
`
}

export function privacyMarkdown(origin = SITE_URL) {
  return `# Privacy · Markdown Graphs

${PRIVACY_PARAS.join("\n\n")}

- About: ${origin}/about
- Contact: ${origin}/contact
`
}

export function copyLength(paras: readonly string[]) {
  return paras.join(" ").length
}
