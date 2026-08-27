"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function HeaderButton({
  label,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { label: string }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground",
        className
      )}
      type="button"
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
      />
      {children}
    </button>
  )
}

export { HeaderButton }
