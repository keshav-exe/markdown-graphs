"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/components/graphs/frame"
import { fadeUp, staggerList } from "@/components/graphs/motion"
import { cn } from "@/lib/utils"

type ScaleItem = {
  ratio: string
  label: string
  token: "14" | "23" | "45" | "70"
  accent?: boolean
}

type GraphScaleProps = {
  title: string
  items: ScaleItem[]
  className?: string
}

const tokenClass: Record<ScaleItem["token"], string> = {
  "14": "text-contrast-14",
  "23": "text-contrast-23",
  "45": "text-contrast-45",
  "70": "text-contrast-70",
}

function GraphScale({ title, items, className }: GraphScaleProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)

  return (
    <Graph title={title} className={className}>
      <GraphBody>
        <motion.ul
          role="list"
          className="flex flex-col gap-3"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="show"
        >
          {items.map((entry) => (
            <motion.li
              key={entry.ratio}
              className="grid grid-cols-[5.5rem_1fr] items-baseline gap-6"
              variants={item}
            >
              <span
                className={cn(
                  "tabular-nums",
                  entry.accent ? "text-graph-accent" : tokenClass[entry.token]
                )}
              >
                {entry.ratio}
              </span>
              <span className={tokenClass[entry.token]}>{entry.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </GraphBody>
    </Graph>
  )
}

export { GraphScale }
export type { GraphScaleProps, ScaleItem }
