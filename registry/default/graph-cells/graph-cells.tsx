"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
  isMonoPalette,
  seriesClass,
  trackMarks,
  type Glyphs,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type CellGrid = {
  label: string
  cells: number[][]
}

type GraphCellsProps = {
  title: string
  items: CellGrid[]
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function GraphCells({
  title,
  items,
  glyphs,
  palette,
  corner,
  className,
}: GraphCellsProps) {
  const reduce = useReducedMotion()
  const marks = trackMarks(glyphs, {
    empty: "·",
    rest: "░",
    fill: "█",
  })

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <div className="@container flex flex-col justify-center gap-10 @min-[28rem]:flex-row @min-[28rem]:gap-12">
          {items.map((item, itemIndex) => (
            <div
              className="flex min-w-0 flex-1 flex-col gap-4"
              key={item.label}
            >
              <div aria-hidden="true" className="flex w-full flex-col gap-1">
                {item.cells.map((row, rowIndex) => (
                  <div className="flex w-full" key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const filled = cell === 1

                      return (
                        <motion.span
                          className={cn(
                            "min-w-[1ch] flex-1 text-center select-none",
                            filled
                              ? isMonoPalette(palette)
                                ? "text-graph-accent"
                                : seriesClass(palette, itemIndex)
                              : "text-graph-frame"
                          )}
                          initial={reduce || !filled ? false : { opacity: 0 }}
                          key={cellIndex}
                          transition={graphTransition(reduce, {
                            delay: fillDelay(
                              reduce,
                              itemIndex * 8 + rowIndex * 5 + cellIndex
                            ),
                          })}
                          viewport={{ once: true }}
                          whileInView={{ opacity: 1 }}
                        >
                          {filled ? marks.fill : marks.empty}
                        </motion.span>
                      )
                    })}
                  </div>
                ))}
              </div>
              <p
                className={
                  isMonoPalette(palette)
                    ? "text-graph-muted"
                    : seriesClass(palette, itemIndex)
                }
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphCells }
export type { CellGrid, GraphCellsProps }
