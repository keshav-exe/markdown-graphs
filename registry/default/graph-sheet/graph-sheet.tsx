"use client"

import type { ReactNode } from "react"

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

type GraphAlign = "left" | "right"

type SheetSection = {
  title: string
  rows: ReactNode[][]
}

type GraphSheetProps = {
  title: string
  headers: string[]
  sections: SheetSection[]
  footer?: ReactNode[]
  align?: GraphAlign[]
  corner?: string
  className?: string
}

function side(align: GraphAlign[] | undefined, index: number): GraphAlign {
  return align?.[index] ?? (index === 0 ? "left" : "right")
}

function RuleY() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
    />
  )
}

function GraphSheet({
  title,
  headers,
  sections,
  footer,
  align,
  corner,
  className,
}: GraphSheetProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)
  const columns = headers.length

  function cellClass(index: number, extra?: string) {
    return cn(
      "relative px-3 py-2.5",
      side(align, index) === "right" ? "text-right tabular-nums" : "text-left",
      extra
    )
  }

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="px-3 py-6 sm:px-6 sm:py-8">
        <div className="@container graph-scroll-x">
          <table className="w-full min-w-lg border-separate border-spacing-0">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "relative px-3 pb-3 font-normal whitespace-nowrap text-foreground",
                      side(align, index) === "right"
                        ? "text-right"
                        : "text-left"
                    )}
                  >
                    {index > 0 ? <RuleY /> : null}
                    {header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={columns} className="p-0">
                  <GraphRule />
                </th>
              </tr>
            </thead>
            {sections.map((section, sectionIndex) => (
              <motion.tbody
                initial={reduce ? false : "hidden"}
                key={section.title}
                variants={list}
                viewport={{ once: true, amount: 0.4 }}
                whileInView="show"
              >
                {sectionIndex > 0 ? (
                  <tr>
                    <td colSpan={columns} className="pt-4 pb-1">
                      <GraphRule />
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td
                    className="px-3 pt-3 pb-1 text-graph-muted"
                    colSpan={columns}
                  >
                    {section.title}
                  </td>
                </tr>
                {section.rows.map((row, rowIndex) => (
                  <motion.tr key={rowIndex} variants={item}>
                    {row.map((cell, cellIndex) => (
                      <td
                        className={cellClass(cellIndex, "whitespace-nowrap")}
                        key={cellIndex}
                      >
                        {cellIndex > 0 ? <RuleY /> : null}
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </motion.tbody>
            ))}
            {footer ? (
              <tfoot>
                <tr>
                  <td colSpan={columns} className="pt-3 pb-3">
                    <GraphRule />
                  </td>
                </tr>
                <tr>
                  {footer.map((cell, cellIndex) => (
                    <td
                      className={cellClass(cellIndex, "whitespace-nowrap")}
                      key={cellIndex}
                    >
                      {cellIndex > 0 ? <RuleY /> : null}
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

export { GraphSheet }
export type { GraphAlign, GraphSheetProps, SheetSection }
