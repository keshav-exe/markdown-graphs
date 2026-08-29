import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

const cornerClass = {
  tl: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  tr: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  bl: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
} as const

type Corner = keyof typeof cornerClass

const ALL_CORNERS: Corner[] = ["tl", "tr", "bl", "br"]

function SiteCorners({
  mark = "+",
  corners = ALL_CORNERS,
  tone = "rail",
  className,
}: {
  mark?: string
  corners?: readonly Corner[]
  tone?: "rail" | "frame"
  className?: string
}) {
  return (
    <>
      {corners.map((corner) => (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 block bg-background px-0.5 font-mono text-sm leading-none select-none",
            tone === "frame" ? "text-graph-frame" : "text-site-rail",
            cornerClass[corner],
            className
          )}
          key={corner}
        >
          {mark}
        </span>
      ))}
    </>
  )
}

type FrameBoxProps<T extends ElementType = "div"> = {
  as?: T
  corners?: readonly Corner[]
  tone?: "rail" | "frame"
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">

function FrameBox<T extends ElementType = "div">({
  as,
  className,
  corners = ALL_CORNERS,
  tone = "frame",
  children,
  ...props
}: FrameBoxProps<T>) {
  const Comp = as ?? "div"

  return (
    <Comp className={cn("relative isolate graph-frame", className)} {...props}>
      <SiteCorners corners={corners} tone={tone} />
      {children}
    </Comp>
  )
}

export { FrameBox, SiteCorners }
export type { Corner }
