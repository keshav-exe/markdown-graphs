import type { ComponentDoc } from "@/lib/docs/catalog"
import { SITE_URL } from "@/lib/site"

export const CHOOSER: Record<string, { when: string; not: string }> = {
  "graph-table": {
    when: "Good when the numbers belong in a spreadsheet.",
    not: "Bars, rankings, and sparklines have their own components.",
  },
  "graph-flow": {
    when: "Good for a pipeline or a path through a system.",
    not: "A dated list is Timeline. A schedule with start and end is Gantt.",
  },
  "graph-bars": {
    when: "Good for a before and after, or any two small histograms.",
    not: "A ranked list is Rank.",
  },
  "graph-rank": {
    when: "Good for traffic, coverage, or anything you'd sort highest first.",
    not: "Two histograms side by side is Bars. A table of numbers is Table.",
  },
  "graph-cells": {
    when: "Good for a small grid of filled and empty cells.",
    not: "A share of a hundred cells is Waffle. A year of days is Activity.",
  },
  "graph-meter": {
    when: "Good for one value between 0 and 1, shown as a fill.",
    not: "Actual versus a target is Bullet. Parts of a whole is Stack.",
  },
  "graph-spark": {
    when: "Good for a handful of numbers when you don't need an axis.",
    not: "If you need a y-scale, use Plot.",
  },
  "graph-kpi": {
    when: "Good when one number is the headline and the rest is context.",
    not: "Several numbers with no trend is Stat.",
  },
  "graph-tree": {
    when: "Good for nested files or an org chart.",
    not: "A timeline or a table.",
  },
  "graph-timeline": {
    when: "Good for dated events, with one of them marked current.",
    not: "A schedule with start and end dates is Gantt.",
  },
  "graph-stack": {
    when: "Good for parts of a whole on one track.",
    not: "There is no pie chart. Use Waffle if you want a share of cells.",
  },
  "graph-funnel": {
    when: "Good for steps that get narrower as people drop off.",
    not: "A ranked list is Rank. A process diagram is Flow.",
  },
  "graph-gantt": {
    when: "Good for items with a start and end on a shared track.",
    not: "A dated log is Timeline.",
  },
  "graph-plot": {
    when: "Good when the series needs a y-scale.",
    not: "A handful of points with no axis is Spark.",
  },
  "graph-waffle": {
    when: "Good for a share shown as a grid of about a hundred cells.",
    not: "Labeled parts of a whole is Stack.",
  },
  "graph-diff": {
    when: "Good for rows that were added, removed, or kept.",
    not: "A list of numeric before and after is Slope.",
  },
  "graph-invoice": {
    when: "Good for from, bill-to, line items, and totals.",
    not: "A generic table is Table.",
  },
  "graph-compare": {
    when: "Good for a feature matrix with checks and dashes.",
    not: "Numeric ranks are Rank.",
  },
  "graph-stat": {
    when: "Good for two to four large numbers, with no sparkline.",
    not: "One number with a trend is KPI. A live clock is Timer.",
  },
  "graph-spec": {
    when: "Good for aligned label and value rows, like a spec sheet.",
    not: "Large headline numbers are Stat. A table with headers is Table.",
  },
  "graph-activity": {
    when: "Good for daily counts over months, like a contribution grid.",
    not: "One month of marks is Calendar. Up or down days is Uptime.",
  },
  "graph-heatmap": {
    when: "Good for a labeled grid of intensities.",
    not: "A contribution calendar is Activity.",
  },
  "graph-calendar": {
    when: "Good for one month with a few days marked.",
    not: "A year of activity is Activity.",
  },
  "graph-waterfall": {
    when: "Good for a running total as floating bars.",
    not: "Parts of a whole is Stack.",
  },
  "graph-uptime": {
    when: "Good for a status per day: ok, degraded, down, or empty.",
    not: "A heatmap or an activity grid.",
  },
  "graph-slope": {
    when: "Good for a before and after number on each row.",
    not: "Two bar groups is Bars. A ranked list is Rank.",
  },
  "graph-bullet": {
    when: "Good when a number has a goal sitting on the same track.",
    not: "A single fill from 0 to 1 is Meter.",
  },
  "graph-timer": {
    when: "Good for uptime, last deploy, or a clock in the corner.",
    not: "Time left until a date is Countdown. A static number is Stat.",
  },
  "graph-countdown": {
    when: "Good for a freeze, a launch, or a window that closes.",
    not: "Elapsed time since a start is Timer.",
  },
  "graph-frame": {
    when: "Good when you're putting together a custom figure.",
    not: "If the chart already exists, install that one instead.",
  },
}

export function chooserMarkdown(
  items: Pick<ComponentDoc, "slug" | "name" | "description">[],
  origin = SITE_URL
) {
  const host = origin || SITE_URL
  const rows = items
    .filter((item) => item.slug !== "graph-frame")
    .map((item) => {
      const row = CHOOSER[item.slug]
      const when = row?.when ?? item.description
      const not = row?.not ?? "—"
      return `| ${item.name} | ${item.slug} | ${when} | ${not} |`
    })

  return `# markdown graphs

ASCII-framed React diagrams for MDX. Source is copied via shadcn registry, not npm.
${host}

## Rules

- Geist Mono. Dashed frame, + corners, title as [ TITLE ].
- Charts are made of characters (█ ░ - = + ├ └). Borders are dashes. Do not use SVG, Recharts, or canvas.
- One accent: --graph-accent. palette="duo" | "multi" is opt-in.
- Motion is opacity and transform, ~220ms, no loops, no pulsing.
- Copy the example props exactly. Do not invent extra hues or chart libraries.

## Install

pnpm dlx shadcn@latest add ${host}/r/<slug>.json

Files land under @/registry/default.

## Chooser

| Component | Slug | Use for | Not for |
| --- | --- | --- | --- |
${rows.join("\n")}
`
}
