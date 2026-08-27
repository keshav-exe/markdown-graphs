"use client"

import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type TreeNode = {
  label: string
  meta?: string
  accent?: boolean
  children?: TreeNode[]
}

type GraphTreeProps = {
  title: string
  nodes: TreeNode[]
  className?: string
}

type FlatRow = {
  key: string
  branch: string
  label: string
  meta?: string
  accent?: boolean
}

function flatten(
  nodes: TreeNode[],
  prefix = "",
  trail = "root",
  isRoot = true
): FlatRow[] {
  const singleRoot = isRoot && nodes.length === 1

  return nodes.flatMap((node, index) => {
    const last = index === nodes.length - 1
    const branch = singleRoot ? "" : prefix + (last ? "└─ " : "├─ ")
    const key = `${trail}/${node.label}-${index}`
    const childPrefix = singleRoot ? "" : prefix + (last ? "   " : "│  ")
    const row: FlatRow = {
      key,
      branch,
      label: node.label,
      meta: node.meta,
      accent: node.accent,
    }
    const kids = node.children
      ? flatten(node.children, childPrefix, key, false)
      : []
    return [row, ...kids]
  })
}

function GraphTree({ title, nodes, className }: GraphTreeProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.03)
  const rows = flatten(nodes)
  const hasAccent = rows.some((row) => row.accent)

  return (
    <Graph title={title} className={className}>
      <GraphBody className="overflow-x-auto">
        <motion.ul
          role="list"
          className="flex min-w-max flex-col gap-1"
          initial={reduce ? false : "hidden"}
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {rows.map((row) => {
            const dim = hasAccent && !row.accent

            return (
              <motion.li
                key={row.key}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6"
                style={dim ? { opacity: DIM_OPACITY } : undefined}
                variants={item}
              >
                <span className="whitespace-nowrap">
                  <span
                    aria-hidden="true"
                    className="text-graph-frame select-none"
                  >
                    {row.branch}
                  </span>
                  <span
                    className={cn(
                      row.accent ? "text-graph-accent" : "text-foreground"
                    )}
                  >
                    {row.label}
                  </span>
                </span>
                {row.meta ? (
                  <span className="text-graph-muted tabular-nums">
                    {row.meta}
                  </span>
                ) : (
                  <span />
                )}
              </motion.li>
            )
          })}
        </motion.ul>
        <span className="sr-only">Tree with {rows.length} nodes</span>
      </GraphBody>
    </Graph>
  )
}

export { GraphTree }
export type { GraphTreeProps, TreeNode }
