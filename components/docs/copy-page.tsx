"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { useOrigin } from "@/lib/docs/origin"
import { pageMarkdown, type PageCopy } from "@/lib/docs/prompt"

function CopyPage(props: PageCopy) {
  const origin = useOrigin()
  const text = pageMarkdown({ origin, ...props })

  return (
    <div className="shrink-0">
      <CopyButton caption="Copy page" label="Copy page" text={text} />
    </div>
  )
}

export { CopyPage }
