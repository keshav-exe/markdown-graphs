"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fillDelay,
  graphTransition,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

const GLYPHS = "▁▂▃▄▅▆▇█"

type GraphSparkProps = {
  title: string
  data: number[]
  caption?: string
  className?: string
}

function GraphSpark({ title, data, caption, className }: GraphSparkProps) {
  const reduce = useReducedMotion()
  const max = Math.max(...data, 1)
  const last = data.length - 1
  const glyphs = data.map((value) => {
    const index = Math.round((value / max) * (GLYPHS.length - 1))
    return GLYPHS[index]
  })

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col items-center gap-4">
        <p className="flex select-none" aria-hidden="true">
          {glyphs.map((glyph, index) => {
            const live = index === last

            return (
              <motion.span
                key={`${glyph}-${index}`}
                className={cn(
                  "inline-block w-[1ch] text-center",
                  live ? "text-graph-accent" : "text-graph-muted"
                )}
                initial={reduce ? false : { opacity: 0 }}
                transition={graphTransition(reduce, {
                  delay: fillDelay(reduce, index),
                })}
                viewport={{ once: true }}
                whileInView={{ opacity: live ? 1 : DIM_OPACITY }}
              >
                {glyph}
              </motion.span>
            )
          })}
        </p>
        {caption ? <p className="text-graph-muted">{caption}</p> : null}
        <span className="sr-only">
          Sparkline with {data.length} points
          {caption ? `. ${caption}` : ""}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphSpark }
export type { GraphSparkProps }
