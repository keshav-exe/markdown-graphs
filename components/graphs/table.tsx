"use client"

import type { ReactNode } from "react"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody, GraphRule } from "@/components/graphs/frame"
import { fadeUp, staggerList } from "@/components/graphs/motion"
import { cn } from "@/lib/utils"

type GraphAlign = "left" | "right"

type GraphTableProps = {
  title: string
  headers: string[]
  rows: ReactNode[][]
  footer?: ReactNode[]
  align?: GraphAlign[]
  className?: string
}

function GraphTable({
  title,
  headers,
  rows,
  footer,
  align,
  className,
}: GraphTableProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="px-3 py-6 sm:px-6 sm:py-8">
        <div className="@container overflow-x-auto">
          <table className="w-full min-w-lg border-separate border-spacing-0">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "px-3 pb-3 font-normal whitespace-nowrap text-foreground",
                      (align?.[index] ?? (index === 0 ? "left" : "right")) ===
                        "right"
                        ? "text-right"
                        : "text-left"
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={headers.length} className="p-0">
                  <GraphRule />
                </th>
              </tr>
            </thead>
            <motion.tbody
              initial={reduce ? false : "hidden"}
              variants={list}
              viewport={{ once: true, amount: 0.4 }}
              whileInView="show"
            >
              {rows.map((row, rowIndex) => (
                <motion.tr key={rowIndex} variants={item}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-3 py-2.5 whitespace-nowrap",
                        (align?.[cellIndex] ??
                          (cellIndex === 0 ? "left" : "right")) === "right"
                          ? "text-right tabular-nums"
                          : "text-left"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </motion.tbody>
            {footer ? (
              <tfoot>
                <tr>
                  <td colSpan={headers.length} className="pt-2 pb-3">
                    <GraphRule />
                  </td>
                </tr>
                <tr>
                  {footer.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-3 pt-1 whitespace-nowrap",
                        (align?.[cellIndex] ??
                          (cellIndex === 0 ? "left" : "right")) === "right"
                          ? "text-right tabular-nums"
                          : "text-left"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphTable }
export type { GraphTableProps }
