"use client"

import { motion, useReducedMotion } from "motion/react"

import { GraphArrow } from "@/registry/default/graph-frame/graph-arrow"
import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type FlowTone = "default" | "accent" | "muted"

type FlowNode = {
  label: string
  tone?: FlowTone
  stretch?: boolean
}

type FlowRow = {
  nodes: FlowNode[]
}

type GraphFlowProps = {
  title: string
  rows: FlowRow[]
  className?: string
}

const toneClass: Record<FlowTone, string> = {
  default: "text-foreground",
  accent: "text-graph-accent",
  muted: "text-graph-muted",
}

function GraphFlow({ title, rows, className }: GraphFlowProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.08)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="flex flex-col gap-7">
        <motion.div
          className="flex flex-col gap-7"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="show"
        >
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap"
              variants={item}
            >
              {row.nodes.map((node, nodeIndex) => {
                const tone = node.tone ?? "default"
                const live = tone === "accent"

                return (
                  <div
                    key={`${node.label}-${nodeIndex}`}
                    className={cn(
                      "flex min-w-0 items-center gap-3",
                      node.stretch && "min-w-16 flex-1"
                    )}
                  >
                    {nodeIndex > 0 ? (
                      <GraphArrow accent={live} stretch={node.stretch} />
                    ) : null}
                    <span
                      className={cn(
                        "shrink-0 whitespace-nowrap",
                        toneClass[tone]
                      )}
                    >
                      {node.label}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          ))}
        </motion.div>
      </GraphBody>
    </Graph>
  )
}

export { GraphFlow }
export type { FlowNode, FlowRow, GraphFlowProps }
