"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
  toneClass,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type CheckItem = {
  label: string
  done?: boolean
  note?: string
}

type GraphCheckProps = {
  title: string
  items: CheckItem[]
  palette?: GraphPalette
  corner?: string
  className?: string
}

function GraphCheck({
  title,
  items,
  palette,
  corner,
  className,
}: GraphCheckProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.ul
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((entry) => {
            const done = Boolean(entry.done)
            const mark = done ? "[x]" : "[ ]"

            return (
              <motion.li
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3"
                key={entry.label}
                variants={item}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "select-none",
                    done ? toneClass(palette, "primary") : "text-graph-muted"
                  )}
                >
                  {mark}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span
                    className={done ? "text-foreground" : "text-graph-muted"}
                  >
                    {entry.label}
                  </span>
                  {entry.note ? (
                    <span className="text-graph-muted">{entry.note}</span>
                  ) : null}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
        <span className="sr-only">
          {items.filter((entry) => entry.done).length} of {items.length} done
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphCheck }
export type { CheckItem, GraphCheckProps }
