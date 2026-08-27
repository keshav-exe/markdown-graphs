"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type CompareCell = string | boolean

type CompareRow = {
  label: string
  values: CompareCell[]
}

type GraphCompareProps = {
  title: string
  columns: string[]
  rows: CompareRow[]
  accent?: string
  className?: string
}

function cellText(value: CompareCell) {
  if (typeof value === "boolean") {
    return value ? "✓" : "–"
  }

  return value
}

function GraphCompare({
  title,
  columns,
  rows,
  accent,
  className,
}: GraphCompareProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)
  const template = `minmax(7rem,1fr) repeat(${columns.length}, minmax(4.5rem, 7rem))`

  return (
    <Graph title={title} className={className}>
      <GraphBody className="overflow-x-auto">
        <div className="flex min-w-lg flex-col gap-3">
          <div
            className="grid items-end gap-x-4"
            style={{ gridTemplateColumns: template }}
          >
            <span />
            {columns.map((column) => {
              const focused = Boolean(accent) && column === accent

              return (
                <span
                  className={cn(
                    "text-right",
                    focused ? "text-graph-accent" : "text-graph-muted"
                  )}
                  key={column}
                >
                  {column}
                </span>
              )
            })}
          </div>
          <motion.ul
            className="flex flex-col gap-2"
            initial={reduce ? false : "hidden"}
            role="list"
            variants={list}
            viewport={{ once: true, amount: 0.4 }}
            whileInView="show"
          >
            {rows.map((row) => (
              <motion.li
                className="grid items-baseline gap-x-4"
                key={row.label}
                style={{ gridTemplateColumns: template }}
                variants={item}
              >
                <span className="truncate text-foreground">{row.label}</span>
                {columns.map((column, index) => {
                  const value = row.values[index]
                  const focused = Boolean(accent) && column === accent
                  const dim = Boolean(accent) && !focused
                  const mark = typeof value === "boolean"
                  const on = value === true

                  return (
                    <span
                      className={cn(
                        "text-right",
                        !mark && "tabular-nums",
                        on && (focused || !accent) && "text-graph-accent",
                        on && dim && "text-foreground",
                        mark && !on && "text-graph-frame",
                        !mark && focused && "text-foreground",
                        !mark && dim && "text-graph-muted"
                      )}
                      key={`${row.label}-${column}`}
                      style={dim && !on ? { opacity: DIM_OPACITY } : undefined}
                    >
                      {value == null ? "" : cellText(value)}
                    </span>
                  )
                })}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphCompare }
export type { CompareCell, CompareRow, GraphCompareProps }
