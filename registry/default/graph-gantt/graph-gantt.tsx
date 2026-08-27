"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  clamp01,
  DIM_OPACITY,
  fadeUp,
  staggerList,
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
  className?: string
}

function GraphGantt({
  title,
  items,
  ticks,
  columns = 24,
  stage,
  progress,
  className,
}: GraphGanttProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const playhead =
    progress == null ? null : Math.round(clamp01(progress) * (columns - 1))

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col gap-4 overflow-x-auto">
        {playhead != null ? (
          <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4">
            <span />
            <span aria-hidden="true" className="flex select-none">
              {Array.from({ length: columns }, (_, index) => (
                <span
                  className={cn(
                    "w-[1ch] text-center",
                    index === playhead
                      ? "text-graph-accent"
                      : "text-transparent"
                  )}
                  key={index}
                >
                  ▾
                </span>
              ))}
            </span>
          </div>
        ) : null}
        <motion.ul
          role="list"
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
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
                key={entry.label}
                className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-4"
                style={dim ? { opacity: DIM_OPACITY } : undefined}
                variants={item}
              >
                <span
                  className={cn(
                    "truncate",
                    focused ? "text-graph-accent" : "text-foreground"
                  )}
                >
                  {entry.label}
                </span>
                <span aria-hidden="true" className="flex select-none">
                  {Array.from({ length: columns }, (_, index) => {
                    const inBar = index >= start && index < end
                    const filled = inBar && index < start + done
                    const rest = inBar && !filled

                    return (
                      <span
                        className={cn(
                          "w-[1ch] text-center",
                          filled
                            ? focused
                              ? "text-graph-accent"
                              : "text-foreground"
                            : rest
                              ? "text-graph-muted"
                              : "text-graph-frame"
                        )}
                        key={index}
                      >
                        {filled ? "█" : rest ? "░" : "-"}
                      </span>
                    )
                  })}
                </span>
                <span className="sr-only">
                  {entry.label} from {Math.round(entry.start * 100)}% to{" "}
                  {Math.round(entry.end * 100)}%
                  {entry.complete != null
                    ? `, ${Math.round(entry.complete * 100)}% complete`
                    : ""}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
        {ticks && ticks.length > 0 ? (
          <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4">
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
