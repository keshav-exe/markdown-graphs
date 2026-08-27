"use client"

import { useState, type ReactNode } from "react"

import { CopyButton } from "@/components/docs/copy-button"
import { useAccent } from "@/hooks/use-accent"
import { accentCss } from "@/lib/accent"
import { cn } from "@/lib/utils"

function ComponentPreview({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  code: string
  children: ReactNode
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const accent = useAccent()
  const source = `${accentCss(accent.id)}\n\n${code}`

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-balance">
            {title}
          </h2>
          {description ? (
            <p className="max-w-[56ch] text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div
          className="flex shrink-0 items-center gap-1"
          role="tablist"
          aria-label="Preview or code"
        >
          {(
            [
              ["preview", "Preview"],
              ["code", "Code"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              aria-selected={tab === id}
              className={cn(
                "relative min-h-12 px-3 py-2 text-base text-muted-foreground hover:text-foreground sm:min-h-0 sm:px-2 sm:py-1 sm:text-sm",
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
      </div>

      <div className="relative min-w-0 overflow-x-auto border border-border dark:border-border">
        {tab === "preview" ? (
          <div className="w-max min-w-full p-4 sm:p-8">{children}</div>
        ) : (
          <>
            <div className="absolute top-2 right-2">
              <CopyButton label="Copy code" text={source} />
            </div>
            <pre className="overflow-x-auto p-4 text-muted-foreground sm:p-8">
              <code>{source}</code>
            </pre>
          </>
        )}
      </div>
    </section>
  )
}

export { ComponentPreview }
