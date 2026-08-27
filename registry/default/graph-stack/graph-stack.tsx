"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

const DEFAULT_GLYPHS = ["█", "▓", "▒", "░", "#", "=", "+", "-"]

type StackSegment = {
  label: string
  value: number
}

type StackRow = {
  label: string
  segments: StackSegment[]
}

type GraphStackProps = {
  title: string
  rows: StackRow[]
  accent?: string
  ticks?: number
  glyphs?: string[]
  className?: string
}

type Painted = {
  label: string
  glyph: string
  count: number
  accent: boolean
}

function paintRow(
  segments: StackSegment[],
  ticks: number,
  glyphs: string[],
  accentLabel?: string
): Painted[] {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  let left = ticks

  return segments.map((segment, index) => {
    const raw = Math.round((segment.value / total) * ticks)
    const count =
      index === segments.length - 1
        ? Math.max(0, left)
        : Math.min(Math.max(0, raw), left)
    left -= count
    const highlighted = accentLabel
      ? segment.label === accentLabel
      : index === 0

    return {
      label: segment.label,
      glyph: glyphs[index % glyphs.length] ?? "█",
      count,
      accent: highlighted,
    }
  })
}

function GraphStack({
  title,
  rows,
  accent,
  ticks = 24,
  glyphs = DEFAULT_GLYPHS,
  className,
}: GraphStackProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const legend: string[] = []

  for (const row of rows) {
    for (const segment of row.segments) {
      if (!legend.includes(segment.label)) {
        legend.push(segment.label)
      }
    }
  }

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col gap-6 overflow-x-auto">
        <motion.ul
          role="list"
          className="flex flex-col gap-3"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {rows.map((row) => {
            const painted = paintRow(row.segments, ticks, glyphs, accent)

            return (
              <motion.li
                key={row.label}
                className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-4"
                variants={item}
              >
                <span className="truncate text-foreground">{row.label}</span>
                <span aria-hidden="true" className="flex select-none">
                  {painted.map((piece) => (
                    <span
                      className={cn(
                        "flex",
                        piece.accent ? "text-graph-accent" : "text-foreground"
                      )}
                      key={piece.label}
                      style={
                        piece.accent ? undefined : { opacity: DIM_OPACITY }
                      }
                    >
                      {Array.from({ length: piece.count }, (_, index) => (
                        <span className="w-[1ch] text-center" key={index}>
                          {piece.glyph}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
                <span className="sr-only">
                  {row.label}:{" "}
                  {row.segments
                    .map((segment) => `${segment.label} ${segment.value}`)
                    .join(", ")}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
        <ul className="flex flex-wrap gap-x-4 gap-y-1" role="list">
          {legend.map((label, index) => {
            const glyph = glyphs[index % glyphs.length] ?? "█"
            const highlighted = accent ? label === accent : index === 0

            return (
              <li
                className="flex items-center gap-2"
                key={label}
                style={highlighted ? undefined : { opacity: DIM_OPACITY }}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    highlighted ? "text-graph-accent" : "text-foreground"
                  )}
                >
                  {glyph}
                </span>
                <span
                  className={
                    highlighted ? "text-foreground" : "text-graph-muted"
                  }
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ul>
      </GraphBody>
    </Graph>
  )
}

export { GraphStack }
export type { GraphStackProps, StackRow, StackSegment }
