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
        className="flex flex-wrap items-center gap-2"
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
                "relative size-5 rounded-full bg-(--swatch) outline-offset-2",
                accent.id === "paper" &&
                  "border border-border dark:border-border",
                selected && "outline-2 outline-foreground"
              )}
              onClick={() => setAccent(accent.id)}
              role="radio"
              style={{ "--swatch": accent.swatch } as CSSProperties}
              type="button"
            >
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
