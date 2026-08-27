"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { AccentPicker } from "@/components/site/accent-picker"
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
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      <SiteContainer>
        <motion.div
          className="flex flex-col items-start gap-8"
          initial={reduce ? false : "hidden"}
          variants={list}
          animate="show"
        >
          <motion.div className="flex flex-col gap-4" variants={item}>
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              Open source
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Markdown graphs
            </h1>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Tables, charts, and diagrams for MDX that look like they were
              typed. Copy the source into your project. One accent.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={item}
          >
            <Button nativeButton={false} render={<Link href="/docs" />}>
              Browse the docs
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/docs/installation" />}
              variant="outline"
            >
              Get the code
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <AccentPicker />
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
