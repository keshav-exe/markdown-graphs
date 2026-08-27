"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import { graphTransition } from "@/registry/default/graph-frame/graph-motion"

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
  const glyphs = data.map((value) => {
    const index = Math.round((value / max) * (GLYPHS.length - 1))
    return GLYPHS[index]
  })

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col items-center gap-4">
        <p className="flex text-graph-accent" aria-hidden="true">
          {glyphs.map((glyph, index) => (
            <motion.span
              key={`${glyph}-${index}`}
              className="inline-block w-[1ch] text-center"
              initial={
                reduce ? false : { opacity: 0, transform: "translateY(6px)" }
              }
              transition={graphTransition(reduce, { delay: index * 0.03 })}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            >
              {glyph}
            </motion.span>
          ))}
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
