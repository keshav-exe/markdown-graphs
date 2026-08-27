"use client"

import { StarIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"

function GithubStarLink({
  stars,
  className,
}: {
  stars: number | null
  className?: string
}) {
  const count =
    stars === null ? null : new Intl.NumberFormat("en-US").format(stars)

  return (
    <a
      aria-label={count ? `Star on GitHub, ${count} stars` : "Star on GitHub"}
      className={cn(
        "flex items-center gap-2 text-muted-foreground hover:text-foreground",
        className
      )}
      href={GITHUB_URL}
      rel="noreferrer"
    >
      <HugeiconsIcon
        className="size-4 shrink-0"
        icon={StarIcon}
        size={16}
        strokeWidth={1.5}
      />
      <span>Star on GitHub</span>
      {count ? (
        <span className="text-foreground tabular-nums">{count}</span>
      ) : null}
    </a>
  )
}

export { GithubStarLink }
