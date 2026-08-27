"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog } from "@base-ui/react/dialog"
import { Cancel01Icon, MenuIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { AccentPicker } from "@/components/site/accent-picker"
import { components, getStarted } from "@/lib/docs/catalog"
import { cn } from "@/lib/utils"

function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Docs" className="text-base sm:text-sm">
        <div className="flex flex-col gap-8">
          <NavGroup label="Get started">
            {getStarted.map((item) => (
              <NavItem href={item.href} key={item.href} onNavigate={onNavigate}>
                {item.label}
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup label="Components">
            {components.map((item) => (
              <NavItem
                href={`/docs/${item.slug}`}
                key={item.slug}
                onNavigate={onNavigate}
              >
                {item.title}
              </NavItem>
            ))}
          </NavGroup>
        </div>
      </nav>
      <div className="px-2">
        <AccentPicker />
      </div>
    </div>
  )
}

function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-2 font-mono tracking-wide text-graph-muted uppercase">
        {label}
      </p>
      <ul className="flex flex-col" role="list">
        {children}
      </ul>
    </div>
  )
}

function NavItem({
  href,
  children,
  onNavigate,
}: {
  href: string
  children: ReactNode
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <li>
      <Link
        aria-current={active ? "page" : undefined}
        className={cn(
          "block px-2 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground sm:py-1.5",
          active && "bg-muted text-foreground"
        )}
        href={href}
        onClick={onNavigate}
      >
        {children}
      </Link>
    </li>
  )
}

function ScrollFade({ edge }: { edge: "top" | "bottom" }) {
  const isTop = edge === "top"
  const mask = `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-10",
        isTop ? "top-0" : "bottom-0"
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isTop
            ? "bg-linear-to-b from-background from-20% to-background/0"
            : "bg-linear-to-t from-background from-20% to-background/0"
        )}
      />
      <div
        className="absolute inset-0 backdrop-blur-[8px]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  )
}

function DocsSidebar() {
  return (
    <aside className="w-52 shrink-0 max-lg:hidden">
      <div className="sticky top-0 isolate max-h-dvh">
        <div className="max-h-dvh scrollbar-none overflow-y-auto py-10">
          <DocsNav />
        </div>
        <ScrollFade edge="top" />
        <ScrollFade edge="bottom" />
      </div>
    </aside>
  )
}

function DocsMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        setOpen(next)
      }}
      open={open}
    >
      <Dialog.Trigger
        aria-label="Open docs menu"
        className="relative flex items-center gap-2 py-1 text-foreground"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
        />
        <HugeiconsIcon
          className="size-4 shrink-0"
          icon={MenuIcon}
          size={16}
          strokeWidth={1.5}
        />
        <span>Docs</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup
          className={cn(
            "graph-motion fixed inset-0 z-50 flex flex-col gap-8 overflow-y-auto bg-background p-4",
            "origin-top-left transition-[opacity,transform] duration-200 ease-out-cubic",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150"
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-foreground">Docs</Dialog.Title>
            <Dialog.Close
              aria-label="Close docs menu"
              className="relative size-8 text-foreground"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
              />
              <HugeiconsIcon
                className="size-4 shrink-0"
                icon={Cancel01Icon}
                size={16}
                strokeWidth={1.5}
              />
            </Dialog.Close>
          </div>
          <DocsNav onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { DocsMobileNav, DocsNav, DocsSidebar }
