"use client"

import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { fadeUp, staggerList } from "@/components/graphs/motion"
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
            <p className="tracking-wide text-graph-muted uppercase">
              A library for MDX
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Markdown graphs
            </h1>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Tables, charts, and diagrams that look like they were typed. One
              accent color. Motion by changing a character.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={item}
          >
            <Button nativeButton={false} render={<a href="#library" />}>
              Browse the library
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#usage" />}
              variant="outline"
            >
              See usage
            </Button>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
