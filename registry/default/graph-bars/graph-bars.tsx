"use client"

import { motion, useReducedMotion } from "motion/react"

import { GraphArrow } from "@/registry/default/graph-frame/graph-arrow"
import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
  trackMarks,
  type Glyphs,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

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
  glyphs?: Glyphs
  corner?: string
  className?: string
}

function MiniBars({
  values,
  height,
  delay = 0,
  tone = "accent",
  fill,
}: {
  values: number[]
  height: number
  delay?: number
  tone?: "accent" | "muted"
  fill: string
}) {
  const reduce = useReducedMotion()
  const max = Math.max(...values, 1)

  return (
    <div className="flex w-full items-end">
      {values.map((value, index) => {
        const level = Math.round((value / max) * (height - 1))

        return (
          <span
            className="flex min-w-[1ch] flex-1 flex-col justify-end"
            key={index}
          >
            {Array.from({ length: height }, (_, row) => {
              const fromBottom = height - 1 - row
              const on = fromBottom <= level

              return (
                <motion.span
                  className={cn(
                    "h-[1em] w-full text-center",
                    on
                      ? tone === "accent"
                        ? "text-graph-accent"
                        : "text-graph-muted"
                      : "text-transparent"
                  )}
                  initial={reduce || !on ? false : { opacity: 0 }}
                  key={row}
                  transition={graphTransition(reduce, {
                    delay: delay + fillDelay(reduce, index, 0.03),
                  })}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                >
                  {on ? fill : " "}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </div>
  )
}

function GraphBars({
  title,
  from,
  to,
  processor,
  glyphs,
  corner,
  className,
}: GraphBarsProps) {
  const marks = trackMarks(glyphs)
  const fromHeight = from.size === "lg" ? 8 : 5
  const toHeight = to.size === "lg" ? 8 : 5

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6">
          <div className="flex min-w-0 flex-col gap-3">
            <MiniBars
              delay={0.04}
              fill={marks.fill}
              height={fromHeight}
              tone="muted"
              values={from.values}
            />
            <p className="text-graph-muted">{from.label}</p>
          </div>

          <div className="flex items-center justify-center gap-3 text-graph-muted max-sm:rotate-90">
            <GraphArrow />
            {processor ? <span>{processor}</span> : null}
            <GraphArrow />
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            <MiniBars
              delay={0.16}
              fill={marks.fill}
              height={toHeight}
              values={to.values}
            />
            <p className="text-foreground">{to.label}</p>
          </div>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { GraphBars }
export type { BarSeries, GraphBarsProps }
