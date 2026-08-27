"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

const columnClass: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
}

type StatItem = {
  value: string
  label: string
  hint?: string
  accent?: boolean
}

type GraphStatProps = {
  title: string
  items: StatItem[]
  corner?: string
  className?: string
}

function GraphStat({ title, items, corner, className }: GraphStatProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.06)
  const columns = Math.min(items.length, 4)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.ul
          className={cn("grid gap-8", columnClass[columns])}
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="show"
        >
          {items.map((entry) => (
            <motion.li
              className="flex flex-col gap-2"
              key={entry.label}
              variants={item}
            >
              <p
                className={cn(
                  "text-3xl tracking-tight tabular-nums sm:text-4xl",
                  entry.accent ? "text-graph-accent" : "text-foreground"
                )}
              >
                {entry.value}
              </p>
              <p className="text-graph-muted">{entry.label}</p>
              {entry.hint ? (
                <p className="text-graph-muted">{entry.hint}</p>
              ) : null}
            </motion.li>
          ))}
        </motion.ul>
      </GraphBody>
    </Graph>
  )
}

export { GraphStat }
export type { GraphStatProps, StatItem }
