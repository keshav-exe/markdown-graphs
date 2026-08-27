"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fillDelay,
  graphTransition,
  resolveGlyphs,
  type Glyphs,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

const SPARK_DEFAULT = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"]

type GraphSparkProps = {
  title: string
  data: number[]
  caption?: string
  glyphs?: Glyphs
  corner?: string
  className?: string
}

function GraphSpark({
  title,
  data,
  caption,
  glyphs,
  corner,
  className,
}: GraphSparkProps) {
  const reduce = useReducedMotion()
  const max = Math.max(...data, 1)
  const last = data.length - 1
  const set = glyphs == null ? SPARK_DEFAULT : resolveGlyphs(glyphs)
  const points = data.map((value) => {
    const index = Math.round((value / max) * (set.length - 1))
    return set[index] ?? set[0] ?? "▁"
  })

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-4">
        <GraphTrack>
          {points.map((glyph, index) => {
            const live = index === last

            return (
              <GraphTick key={`${glyph}-${index}`}>
                <motion.span
                  className={cn(
                    "block w-full",
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
              </GraphTick>
            )
          })}
        </GraphTrack>
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
