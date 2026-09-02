"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
  toneClass,
  trackMarks,
  type Glyphs,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"

type RankItem = {
  label: string
  value: number
  display?: string
}

type GraphRankProps = {
  title: string
  items: RankItem[]
  max?: number
  ticks?: number
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function formatValue(item: RankItem) {
  if (item.display) {
    return item.display
  }

  return item.value.toLocaleString("en-US", {
    maximumFractionDigits: Number.isInteger(item.value) ? 0 : 1,
  })
}

function GraphRank({
  title,
  items,
  max,
  ticks = 20,
  glyphs,
  palette,
  corner,
  className,
}: GraphRankProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const peak = max ?? Math.max(...items.map((entry) => entry.value), 1)
  const marks = trackMarks(glyphs, {
    empty: "-",
    rest: "=",
    fill: "=",
  })

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-3">
        <motion.ol
          className="flex w-full list-none flex-col gap-2"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((entry) => {
            const filled = Math.min(
              ticks,
              Math.round((Math.max(entry.value, 0) / peak) * ticks)
            )
            const shown = formatValue(entry)

            return (
              <motion.li
                aria-label={`${entry.label} ${shown}`}
                className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,7rem)] items-center gap-x-2 sm:gap-x-4"
                key={entry.label}
                variants={item}
              >
                <span className="truncate text-foreground">{entry.label}</span>
                <span className="flex min-w-0 items-center">
                  <span
                    aria-hidden="true"
                    className="text-graph-frame select-none"
                  >
                    [
                  </span>
                  <GraphTrack>
                    {Array.from({ length: ticks }, (_, index) => {
                      const on = index < filled

                      return (
                        <GraphTick
                          className={
                            on
                              ? toneClass(palette, "primary")
                              : "text-graph-frame"
                          }
                          key={index}
                        >
                          {on ? marks.fill : marks.empty}
                        </GraphTick>
                      )
                    })}
                  </GraphTrack>
                  <span
                    aria-hidden="true"
                    className="text-graph-frame select-none"
                  >
                    ]
                  </span>
                </span>
                <span className="text-right text-graph-muted tabular-nums">
                  {shown}
                </span>
              </motion.li>
            )
          })}
        </motion.ol>
      </GraphBody>
    </Graph>
  )
}

export { GraphRank }
export type { GraphRankProps, RankItem }
