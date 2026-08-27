"use client"

import { useState } from "react"

import { CopyButton } from "@/components/docs/copy-button"
import { useAccent } from "@/hooks/use-accent"
import { useOrigin } from "@/lib/docs/origin"
import { accentCss } from "@/lib/accent"
import type { ComponentDoc } from "@/lib/docs/catalog"
import { graphUtilitiesCss, registryFiles } from "@/lib/docs/files"
import { agentPrompt } from "@/lib/docs/prompt"
import { GITHUB_TREE, GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"

type InstallTab = "cli" | "manual" | "agent"

type InstallCommandProps = {
  name: string
  doc?: Pick<
    ComponentDoc,
    "title" | "name" | "description" | "dependencies" | "props"
  >
  example?: string
}

function InstallCommand({ name, doc, example }: InstallCommandProps) {
  const [tab, setTab] = useState<InstallTab>("cli")
  const origin = useOrigin()
  const prompt = agentPrompt({ origin, registry: name, doc, example })

  return (
    <div className="flex flex-col gap-4">
      <div
        aria-label="Install method"
        className="flex flex-wrap items-center gap-1"
        role="tablist"
      >
        {(
          [
            ["cli", "CLI"],
            ["manual", "Manual"],
            ["agent", "Agent"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            aria-selected={tab === id}
            className={cn(
              "relative px-2 py-1 text-muted-foreground hover:text-foreground",
              tab === id && "bg-muted text-foreground"
            )}
            onClick={() => setTab(id)}
            role="tab"
            type="button"
          >
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
            />
            {label}
          </button>
        ))}
      </div>
      {tab === "cli" ? (
        <CliInstall name={name} />
      ) : tab === "manual" ? (
        <ManualInstall name={name} />
      ) : (
        <CopyBlock label="Prompt" value={prompt} />
      )}
    </div>
  )
}

function CliInstall({ name }: { name: string }) {
  const origin = useOrigin()
  const url = origin
    ? `pnpm dlx shadcn@latest add ${origin}/r/${name}.json`
    : `pnpm dlx shadcn@latest add <origin>/r/${name}.json`

  return <Command label="Command" value={url} />
}

function fileUrl(file: string) {
  if (file.endsWith(".ts") || file.endsWith(".tsx")) {
    return `${GITHUB_URL}/blob/main/${file}`
  }

  return `${GITHUB_TREE}/${file}`
}

function ManualInstall({ name }: { name: string }) {
  const accent = useAccent()
  const files = registryFiles[name] ?? registryFiles["graph-table"]
  const css = `${accentCss(accent.id)}\n\n${graphUtilitiesCss}`
  const source = files[files.length - 1] ?? "registry/default"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-pretty text-muted-foreground">
          Install <code className="font-mono">motion</code>, paste the CSS, then
          copy these files from the repo.
        </p>
        <Command label="Dependency" value="pnpm add motion" />
      </div>

      <CopyBlock label="CSS" value={css} />

      <div className="flex flex-col gap-2">
        <p className="font-mono tracking-wide text-graph-muted uppercase">
          Files
        </p>
        <ul
          className="flex flex-col gap-1 font-mono text-muted-foreground"
          role="list"
        >
          {files.map((file) => (
            <li key={file}>
              <a
                className="hover:text-foreground hover:underline"
                href={fileUrl(file)}
                rel="noreferrer"
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
        <p>
          <a
            className="text-foreground underline-offset-4 hover:underline"
            href={fileUrl(source)}
            rel="noreferrer"
          >
            Open on GitHub
          </a>
        </p>
      </div>
    </div>
  )
}

function CopyBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-mono tracking-wide text-graph-muted uppercase">
        {label}
      </p>
      <div className="relative min-w-0 border border-border dark:border-border">
        <div className="absolute top-2 right-2">
          <CopyButton label={`Copy ${label}`} text={value} />
        </div>
        <pre className="overflow-x-auto p-4 pr-12 text-pretty whitespace-pre-wrap text-muted-foreground">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  )
}

function Command({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-mono tracking-wide text-graph-muted uppercase">
        {label}
      </p>
      <div className="flex min-w-0 items-center gap-2 border border-border px-3 py-2 dark:border-border">
        <pre className="min-w-0 flex-1 overflow-x-auto text-muted-foreground">
          <code>{value}</code>
        </pre>
        <CopyButton label={`Copy ${label} command`} text={value} />
      </div>
    </div>
  )
}

export { Command, CopyBlock, InstallCommand, ManualInstall }
