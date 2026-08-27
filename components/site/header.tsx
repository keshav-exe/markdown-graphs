"use client"

import Link from "next/link"
import { Dialog } from "@base-ui/react/dialog"
import { Cancel01Icon, MenuIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { GithubStarLink } from "@/components/site/github-star"
import { SiteContainer } from "@/components/site/container"
import { cn } from "@/lib/utils"

function SiteHeader({ stars }: { stars: number | null }) {
  return (
    <header className="pt-4 sm:pt-6">
      <SiteContainer>
        <div className="flex items-center gap-6">
          <Link className="text-foreground" href="/">
            markdown graphs
          </Link>

          <nav aria-label="Primary" className="max-lg:hidden">
            <ul className="flex items-center gap-6" role="list">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="/docs"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="/docs/installation"
                >
                  Install
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-6 max-lg:hidden">
            <GithubStarLink stars={stars} />
            <p className="text-muted-foreground">
              Press <kbd className="text-foreground">d</kbd> for theme
            </p>
          </div>

          <Dialog.Root>
            <Dialog.Trigger
              aria-label="Open menu"
              className="relative ml-auto size-8 text-foreground lg:hidden"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
              />
              <HugeiconsIcon
                className="size-6 shrink-0"
                icon={MenuIcon}
                size={24}
                strokeWidth={1.5}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Popup
                className={cn(
                  "graph-motion fixed inset-0 z-50 flex flex-col gap-10 bg-background p-4",
                  "origin-top-right transition-[opacity,transform] duration-200 ease-out-cubic",
                  "data-starting-style:scale-95 data-starting-style:opacity-0",
                  "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150"
                )}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-foreground">Menu</Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="relative size-8 text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
                    />
                    <HugeiconsIcon
                      className="size-6 shrink-0"
                      icon={Cancel01Icon}
                      size={24}
                      strokeWidth={1.5}
                    />
                  </Dialog.Close>
                </div>
                <ul className="flex flex-col gap-6" role="list">
                  <li>
                    <Dialog.Close
                      nativeButton={false}
                      render={
                        <Link
                          className="text-2xl text-foreground"
                          href="/docs"
                        />
                      }
                    >
                      Docs
                    </Dialog.Close>
                  </li>
                  <li>
                    <Dialog.Close
                      nativeButton={false}
                      render={
                        <Link
                          className="text-2xl text-foreground"
                          href="/docs/installation"
                        />
                      }
                    >
                      Install
                    </Dialog.Close>
                  </li>
                  <li>
                    <div className="text-2xl">
                      <GithubStarLink stars={stars} />
                    </div>
                  </li>
                </ul>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </SiteContainer>
    </header>
  )
}

export { SiteHeader }
