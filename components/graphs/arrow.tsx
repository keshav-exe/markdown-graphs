"use client"

import { cn } from "@/lib/utils"

function GraphArrow({
  accent = false,
  stretch = false,
  className,
}: {
  accent?: boolean
  stretch?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-6 items-center gap-1",
        stretch && "min-w-10 flex-1",
        accent ? "text-graph-accent" : "text-graph-frame",
        className
      )}
    >
      {stretch ? (
        <span className="h-px min-w-6 flex-1 border-t border-dashed border-current" />
      ) : (
        <span>- - -</span>
      )}
      <span className="shrink-0">▶</span>
    </div>
  )
}

export { GraphArrow }
