"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { Graph, GraphBody, GraphRule } from "@/components/graphs"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import {
  CELL_USD,
  gridPlacement,
  placedSponsors,
  slotPos,
  sponsorTitle,
  usd,
  type Slot,
  type Sponsor,
} from "@/lib/sponsors"
import { cn } from "@/lib/utils"

function RuleY() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
    />
  )
}

function CellRules({ col, row }: { col: 1 | 2; row: 1 | 2 }) {
  return (
    <>
      {row === 2 ? <GraphRule className="absolute top-0 left-0" /> : null}
      {col === 2 ? <RuleY /> : null}
    </>
  )
}

function SponsorMark({
  name,
  line,
  logo,
  logoDark,
}: Pick<Sponsor, "name" | "line" | "logo" | "logoDark">) {
  return (
    <>
      {logo ? (
        <>
          <img
            alt=""
            className={cn(
              "h-5 w-auto max-w-40 shrink-0 object-contain object-left sm:h-6 sm:max-w-48",
              logoDark && "dark:hidden"
            )}
            height={24}
            src={logo}
          />
          {logoDark ? (
            <img
              alt=""
              className="hidden h-5 w-auto max-w-40 shrink-0 object-contain object-left sm:h-6 sm:max-w-48 dark:block"
              height={24}
              src={logoDark}
            />
          ) : null}
          <span className="sr-only">{name}</span>
        </>
      ) : (
        <p className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
          {name}
        </p>
      )}
      <p className="text-pretty text-graph-muted group-hover:text-foreground">
        {line}
      </p>
    </>
  )
}

const hit =
  "group relative flex h-full min-w-0 flex-col items-start justify-center gap-1 px-3 py-4 sm:px-5 sm:py-6"

function OpenCell({ href, slot }: { href: string; slot: Slot }) {
  const { col, row } = slotPos(slot)
  const internal = href.startsWith("/")
  const label = internal
    ? `Open homepage sponsor cell, ${usd(CELL_USD)} per month`
    : `Mail about a homepage sponsor cell, ${usd(CELL_USD)} per month`

  const inner = (
    <>
      <CellRules col={col} row={row} />
      <p className="text-xl tracking-tight text-graph-accent tabular-nums sm:text-3xl">
        {usd(CELL_USD)}
      </p>
      <p className="text-graph-muted group-hover:text-foreground">
        <span className="sm:hidden">/ mo</span>
        <span className="max-sm:hidden">per month</span>
      </p>
    </>
  )

  if (internal) {
    return (
      <Link aria-label={label} className={hit} href={href}>
        {inner}
      </Link>
    )
  }

  return (
    <a aria-label={label} className={hit} href={href}>
      {inner}
    </a>
  )
}

function FilledCell({ sponsor }: { sponsor: Sponsor }) {
  const origin = slotPos(sponsor.slots[0] ?? 1)

  return (
    <a
      aria-label={`${sponsor.name}. ${sponsor.line}`}
      className={hit}
      href={sponsor.href}
      rel="noopener noreferrer sponsored"
      target="_blank"
    >
      <CellRules col={origin.col} row={origin.row} />
      <SponsorMark
        line={sponsor.line}
        logo={sponsor.logo}
        logoDark={sponsor.logoDark}
        name={sponsor.name}
      />
    </a>
  )
}

function compactLabel(open: number, placed: number) {
  if (open === 4) {
    return "4 open"
  }

  if (open === 0) {
    return placed === 1 ? "sold" : "full"
  }

  return `${open} open`
}

function CompactGrid({ openHref }: { openHref: string }) {
  const { placed, open } = placedSponsors()
  const internal = openHref.startsWith("/")
  const label = compactLabel(open.length, placed.length)
  const inner = (
    <GraphBody className="flex items-baseline justify-between gap-4 px-4 py-5">
      <p className="text-graph-muted">{label}</p>
      <div className="flex items-baseline gap-2 tabular-nums">
        <p className="text-graph-accent">{usd(CELL_USD)}</p>
        <p className="text-graph-muted">/ mo</p>
      </div>
    </GraphBody>
  )

  return (
    <Graph title={sponsorTitle(placed)}>
      {internal ? (
        <Link
          aria-label={`Homepage sponsors. ${label}, ${usd(CELL_USD)} per month`}
          className="block"
          href={openHref}
        >
          {inner}
        </Link>
      ) : (
        <a
          aria-label={`Homepage sponsors. ${label}, ${usd(CELL_USD)} per month`}
          className="block"
          href={openHref}
        >
          {inner}
        </a>
      )}
    </Graph>
  )
}

function SlotGrid({ openHref }: { openHref: string }) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.06)
  const { placed, open } = placedSponsors()

  return (
    <Graph className="h-full" title={sponsorTitle(placed)}>
      <GraphBody className="h-full px-0 py-0 sm:px-0 sm:py-0">
        <motion.ul
          className="grid h-full min-h-48 grid-cols-2 grid-rows-2 sm:min-h-72"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {placed.map((sponsor) => (
            <motion.li
              className={cn(
                "h-full min-h-24 min-w-0 sm:min-h-36",
                gridPlacement(sponsor.slots)
              )}
              key={sponsor.href}
              variants={item}
            >
              <FilledCell sponsor={sponsor} />
            </motion.li>
          ))}
          {open.map((slot) => (
            <motion.li
              className={cn(
                "h-full min-h-24 min-w-0 sm:min-h-36",
                gridPlacement([slot])
              )}
              key={slot}
              variants={item}
            >
              <OpenCell href={openHref} slot={slot} />
            </motion.li>
          ))}
        </motion.ul>
        <span className="sr-only">
          Homepage sponsor slots. Each open cell is {usd(CELL_USD)} per month.
        </span>
      </GraphBody>
    </Graph>
  )
}

function SponsorGrid({
  className,
  openHref = "/sponsor",
  compactOnMobile = false,
}: {
  className?: string
  openHref?: string
  compactOnMobile?: boolean
}) {
  if (!compactOnMobile) {
    return (
      <div className={cn("min-w-0", className)}>
        <SlotGrid openHref={openHref} />
      </div>
    )
  }

  return (
    <div className={cn("min-w-0", className)}>
      <div className="lg:hidden">
        <CompactGrid openHref={openHref} />
      </div>
      <div className="hidden h-full lg:block">
        <SlotGrid openHref={openHref} />
      </div>
    </div>
  )
}

export { SponsorGrid }
