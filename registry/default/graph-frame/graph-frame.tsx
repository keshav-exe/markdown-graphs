"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function GraphCorners() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 block -translate-x-1/2 -translate-y-1/2 bg-background px-0.5 text-graph-frame"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-10 block translate-x-1/2 -translate-y-1/2 bg-background px-0.5 text-graph-frame"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 block -translate-x-1/2 translate-y-1/2 bg-background px-0.5 text-graph-frame"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-10 block translate-x-1/2 translate-y-1/2 bg-background px-0.5 text-graph-frame"
      >
        +
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
        "absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-background px-2.5 tracking-wide whitespace-nowrap text-graph-accent uppercase",
        className
      )}
      {...props}
    >
      [ {children} ]
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

function Graph({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  title?: string
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
      <GraphCorners />
      {children}
    </figure>
  )
}

export { Graph, GraphBody, GraphCorners, GraphRule, GraphTitle }
