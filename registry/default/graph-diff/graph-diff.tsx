"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphRule,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type DiffSign = "add" | "remove" | "keep"

type DiffRow = {
  label: string
  value: string
  sign?: DiffSign
}

type GraphDiffProps = {
  title: string
  rows: DiffRow[]
  footer?: DiffRow
  className?: string
}

const signGlyph: Record<DiffSign, string> = {
  add: "+",
  remove: "-",
  keep: " ",
}

function DiffLine({
  row,
  variants,
}: {
  row: DiffRow
  variants: ReturnType<typeof fadeUp>
}) {
  const sign = row.sign ?? "keep"

  return (
    <motion.div
      className="grid grid-cols-[1.25rem_minmax(0,1fr)_8ch] items-baseline gap-x-3"
      variants={variants}
    >
      <span
        aria-hidden="true"
        className={cn(
          "text-center select-none",
          sign === "add" && "text-graph-accent",
          sign === "remove" && "text-graph-muted",
          sign === "keep" && "text-graph-frame"
        )}
      >
        {signGlyph[sign]}
      </span>
      <span
        className={cn(
          sign === "add" && "text-graph-accent",
          sign === "remove" && "text-graph-muted",
          sign === "keep" && "text-foreground"
        )}
      >
        {row.label}
      </span>
      <span
        className={cn(
          "text-right tabular-nums",
          sign === "add" && "text-graph-accent",
          sign === "remove" && "text-graph-muted",
          sign === "keep" && "text-foreground"
        )}
      >
        {row.value}
      </span>
    </motion.div>
  )
}

function GraphDiff({ title, rows, footer, className }: GraphDiffProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col gap-3">
        <motion.ul
          role="list"
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {rows.map((row) => (
            <li key={row.label}>
              <DiffLine row={row} variants={item} />
            </li>
          ))}
        </motion.ul>
        {footer ? (
          <>
            <GraphRule />
            <motion.div
              initial={reduce ? false : "hidden"}
              variants={list}
              viewport={{ once: true }}
              whileInView="show"
            >
              <DiffLine row={footer} variants={item} />
            </motion.div>
          </>
        ) : null}
      </GraphBody>
    </Graph>
  )
}

export { GraphDiff }
export type { DiffRow, DiffSign, GraphDiffProps }
