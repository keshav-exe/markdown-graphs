"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
} from "@/registry/default/graph-frame/graph-motion"

type GraphMeterProps = {
  title: string
  value: number
  ticks?: number
  caption?: string
  className?: string
}

function GraphMeter({
  title,
  value,
  ticks = 14,
  caption,
  className,
}: GraphMeterProps) {
  const reduce = useReducedMotion()
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * ticks)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col items-center gap-4">
        <p className="flex items-center gap-3 tabular-nums">
          <span aria-hidden="true" className="text-graph-frame select-none">
            [
          </span>
          <span className="flex select-none" aria-hidden="true">
            {Array.from({ length: ticks }, (_, index) => {
              const isFilled = index < filled

              return (
                <motion.span
                  key={index}
                  className={
                    isFilled ? "text-graph-accent" : "text-graph-frame"
                  }
                  initial={reduce || !isFilled ? false : { opacity: 0 }}
                  transition={graphTransition(reduce, {
                    delay: fillDelay(reduce, index),
                  })}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                >
                  {isFilled ? "=" : "-"}
                </motion.span>
              )
            })}
          </span>
          <span aria-hidden="true" className="text-graph-frame select-none">
            ]
          </span>
          <span className="w-[4ch] text-right text-graph-accent">
            {Math.round(clamped * 100)}%
          </span>
        </p>
        {caption ? <p className="text-graph-muted">{caption}</p> : null}
        <span className="sr-only">
          {Math.round(clamped * 100)} percent
          {caption ? ` ${caption}` : ""}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphMeter }
export type { GraphMeterProps }
