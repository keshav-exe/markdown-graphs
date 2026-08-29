"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, Copy01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

function useCopied(ms = 1500) {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), ms)
  }

  return { copied, copy }
}

function CopyMark({ copied, caption }: { copied: boolean; caption?: string }) {
  const reduce = useReducedMotion()

  return (
    <span
      className={cn(
        "flex items-center",
        caption ? "h-8 gap-2" : "size-8 justify-center"
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={copied ? "check" : "copy"}
          animate={{ transform: "scale(1)", opacity: 1 }}
          className="flex size-4 items-center justify-center"
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
      {caption ? <span>{copied ? "Copied" : caption}</span> : null}
    </span>
  )
}

function CopyButton({
  text,
  label = "Copy",
  caption,
}: {
  text: string
  label?: string
  caption?: string
}) {
  const { copied, copy } = useCopied()

  return (
    <button
      aria-label={copied ? "Copied" : label}
      className={cn(
        "relative text-muted-foreground hover:text-foreground active:scale-[0.96] motion-reduce:active:scale-100",
        caption
          ? "flex h-8 shrink-0 items-center gap-2"
          : "flex size-8 items-center justify-center"
      )}
      onClick={() => copy(text)}
      type="button"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
      />
      <CopyMark copied={copied} caption={caption} />
    </button>
  )
}

export { CopyButton, CopyMark, useCopied }
