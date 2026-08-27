"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type TimelineState = "done" | "now" | "next"

type TimelineEvent = {
  date: string
  label: string
  state?: TimelineState
}

type GraphTimelineProps = {
  title: string
  events: TimelineEvent[]
  corner?: string
  className?: string
}

const mark: Record<TimelineState, string> = {
  done: "●",
  now: "●",
  next: "○",
}

function GraphTimeline({
  title,
  events,
  corner,
  className,
}: GraphTimelineProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.ol
          className="flex flex-col"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {events.map((event, index) => {
            const state = event.state ?? "done"
            const last = index === events.length - 1
            const live = state === "now"

            return (
              <motion.li
                key={`${event.date}-${event.label}`}
                className="flex flex-col"
                variants={item}
              >
                <div className="grid grid-cols-[1.25rem_7rem_minmax(0,1fr)] items-baseline gap-x-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-center leading-none select-none",
                      live && "text-graph-accent",
                      state === "done" && "text-foreground",
                      state === "next" && "text-graph-muted"
                    )}
                  >
                    {mark[state]}
                  </span>
                  <span
                    className={cn(
                      "tabular-nums",
                      state === "next" ? "text-graph-muted" : "text-foreground"
                    )}
                  >
                    {event.date}
                  </span>
                  <span
                    className={cn(
                      live && "text-graph-accent",
                      state === "done" && "text-foreground",
                      state === "next" && "text-graph-muted"
                    )}
                  >
                    {event.label}
                  </span>
                </div>
                {last ? null : (
                  <div
                    aria-hidden="true"
                    className="grid grid-cols-[1.25rem_7rem_minmax(0,1fr)] gap-x-4 py-1 select-none"
                  >
                    <span className="text-center text-graph-frame">│</span>
                  </div>
                )}
              </motion.li>
            )
          })}
        </motion.ol>
      </GraphBody>
    </Graph>
  )
}

export { GraphTimeline }
export type { GraphTimelineProps, TimelineEvent, TimelineState }
