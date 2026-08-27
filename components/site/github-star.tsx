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
        "flex shrink-0 items-center gap-2 text-muted-foreground hover:text-foreground",
        className
      )}
      href={GITHUB_URL}
      rel="noreferrer"
    >
      <HugeiconsIcon
        className="size-5 shrink-0 sm:size-4 fill-foreground"
        icon={StarIcon}
        size={20}
        strokeWidth={1.5}
      />
      <span>on GitHub</span>
      {count ? (
        <span className="text-foreground tabular-nums">[{count}]</span>
      ) : null}
    </a>
  )
}

export { GithubStarLink }
