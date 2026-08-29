"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function GraphCorners({ mark = "+" }: { mark?: string }) {
  const corner =
    "pointer-events-none absolute z-10 flex size-4 items-center justify-center bg-background font-mono text-sm leading-none text-graph-frame select-none"

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(corner, "top-0 left-0 -translate-x-1/2 -translate-y-1/2")}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(corner, "top-0 right-0 translate-x-1/2 -translate-y-1/2")}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          corner,
          "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        )}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          corner,
          "right-0 bottom-0 translate-x-1/2 translate-y-1/2"
        )}
      >
        {mark}
      </span>
    </>
  )
}

function GraphTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      className={cn(
        "absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-background px-2.5 tracking-wide whitespace-nowrap uppercase",
        className
      )}
      {...props}
    >
      <span className="graph-title-ink text-graph-accent">[ {children} ]</span>
    </figcaption>
  )
}

function GraphBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-5 py-7 sm:px-8 sm:py-8", className)} {...props} />
  )
}

function GraphRule({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("graph-rule w-full", className)}
      {...props}
    />
  )
}

function GraphRuleY({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("graph-rule-y self-stretch", className)}
      {...props}
    />
  )
}

function GraphTrack({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex w-full min-w-0 select-none", className)}
      {...props}
    />
  )
}

function GraphTick({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("min-w-[1ch] flex-1 text-center", className)}
      {...props}
    />
  )
}

function Graph({
  title,
  corner = "+",
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  title?: string
  corner?: string
}) {
  const captionId = React.useId()

  return (
    <figure
      aria-labelledby={title ? captionId : undefined}
      className={cn(
        "relative min-w-0 graph-frame font-mono text-sm text-foreground",
        className
      )}
      {...props}
    >
      {title ? <GraphTitle id={captionId}>{title}</GraphTitle> : null}
      <GraphCorners mark={corner} />
      {children}
    </figure>
  )
}

export {
  Graph,
  GraphBody,
  GraphCorners,
  GraphRule,
  GraphRuleY,
  GraphTick,
  GraphTitle,
  GraphTrack,
}
