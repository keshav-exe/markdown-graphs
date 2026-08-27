"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type SpecRow = {
  label: string
  value: string
  accent?: boolean
}

type GraphSpecProps = {
  title: string
  rows: SpecRow[]
  corner?: string
  className?: string
}

function GraphSpec({ title, rows, corner, className }: GraphSpecProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.dl
          className="flex flex-col gap-3"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="show"
        >
          {rows.map((row) => (
            <motion.div
              className="grid grid-cols-[minmax(7rem,11rem)_minmax(0,1fr)] items-baseline gap-x-6"
              key={row.label}
              variants={item}
            >
              <dt className="text-graph-muted">{row.label}</dt>
              <dd
                className={cn(
                  "tabular-nums",
                  row.accent ? "text-graph-accent" : "text-foreground"
                )}
              >
                {row.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </GraphBody>
    </Graph>
  )
}

export { GraphSpec }
export type { GraphSpecProps, SpecRow }
