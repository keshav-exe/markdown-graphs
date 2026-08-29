import type { ReactNode } from "react"

import { CopyPage } from "@/components/docs/copy-page"
import { SiteCorners } from "@/components/site/corners"
import type { PageCopy } from "@/lib/docs/prompt"
import { cn } from "@/lib/utils"

type DocsPageHeaderProps = {
  title: string
  titleClassName?: string
  kicker?: string
  lead?: ReactNode
  note?: string
  children?: ReactNode
  copy: PageCopy
}

function DocsPageHeader({
  title,
  titleClassName,
  kicker,
  lead,
  note,
  children,
  copy,
}: DocsPageHeaderProps) {
  return (
    <header className="relative isolate -mx-4 flex flex-col gap-3 border-b border-dashed border-site-rail px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <SiteCorners corners={["bl", "br"]} />
      <div className="flex items-start justify-between gap-6">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
            titleClassName
          )}
        >
          {title}
        </h1>
        <CopyPage {...copy} />
      </div>
      {kicker ? <p className="font-mono text-graph-accent">{kicker}</p> : null}
      {lead ? (
        <div className="max-w-[56ch] text-pretty text-muted-foreground">
          {lead}
        </div>
      ) : null}
      {note ? (
        <p className="max-w-[56ch] text-pretty text-muted-foreground">{note}</p>
      ) : null}
      {children}
    </header>
  )
}

export { DocsPageHeader }
export type { DocsPageHeaderProps }
