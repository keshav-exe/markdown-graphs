"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { SiteContainer } from "@/components/site/container"
import { SponsorGrid } from "@/components/site/sponsor-grid"

function Hero() {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.09)

  return (
    <section>
      <SiteContainer borderTop={false} className="py-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="flex min-w-0 flex-col items-start gap-8"
            initial={reduce ? false : "hidden"}
            variants={list}
            animate="show"
          >
            <motion.div className="flex flex-col gap-4" variants={item}>
              <p className="font-mono tracking-wide text-graph-muted uppercase">
                For agents · MDX
              </p>
              <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Markdown graphs
              </h1>
              <p className="max-w-[48ch] text-pretty text-muted-foreground">
                Framed graphs an agent can drop next to prose. JSX in MDX.
                Official ASCII in a README. A skill so it picks a component
                instead of drawing SVG.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={item}
            >
              <Button nativeButton={false} render={<Link href="/agents" />}>
                For agents
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
          <div className="min-w-0">
            <SponsorGrid compactOnMobile />
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
