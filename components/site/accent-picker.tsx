"use client"

import type { CSSProperties } from "react"

import { useAccent } from "@/hooks/use-accent"
import { accents, setAccent } from "@/lib/accent"
import { cn } from "@/lib/utils"

function AccentPicker() {
  const current = useAccent()

  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono tracking-wide text-graph-muted uppercase">
        Accent
      </p>
      <div
        aria-label="Accent color"
        className="flex flex-wrap items-center gap-1"
        role="radiogroup"
      >
        {accents.map((accent) => {
          const selected = accent.id === current.id

          return (
            <button
              key={accent.id}
              aria-checked={selected}
              aria-label={accent.label}
              className={cn(
                "relative flex size-7 items-center justify-center rounded-md",
                selected && "bg-muted"
              )}
              onClick={() => setAccent(accent.id)}
              role="radio"
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-5 rounded-full",
                  accent.id === "paper" && "border border-border"
                )}
                style={{ background: accent.swatch } as CSSProperties}
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { AccentPicker }
