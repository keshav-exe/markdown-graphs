"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
} from "@/registry/default/graph-frame/graph-motion"

type CellGrid = {
  label: string
  cells: number[][]
}

type GraphCellsProps = {
  title: string
  items: CellGrid[]
  className?: string
}

function Cell({ filled, delay }: { filled: boolean; delay: number }) {
  const reduce = useReducedMotion()

  return (
    <span className="relative size-2.5 shrink-0">
      <span
        aria-hidden="true"
        className="absolute inset-0 border border-graph-frame"
      />
      {filled ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-graph-accent will-change-[opacity]"
          initial={reduce ? false : { opacity: 0 }}
          transition={graphTransition(reduce, { delay })}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        />
      ) : null}
    </span>
  )
}

function GraphCells({ title, items, className }: GraphCellsProps) {
  const reduce = useReducedMotion()

  return (
    <Graph title={title} className={className}>
      <GraphBody>
        <div className="@container flex flex-col items-center justify-center gap-10 @min-[28rem]:flex-row @min-[28rem]:gap-12">
          {items.map((item, itemIndex) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-1">
                {item.cells.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1">
                    {row.map((cell, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        delay={fillDelay(
                          reduce,
                          itemIndex * 8 + rowIndex * 5 + cellIndex
                        )}
                        filled={cell === 1}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-graph-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphCells }
export type { CellGrid, GraphCellsProps }
