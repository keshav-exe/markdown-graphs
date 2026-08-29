import type { ComponentProps } from "react"

import { SiteCorners } from "@/components/site/corners"
import { cn } from "@/lib/utils"

function SiteContainer({
  className,
  borderTop = true,
  ...props
}: ComponentProps<"div"> & { borderTop?: boolean }) {
  return (
    <div
      className={cn(
        borderTop && "border-t border-dashed border-site-rail"
      )}
    >
      <div className="relative isolate mx-auto w-full max-w-6xl border-x border-dashed border-site-rail px-4 sm:px-6 lg:px-8">
        <SiteCorners />
        <div className={cn("py-12 sm:py-16", className)} {...props} />
      </div>
    </div>
  )
}

export { SiteContainer }
