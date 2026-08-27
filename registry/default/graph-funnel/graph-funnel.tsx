"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fadeUp,
  staggerList,
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
  className?: string
}

function GraphFunnel({
  title,
  steps,
  ticks = 20,
  stage,
  className,
}: GraphFunnelProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const max = Math.max(...steps.map((step) => step.value), 1)
  const head = steps[0]?.value || 1

  return (
    <Graph title={title} className={className}>
      <GraphBody className="overflow-x-auto">
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
                key={step.label}
                className="grid grid-cols-[7rem_minmax(0,1fr)_8ch_4ch] items-center gap-x-4"
                style={dim ? { opacity: DIM_OPACITY } : undefined}
                variants={item}
              >
                <span className="truncate text-foreground">{step.label}</span>
                <span aria-hidden="true" className="flex select-none">
                  <span className="flex text-graph-accent">
                    {Array.from({ length: width }, (_, cell) => (
                      <span className="w-[1ch] text-center" key={cell}>
                        █
                      </span>
                    ))}
                  </span>
                  {Array.from({ length: ticks - width }, (_, cell) => (
                    <span
                      className="w-[1ch] text-center text-graph-frame"
                      key={cell}
                    >
                      -
                    </span>
                  ))}
                </span>
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
