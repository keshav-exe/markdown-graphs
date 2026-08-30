"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody } from "@/components/graphs"
import { graphTransition } from "@/registry/default/graph-frame/graph-motion"
import { TOAST_EVENT, type ToastDetail } from "@/lib/toast"

function SiteToaster() {
  const reduce = useReducedMotion()
  const [toast, setToast] = useState<ToastDetail | null>(null)

  useEffect(() => {
    let hide = 0

    function onToast(event: Event) {
      const detail = (event as CustomEvent<ToastDetail>).detail
      if (!detail?.title) {
        return
      }

      setToast(detail)
      window.clearTimeout(hide)
      hide = window.setTimeout(() => setToast(null), 2000)
    }

    window.addEventListener(TOAST_EVENT, onToast)
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast)
      window.clearTimeout(hide)
    }
  }, [])

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <AnimatePresence>
        {toast ? (
          <motion.div
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            className="pointer-events-auto w-full max-w-xs"
            exit={{
              opacity: 0,
              transform: "translateY(8px)",
              transition: reduce
                ? { duration: 0 }
                : { duration: 0.14, ease: [0.55, 0.085, 0.68, 0.53] },
            }}
            initial={
              reduce ? false : { opacity: 0, transform: "translateY(12px)" }
            }
            key={toast.title}
            role="status"
            transition={graphTransition(reduce)}
          >
            <Graph title={toast.title}>
              {toast.message ? (
                <GraphBody className="px-4 py-4 sm:px-5 sm:py-5">
                  <p className="font-mono text-graph-muted">{toast.message}</p>
                </GraphBody>
              ) : null}
            </Graph>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { SiteToaster }
