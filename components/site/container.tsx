import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function SiteContainer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}

export { SiteContainer }
