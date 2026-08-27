"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphRule,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
  toneClass,
  trackMarks,
  type Glyphs,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type WaterfallKind = "start" | "in" | "out" | "end"

type WaterfallItem = {
  label: string
  value: number
  display?: string
  kind?: WaterfallKind
}

type GraphWaterfallProps = {
  title: string
  items: WaterfallItem[]
  ticks?: number
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function resolveKind(
  item: WaterfallItem,
  index: number,
  length: number
): WaterfallKind {
  if (item.kind) {
    return item.kind
  }

  if (index === 0) {
    return "start"
  }

  if (index === length - 1) {
    return "end"
  }

  return item.value >= 0 ? "in" : "out"
}

function formatValue(item: WaterfallItem, kind: WaterfallKind) {
  if (item.display) {
    return item.display
  }

  const absolute = Math.abs(item.value)

  if (kind === "in") {
    return `+${absolute.toLocaleString("en-US")}`
  }

  if (kind === "out") {
    return `−${absolute.toLocaleString("en-US")}`
  }

  return item.value.toLocaleString("en-US")
}

function GraphWaterfall({
  title,
  items,
  ticks = 24,
  glyphs,
  palette,
  corner,
  className,
}: GraphWaterfallProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const marks = trackMarks(glyphs)
  let run = 0
  const segments = items.map((entry, index) => {
    const kind = resolveKind(entry, index, items.length)
    const magnitude = Math.abs(entry.value)

    if (kind === "start") {
      const from = 0
      const to = entry.value
      run = entry.value
      return { ...entry, kind, from, to }
    }

    if (kind === "in") {
      const from = run
      const to = run + magnitude
      run = to
      return { ...entry, kind, from, to }
    }

    if (kind === "out") {
      const to = run
      const from = run - magnitude
      run = from
      return { ...entry, kind, from, to }
    }

    const total = entry.value
    run = total
    return { ...entry, kind, from: 0, to: total }
  })
  const lows = segments.map((segment) => Math.min(segment.from, segment.to))
  const highs = segments.map((segment) => Math.max(segment.from, segment.to))
  const low = Math.min(0, ...lows)
  const high = Math.max(1, ...highs)
  const span = high - low || 1

  function column(value: number) {
    return Math.round(((value - low) / span) * ticks)
  }

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-3">
        <motion.ul
          className="flex w-full flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {segments.map((segment, index) => {
            const start = Math.min(column(segment.from), column(segment.to))
            const end = Math.max(
              column(segment.from),
              column(segment.to),
              start + 1
            )
            const isEnd = segment.kind === "end"
            const showRule = isEnd && index > 0

            return (
              <li className="flex flex-col gap-2" key={segment.label}>
                {showRule ? <GraphRule /> : null}
                <motion.div
                  className="grid grid-cols-[7rem_minmax(0,1fr)_5.5rem] items-center gap-x-4"
                  variants={item}
                >
                  <span className="truncate text-foreground">
                    {segment.label}
                  </span>
                  <GraphTrack>
                    {Array.from({ length: ticks }, (_, cell) => {
                      const filled = cell >= start && cell < end
                      const tone = !filled
                        ? toneClass(palette, "empty")
                        : segment.kind === "out"
                          ? toneClass(palette, "secondary")
                          : segment.kind === "start"
                            ? "text-foreground"
                            : toneClass(palette, "primary")

                      return (
                        <GraphTick className={tone} key={cell}>
                          {filled ? marks.fill : marks.empty}
                        </GraphTick>
                      )
                    })}
                  </GraphTrack>
                  <span
                    className={cn(
                      "text-right tabular-nums",
                      segment.kind === "out" && toneClass(palette, "secondary"),
                      segment.kind === "end" && toneClass(palette, "primary"),
                      (segment.kind === "start" || segment.kind === "in") &&
                        "text-foreground"
                    )}
                  >
                    {formatValue(segment, segment.kind)}
                  </span>
                </motion.div>
              </li>
            )
          })}
        </motion.ul>
        <span className="sr-only">
          {segments
            .map(
              (segment) =>
                `${segment.label} ${formatValue(segment, segment.kind)}`
            )
            .join(", ")}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphWaterfall }
export type { GraphWaterfallProps, WaterfallItem, WaterfallKind }
