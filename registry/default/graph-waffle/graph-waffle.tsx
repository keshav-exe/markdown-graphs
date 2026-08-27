"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type GraphWaffleProps = {
  title: string
  value: number
  cells?: number
  columns?: number
  caption?: string
  className?: string
}

function GraphWaffle({
  title,
  value,
  cells = 100,
  columns = 10,
  caption,
  className,
}: GraphWaffleProps) {
  const reduce = useReducedMotion()
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * cells)
  const rows = Math.ceil(cells / columns)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col items-center gap-4">
        <div
          aria-hidden="true"
          className="flex flex-col gap-1 select-none"
          style={{ width: `${columns}ch` }}
        >
          {Array.from({ length: rows }, (_, row) => (
            <div className="flex" key={row}>
              {Array.from({ length: columns }, (_, column) => {
                const index = row * columns + column
                if (index >= cells) {
                  return <span className="w-[1ch]" key={column} />
                }
                const isFilled = index < filled

                return (
                  <motion.span
                    className={cn(
                      "w-[1ch] text-center",
                      isFilled ? "text-graph-accent" : "text-graph-frame"
                    )}
                    initial={reduce || !isFilled ? false : { opacity: 0 }}
                    key={column}
                    transition={graphTransition(reduce, {
                      delay: fillDelay(reduce, index, 0.006),
                    })}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1 }}
                  >
                    {isFilled ? "█" : "░"}
                  </motion.span>
                )
              })}
            </div>
          ))}
        </div>
        <p className="w-[4ch] text-center text-graph-accent tabular-nums">
          {Math.round(clamped * 100)}%
        </p>
        {caption ? <p className="text-graph-muted">{caption}</p> : null}
        <span className="sr-only">
          {Math.round(clamped * 100)} percent
          {caption ? `. ${caption}` : ""}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphWaffle }
export type { GraphWaffleProps }
