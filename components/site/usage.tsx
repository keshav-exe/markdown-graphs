"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, Copy01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Graph, GraphBody } from "@/components/graphs"
import { SiteContainer } from "@/components/site/container"

const snippet = `import { GraphTable } from "@/components/graphs"

<GraphTable
  title="WHAT THE RESEARCH COST"
  headers={["Agent", "Tokens", "Tool calls", "Time"]}
  align={["left", "right", "right", "right"]}
  rows={[
    ["Inks and paper", "115,207", "120", "16m"],
    ["Overprint and drift", "135,218", "164", "16m"],
    ["Naming the patterns", "186,716", "112", "18m"],
  ]}
  footer={["Total", "437,141", "396", "~50m"]}
/>`

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  async function onCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      className="relative size-8 text-graph-muted transition-[scale] duration-150 ease-out hover:text-foreground active:scale-[0.96]"
      onClick={onCopy}
      type="button"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
      />
      <span className="sr-only">{copied ? "Copied" : "Copy snippet"}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={copied ? "check" : "copy"}
          className="flex size-8 items-center justify-center"
          initial={reduce ? false : { transform: "scale(0.3)", opacity: 0 }}
          animate={{ transform: "scale(1)", opacity: 1 }}
          exit={reduce ? undefined : { transform: "scale(0.3)", opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", duration: 0.35, bounce: 0 }
          }
        >
          <HugeiconsIcon
            className="size-4 shrink-0"
            icon={copied ? CheckIcon : Copy01Icon}
            size={16}
            strokeWidth={1.5}
          />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function Usage() {
  return (
    <section className="py-12 sm:py-16" id="usage">
      <SiteContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
            Usage
          </h2>
          <p className="max-w-[48ch] text-pretty text-muted-foreground">
            Import a graph, pass data, drop it next to your prose. The frame and
            the accent come with it.
          </p>
        </div>

        <Graph title="USAGE">
          <GraphBody className="relative pt-10">
            <div className="absolute top-3 right-3">
              <CopyButton text={snippet} />
            </div>
            <pre className="overflow-x-auto text-sm text-muted-foreground">
              <code>{snippet}</code>
            </pre>
          </GraphBody>
        </Graph>
      </SiteContainer>
    </section>
  )
}

export { Usage }
