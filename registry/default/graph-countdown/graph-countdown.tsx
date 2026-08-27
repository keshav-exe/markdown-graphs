"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  formatHms,
  parseInstant,
  useGraphNow,
} from "@/registry/default/graph-frame/graph-clock"
import {
  fadeUp,
  toneClass,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type GraphCountdownProps = {
  title: string
  to: Date | number | string
  done?: string
  caption?: string
  palette?: GraphPalette
  corner?: string
  className?: string
}

function GraphCountdown({
  title,
  to,
  done = "done",
  caption,
  palette,
  corner,
  className,
}: GraphCountdownProps) {
  const reduce = useReducedMotion()
  const enter = fadeUp(reduce)
  const now = useGraphNow()
  const target = parseInstant(to)
  const remaining =
    now == null || !Number.isFinite(target) ? null : target - now
  const finished = remaining != null && remaining <= 0
  const value =
    remaining == null ? "00:00:00" : finished ? done : formatHms(remaining)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.div
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          variants={enter}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="show"
        >
          <p
            className={cn(
              "text-3xl tracking-tight tabular-nums sm:text-4xl",
              finished ? "text-graph-muted" : toneClass(palette, "primary")
            )}
          >
            {value}
          </p>
          {caption ? <p className="text-graph-muted">{caption}</p> : null}
        </motion.div>
        <span className="sr-only">
          {finished ? done : `remaining ${value}`}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphCountdown }
export type { GraphCountdownProps }
