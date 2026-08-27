"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphRule,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
  toneClass,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type DiffSign = "add" | "remove" | "keep"

type DiffRow = {
  label: string
  value: string
  sign?: DiffSign
}

type GraphDiffProps = {
  title: string
  rows: DiffRow[]
  footer?: DiffRow
  palette?: GraphPalette
  corner?: string
  className?: string
}

const signGlyph: Record<DiffSign, string> = {
  add: "+",
  remove: "-",
  keep: " ",
}

function DiffLine({
  row,
  variants,
  palette,
}: {
  row: DiffRow
  variants: ReturnType<typeof fadeUp>
  palette?: GraphPalette
}) {
  const sign = row.sign ?? "keep"
  const tone =
    sign === "add"
      ? toneClass(palette, "primary")
      : sign === "remove"
        ? toneClass(palette, "secondary")
        : sign === "keep"
          ? "text-foreground"
          : toneClass(palette, "empty")
  const mark = sign === "keep" ? toneClass(palette, "empty") : tone

  return (
    <motion.div
      className="grid grid-cols-[1.25rem_minmax(0,1fr)_8ch] items-baseline gap-x-3"
      variants={variants}
    >
      <span aria-hidden="true" className={cn("text-center select-none", mark)}>
        {signGlyph[sign]}
      </span>
      <span className={tone}>{row.label}</span>
      <span className={cn("text-right tabular-nums", tone)}>{row.value}</span>
    </motion.div>
  )
}

function GraphDiff({
  title,
  rows,
  footer,
  palette,
  corner,
  className,
}: GraphDiffProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-3">
        <motion.ul
          role="list"
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {rows.map((row) => (
            <li key={row.label}>
              <DiffLine palette={palette} row={row} variants={item} />
            </li>
          ))}
        </motion.ul>
        {footer ? (
          <>
            <GraphRule />
            <motion.div
              initial={reduce ? false : "hidden"}
              variants={list}
              viewport={{ once: true }}
              whileInView="show"
            >
              <DiffLine palette={palette} row={footer} variants={item} />
            </motion.div>
          </>
        ) : null}
      </GraphBody>
    </Graph>
  )
}

export { GraphDiff }
export type { DiffRow, DiffSign, GraphDiffProps }
