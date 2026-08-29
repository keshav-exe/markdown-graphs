"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { CopyMark, useCopied } from "@/components/docs/copy-button"
import { MonoLabel } from "@/components/docs/mono-label"
import { FrameBox } from "@/components/site/corners"
import { useAccent } from "@/hooks/use-accent"
import { useOrigin } from "@/lib/docs/origin"
import { accentCss } from "@/lib/accent"
import type { ComponentDoc } from "@/lib/docs/catalog"
import { graphUtilitiesCss, registryFiles } from "@/lib/docs/files"
import { agentPrompt } from "@/lib/docs/prompt"
import { GITHUB_TREE, GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"

type InstallTab = "cli" | "manual" | "agent"

const COLLAPSED_HEIGHT = 256

type InstallCommandProps = {
  name: string
  doc?: Pick<
    ComponentDoc,
    "title" | "name" | "description" | "dependencies" | "props" | "when" | "not"
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
        <MonoLabel>Files</MonoLabel>
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

function CopyToggle({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <div className="flex justify-center py-2 graph-frame">
      <button
        className="relative px-2 py-1 font-mono tracking-wide text-muted-foreground uppercase hover:text-foreground"
        onClick={onClick}
        type="button"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
        />
        {label}
      </button>
    </div>
  )
}

function CopyBlock({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopied()
  const [open, setOpen] = useState(false)
  const [full, setFull] = useState(0)
  const preRef = useRef<HTMLPreElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const likelyLong = value.length > 400 || value.split("\n").length > 8
  const overflows = full > COLLAPSED_HEIGHT
  const collapsed = !open && (overflows || (full === 0 && likelyLong))
  const maxHeight = collapsed ? COLLAPSED_HEIGHT : full || undefined

  useLayoutEffect(() => {
    const el = preRef.current
    if (!el) {
      return
    }

    const measure = () => setFull(el.scrollHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  function collapse() {
    setOpen(false)
    boxRef.current?.scrollIntoView({ block: "nearest" })
  }

  return (
    <div className="flex min-w-0 flex-col gap-2" ref={boxRef}>
      <MonoLabel>{label}</MonoLabel>
      <FrameBox className="min-w-0">
        <button
          aria-label={copied ? "Copied" : `Copy ${label}`}
          className="w-full min-w-0 text-left hover:bg-muted/40"
          onClick={() => copy(value)}
          type="button"
        >
          <div
            className="graph-motion overflow-hidden transition-[max-height] duration-300 ease-out-cubic"
            style={{ maxHeight }}
          >
            <pre
              className="p-4 pr-12 text-pretty whitespace-pre-wrap text-muted-foreground"
              ref={preRef}
            >
              <code>{value}</code>
            </pre>
          </div>
        </button>
        <span className="pointer-events-none absolute top-2 right-2 z-20 text-muted-foreground">
          <CopyMark copied={copied} />
        </span>
        {collapsed ? (
          <CopyToggle label="Show all" onClick={() => setOpen(true)} />
        ) : null}
        {open && (overflows || likelyLong) ? (
          <CopyToggle label="Show less" onClick={collapse} />
        ) : null}
      </FrameBox>
    </div>
  )
}

function Command({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopied()

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <MonoLabel>{label}</MonoLabel>
      <FrameBox
        aria-label={copied ? "Copied" : `Copy ${label} command`}
        as="button"
        className="flex w-full min-w-0 items-center gap-2 px-3 py-2 text-left text-muted-foreground hover:bg-muted/40"
        onClick={() => copy(value)}
        type="button"
      >
        <pre className="min-w-0 flex-1 overflow-x-auto text-muted-foreground">
          <code>{value}</code>
        </pre>
        <CopyMark copied={copied} />
      </FrameBox>
    </div>
  )
}

export { Command, CopyBlock, InstallCommand, ManualInstall }
