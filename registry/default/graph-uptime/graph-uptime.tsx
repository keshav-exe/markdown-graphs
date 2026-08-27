"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  resolveGlyphs,
  staggerList,
  type Glyphs,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type UptimeStatus = "ok" | "degraded" | "down" | "empty"

type GraphUptimeProps = {
  title: string
  days: UptimeStatus[]
  from?: string
  to?: string
  columns?: number
  glyphs?: Glyphs
  corner?: string
  className?: string
}

const tone: Record<UptimeStatus, string> = {
  ok: "text-graph-accent",
  degraded: "text-graph-muted",
  down: "text-graph-frame",
  empty: "text-graph-frame",
}

function GraphUptime({
  title,
  days,
  from,
  to,
  columns = 30,
  glyphs,
  corner,
  className,
}: GraphUptimeProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const known = days.filter((day) => day !== "empty")
  const ok = known.filter((day) => day === "ok").length
  const percent = known.length === 0 ? 0 : Math.round((ok / known.length) * 100)
  const cols = Math.max(1, columns)
  const rows: UptimeStatus[][] = []
  const set = resolveGlyphs(glyphs)
  const last = set.length - 1
  const mark: Record<UptimeStatus, string> = {
    ok: set[last] ?? "█",
    degraded: set[Math.min(2, last)] ?? "▒",
    down: set[0] ?? "·",
    empty: "-",
  }

  for (let index = 0; index < days.length; index += cols) {
    const row = days.slice(index, index + cols)
    while (row.length < cols) {
      row.push("empty")
    }
    rows.push(row)
  }

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-4">
        <motion.div
          aria-hidden="true"
          className="flex w-full flex-col gap-1 select-none"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {rows.map((row, rowIndex) => (
            <motion.div key={rowIndex} variants={item}>
              <GraphTrack>
                {row.map((day, index) => (
                  <GraphTick className={tone[day]} key={`${rowIndex}-${index}`}>
                    {mark[day]}
                  </GraphTick>
                ))}
              </GraphTrack>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-graph-accent tabular-nums">{percent}%</p>
          {from || to ? (
            <p className="flex gap-3 text-graph-muted">
              {from ? <span>{from}</span> : null}
              {to ? <span>{to}</span> : null}
            </p>
          ) : null}
        </div>
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-graph-muted">
          <span>
            <span className="text-graph-accent">{mark.ok}</span> up
          </span>
          <span>
            <span className="text-graph-muted">{mark.degraded}</span> slow
          </span>
          <span>
            <span className="text-graph-frame">{mark.down}</span> down
          </span>
        </p>
        <span className="sr-only">
          {percent} percent uptime over {known.length} days
          {from && to ? `, ${from} to ${to}` : ""}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphUptime }
export type { GraphUptimeProps, UptimeStatus }
