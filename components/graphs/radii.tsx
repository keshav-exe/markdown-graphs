"use client"

import type { CSSProperties } from "react"

import { Graph, GraphBody } from "@/components/graphs/frame"
import { cn } from "@/lib/utils"

const OUTER = 16
const INSET = 4

type GraphRadiiProps = {
  title?: string
  outer?: number
  inset?: number
  className?: string
}

function CornerMark({
  className,
  radius,
}: {
  className: string
  radius: number
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute size-5", className)}
      style={{ borderRadius: `${radius}px` }}
    />
  )
}

function GraphRadii({
  title = "NESTED RADII",
  outer = OUTER,
  inset = INSET,
  className,
}: GraphRadiiProps) {
  const inner = outer - inset

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col items-center gap-6">
        <div
          className="relative w-full max-w-72"
          style={
            {
              "--outer": `${outer}px`,
              "--inset": `${inset}px`,
            } as CSSProperties
          }
        >
          <div
            className="relative border border-dashed border-graph-frame p-(--inset)"
            style={{ borderRadius: "var(--outer)" }}
          >
            <CornerMark
              className="top-0 left-0 border-t-2 border-l-2 border-graph-accent"
              radius={outer}
            />
            <CornerMark
              className="top-0 right-0 border-t-2 border-r-2 border-graph-accent"
              radius={outer}
            />
            <CornerMark
              className="bottom-0 left-0 border-b-2 border-l-2 border-graph-accent"
              radius={outer}
            />
            <CornerMark
              className="right-0 bottom-0 border-r-2 border-b-2 border-graph-accent"
              radius={outer}
            />

            <div
              className="relative flex min-h-48 flex-col items-center justify-center gap-3 border border-dashed border-graph-frame px-4 py-12"
              style={{
                borderRadius: `calc(var(--outer) - var(--inset))`,
              }}
            >
              <CornerMark
                className="top-0 left-0 border-t-2 border-l-2 border-graph-accent"
                radius={inner}
              />
              <CornerMark
                className="top-0 right-0 border-t-2 border-r-2 border-graph-accent"
                radius={inner}
              />
              <CornerMark
                className="bottom-0 left-0 border-b-2 border-l-2 border-graph-accent"
                radius={inner}
              />
              <CornerMark
                className="right-0 bottom-0 border-r-2 border-b-2 border-graph-accent"
                radius={inner}
              />
              <p className="text-foreground">outer {outer}px</p>
              <p className="text-foreground">inner {inner}px</p>
              <p className="text-graph-muted">
                <span aria-hidden="true">| ◀ - ▶ |</span> inset {inset}px
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-graph-muted">inner = outer − inset</p>
        <p className="text-center text-foreground tabular-nums">
          {inner}px = {outer}px − {inset}px
        </p>
      </GraphBody>
    </Graph>
  )
}

export { GraphRadii }
export type { GraphRadiiProps }
