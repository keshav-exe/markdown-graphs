"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type SlopeItem = {
  label: string
  from: number
  to: number
}

type GraphSlopeProps = {
  title: string
  fromLabel: string
  toLabel: string
  items: SlopeItem[]
  corner?: string
  className?: string
}

function format(value: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
  })
}

function GraphSlope({
  title,
  fromLabel,
  toLabel,
  items,
  corner,
  className,
}: GraphSlopeProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-3">
        <div className="grid grid-cols-[minmax(0,1fr)_6.5rem_2rem_6.5rem] items-end gap-x-3">
          <span />
          <span className="text-right text-graph-muted">{fromLabel}</span>
          <span />
          <span className="text-right text-graph-muted">{toLabel}</span>
        </div>
        <motion.ul
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((row) => {
            const up = row.to > row.from
            const down = row.to < row.from

            return (
              <motion.li
                aria-label={`${row.label} from ${format(row.from)} to ${format(row.to)}`}
                className="grid grid-cols-[minmax(0,1fr)_6.5rem_2rem_6.5rem] items-baseline gap-x-3"
                key={row.label}
                variants={item}
              >
                <span className="truncate text-foreground">{row.label}</span>
                <span className="text-right text-graph-muted tabular-nums">
                  {format(row.from)}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-center select-none",
                    up && "text-graph-accent",
                    down && "text-graph-muted",
                    !up && !down && "text-graph-frame"
                  )}
                >
                  {up ? "→" : down ? "→" : "–"}
                </span>
                <span
                  className={cn(
                    "text-right tabular-nums",
                    up && "text-graph-accent",
                    down && "text-graph-muted",
                    !up && !down && "text-foreground"
                  )}
                >
                  {format(row.to)}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </GraphBody>
    </Graph>
  )
}

export { GraphSlope }
export type { GraphSlopeProps, SlopeItem }
