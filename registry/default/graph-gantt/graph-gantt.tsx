"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  clamp01,
  fadeUp,
  seriesDim,
  staggerList,
  toneClass,
  trackMarks,
  type Glyphs,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type GanttItem = {
  label: string
  start: number
  end: number
  accent?: boolean
  complete?: number
}

type GraphGanttProps = {
  title: string
  items: GanttItem[]
  ticks?: string[]
  columns?: number
  stage?: string
  progress?: number
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function GraphGantt({
  title,
  items,
  ticks,
  columns = 24,
  stage,
  progress,
  glyphs,
  palette,
  corner,
  className,
}: GraphGanttProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const playhead =
    progress == null ? null : Math.round(clamp01(progress) * (columns - 1))
  const marks = trackMarks(glyphs)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-4">
        {playhead != null ? (
          <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
            <span />
            <GraphTrack>
              {Array.from({ length: columns }, (_, index) => (
                <GraphTick
                  className={
                    index === playhead
                      ? toneClass(palette, "primary")
                      : "text-transparent"
                  }
                  key={index}
                >
                  ▾
                </GraphTick>
              ))}
            </GraphTrack>
          </div>
        ) : null}
        <motion.ul
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((entry) => {
            const start = Math.round(clamp01(entry.start) * columns)
            const end = Math.max(
              start + 1,
              Math.round(clamp01(entry.end) * columns)
            )
            const span = end - start
            const done = Math.round(clamp01(entry.complete ?? 1) * span)
            const focused = stage
              ? entry.label === stage
              : Boolean(entry.accent)
            const dim = Boolean(stage) && !focused

            return (
              <motion.li
                aria-label={`${entry.label} from ${Math.round(entry.start * 100)}% to ${Math.round(entry.end * 100)}%${
                  entry.complete != null
                    ? `, ${Math.round(entry.complete * 100)}% complete`
                    : ""
                }`}
                className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-4"
                key={entry.label}
                style={seriesDim(palette, !dim)}
                variants={item}
              >
                <span
                  className={cn(
                    "truncate",
                    focused ? toneClass(palette, "primary") : "text-foreground"
                  )}
                >
                  {entry.label}
                </span>
                <GraphTrack>
                  {Array.from({ length: columns }, (_, index) => {
                    const inBar = index >= start && index < end
                    const filled = inBar && index < start + done
                    const rest = inBar && !filled

                    return (
                      <GraphTick
                        className={
                          filled
                            ? focused
                              ? toneClass(palette, "primary")
                              : "text-foreground"
                            : rest
                              ? toneClass(palette, "secondary")
                              : toneClass(palette, "empty")
                        }
                        key={index}
                      >
                        {filled ? marks.fill : rest ? marks.rest : marks.empty}
                      </GraphTick>
                    )
                  })}
                </GraphTrack>
              </motion.li>
            )
          })}
        </motion.ul>
        {ticks && ticks.length > 0 ? (
          <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
            <span />
            <div className="flex justify-between text-graph-muted">
              {ticks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
        ) : null}
      </GraphBody>
    </Graph>
  )
}

export { GraphGantt }
export type { GanttItem, GraphGanttProps }
