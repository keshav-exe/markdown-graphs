"use client"

import type { CSSProperties } from "react"
import { motion, useReducedMotion } from "motion/react"

import { GraphArrow } from "@/registry/default/graph-frame/graph-arrow"
import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import { graphTransition } from "@/registry/default/graph-frame/graph-motion"

type BarSeries = {
  label: string
  values: number[]
  size?: "sm" | "lg"
}

type GraphBarsProps = {
  title: string
  from: BarSeries
  to: BarSeries
  processor?: string
  className?: string
}

function MiniBars({
  values,
  size = "sm",
  delay = 0,
}: {
  values: number[]
  size?: "sm" | "lg"
  delay?: number
}) {
  const reduce = useReducedMotion()
  const max = Math.max(...values, 1)
  const maxHeight = size === "lg" ? 56 : 28
  const barWidth = size === "lg" ? 10 : 5

  return (
    <div className="flex items-end gap-px">
      {values.map((value, index) => (
        <motion.span
          key={index}
          className="block h-(--bar-h) w-(--bar-w) origin-bottom bg-graph-accent will-change-transform"
          initial={reduce ? false : { transform: "scaleY(0)" }}
          style={
            {
              "--bar-h": `${Math.max((value / max) * maxHeight, 2)}px`,
              "--bar-w": `${barWidth}px`,
            } as CSSProperties
          }
          transition={graphTransition(reduce, { delay: delay + index * 0.04 })}
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ transform: "scaleY(1)" }}
        />
      ))}
    </div>
  )
}

function GraphBars({
  title,
  from,
  to,
  processor = "AI",
  className,
}: GraphBarsProps) {
  return (
    <Graph title={title} className={className}>
      <GraphBody>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="flex flex-col items-center gap-3">
            <MiniBars
              delay={0.04}
              size={from.size ?? "sm"}
              values={from.values}
            />
            <p className="text-graph-muted">{from.label}</p>
          </div>

          <div className="flex items-center gap-3 text-graph-muted max-sm:rotate-90">
            <GraphArrow />
            <span>{processor}</span>
            <GraphArrow />
          </div>

          <div className="flex flex-col items-center gap-3">
            <MiniBars delay={0.16} size={to.size ?? "lg"} values={to.values} />
            <p className="text-graph-muted">{to.label}</p>
          </div>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphBars }
export type { BarSeries, GraphBarsProps }
