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
  fadeUp,
  staggerList,
  trackMarks,
  type Glyphs,
} from "@/registry/default/graph-frame/graph-motion"

type FunnelStep = {
  label: string
  value: number
  display?: string
}

type GraphFunnelProps = {
  title: string
  steps: FunnelStep[]
  ticks?: number
  stage?: string
  glyphs?: Glyphs
  corner?: string
  className?: string
}

function GraphFunnel({
  title,
  steps,
  ticks = 20,
  stage,
  glyphs,
  corner,
  className,
}: GraphFunnelProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const max = Math.max(...steps.map((step) => step.value), 1)
  const head = steps[0]?.value || 1
  const marks = trackMarks(glyphs)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.ol
          className="flex flex-col gap-3"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {steps.map((step, index) => {
            const width = Math.max(1, Math.round((step.value / max) * ticks))
            const percent = Math.round((step.value / head) * 100)
            const focused = Boolean(stage) && step.label === stage
            const dim = Boolean(stage) && !focused

            return (
              <motion.li
                className="grid grid-cols-[7rem_minmax(0,1fr)_8ch_4ch] items-center gap-x-4"
                key={step.label}
                style={dim ? { opacity: DIM_OPACITY } : undefined}
                variants={item}
              >
                <span className="truncate text-foreground">{step.label}</span>
                <GraphTrack>
                  {Array.from({ length: ticks }, (_, cell) => {
                    const filled = cell < width

                    return (
                      <GraphTick
                        className={
                          filled ? "text-graph-accent" : "text-graph-frame"
                        }
                        key={cell}
                      >
                        {filled ? marks.fill : marks.empty}
                      </GraphTick>
                    )
                  })}
                </GraphTrack>
                <span className="text-right text-foreground tabular-nums">
                  {step.display ?? step.value.toLocaleString()}
                </span>
                <span className="text-right text-graph-muted tabular-nums">
                  {index === 0 ? "" : `${percent}%`}
                </span>
              </motion.li>
            )
          })}
        </motion.ol>
      </GraphBody>
    </Graph>
  )
}

export { GraphFunnel }
export type { FunnelStep, GraphFunnelProps }
