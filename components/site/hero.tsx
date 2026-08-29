"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { SiteContainer } from "@/components/site/container"

function Hero() {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.09)

  return (
    <section>
      <SiteContainer borderTop={false}>
        <motion.div
          className="flex flex-col items-start gap-8"
          initial={reduce ? false : "hidden"}
          variants={list}
          animate="show"
        >
          <motion.div className="flex flex-col gap-4" variants={item}>
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              React · shadcn
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Markdown graphs
            </h1>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              React components for graphs and charts that look like markdown.
              Dashed frames, block glyphs, one accent. Install via shadcn into
              a Tailwind project, then import them in MDX or React.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={item}
          >
            <Button nativeButton={false} render={<Link href="/docs" />}>
              Read the docs
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/docs/installation" />}
              variant="outline"
            >
              Install
            </Button>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
