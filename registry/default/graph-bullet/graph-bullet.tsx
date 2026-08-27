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

type BulletItem = {
  label: string
  value: number
  target?: number
  max?: number
  display?: string
}

type GraphBulletProps = {
  title: string
  items: BulletItem[]
  ticks?: number
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function formatItem(item: BulletItem) {
  if (item.display) {
    return item.display
  }

  const value = item.value.toLocaleString("en-US", {
    maximumFractionDigits: Number.isInteger(item.value) ? 0 : 1,
  })

  if (item.target == null) {
    return value
  }

  const target = item.target.toLocaleString("en-US", {
    maximumFractionDigits: Number.isInteger(item.target) ? 0 : 1,
  })

  return `${value} / ${target}`
}

function GraphBullet({
  title,
  items,
  ticks = 20,
  glyphs,
  palette,
  corner,
  className,
}: GraphBulletProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const marks = trackMarks(glyphs, {
    empty: "-",
    rest: "=",
    fill: "=",
  })

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-3">
        <motion.ul
          className="flex w-full flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((entry) => {
            const peak =
              entry.max ?? Math.max(entry.value, entry.target ?? 0, 1)
            const filled = Math.min(
              ticks,
              Math.round((Math.max(entry.value, 0) / peak) * ticks)
            )
            const mark =
              entry.target == null
                ? null
                : Math.min(
                    ticks - 1,
                    Math.max(
                      0,
                      Math.round((Math.max(entry.target, 0) / peak) * ticks)
                    )
                  )

            return (
              <motion.li
                aria-label={`${entry.label} ${formatItem(entry)}`}
                className="grid grid-cols-[7rem_minmax(0,1fr)_7rem] items-center gap-x-4"
                key={entry.label}
                variants={item}
              >
                <span className="truncate text-foreground">{entry.label}</span>
                <span className="flex min-w-0 items-center">
                  <span aria-hidden="true" className="text-graph-frame">
                    [
                  </span>
                  <GraphTrack>
                    {Array.from({ length: ticks }, (_, index) => {
                      const isMark = mark != null && index === mark
                      const isFill = index < filled

                      return (
                        <GraphTick
                          className={
                            isMark
                              ? toneClass(palette, "secondary")
                              : isFill
                                ? mark != null && index > mark
                                  ? toneClass(palette, "secondary")
                                  : toneClass(palette, "primary")
                                : "text-graph-frame"
                          }
                          key={index}
                        >
                          {isMark ? "|" : isFill ? marks.fill : marks.empty}
                        </GraphTick>
                      )
                    })}
                  </GraphTrack>
                  <span aria-hidden="true" className="text-graph-frame">
                    ]
                  </span>
                </span>
                <span className="text-right text-graph-muted tabular-nums">
                  {formatItem(entry)}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </GraphBody>
    </Graph>
  )
}

export { GraphBullet }
export type { BulletItem, GraphBulletProps }
