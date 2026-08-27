"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, Copy01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

function CopyButton({
  text,
  label = "Copy",
}: {
  text: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  async function onCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      className="relative size-8 text-muted-foreground hover:text-foreground active:scale-[0.96]"
      onClick={onCopy}
      type="button"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
      />
      <span className="sr-only">{copied ? "Copied" : label}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={copied ? "check" : "copy"}
          animate={{ transform: "scale(1)", opacity: 1 }}
          className="flex size-8 items-center justify-center"
          exit={reduce ? undefined : { transform: "scale(0.3)", opacity: 0 }}
          initial={reduce ? false : { transform: "scale(0.3)", opacity: 0 }}
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

export { CopyButton }
