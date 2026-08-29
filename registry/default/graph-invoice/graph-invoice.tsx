"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  Graph,
  GraphBody,
  GraphRule,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type InvoiceParty = {
  name: string
  lines?: string[]
}

type InvoiceMeta = {
  label: string
  value: string
}

type InvoiceItem = {
  description: string
  qty?: string
  rate?: string
  amount: string
}

type InvoiceTotal = {
  label: string
  value: string
  accent?: boolean
}

type GraphInvoiceProps = {
  title: string
  from?: InvoiceParty
  to?: InvoiceParty
  meta?: InvoiceMeta[]
  items: InvoiceItem[]
  totals?: InvoiceTotal[]
  note?: string
  corner?: string
  className?: string
}

function Party({ label, party }: { label: string; party: InvoiceParty }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono tracking-wide text-graph-muted uppercase">
        {label}
      </p>
      <p className="text-foreground">{party.name}</p>
      {party.lines?.map((line) => (
        <p className="text-graph-muted" key={line}>
          {line}
        </p>
      ))}
    </div>
  )
}

function GraphInvoice({
  title,
  from,
  to,
  meta,
  items,
  totals,
  note,
  corner,
  className,
}: GraphInvoiceProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.04)
  const showQty = items.some((row) => row.qty != null)
  const showRate = items.some((row) => row.rate != null)
  const columns = 1 + Number(showQty) + Number(showRate) + 1

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-8">
        {from || to ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {from ? <Party label="From" party={from} /> : null}
            {to ? <Party label="Bill to" party={to} /> : null}
          </div>
        ) : null}

        {meta && meta.length > 0 ? (
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {meta.map((entry) => (
              <div className="flex flex-col gap-1" key={entry.label}>
                <dt className="font-mono tracking-wide text-graph-muted uppercase">
                  {entry.label}
                </dt>
                <dd className="text-foreground tabular-nums">{entry.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="@container graph-scroll-x">
          <table className="w-full min-w-lg border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-0 pb-3 text-left font-normal text-graph-muted">
                  Description
                </th>
                {showQty ? (
                  <th className="px-3 pb-3 text-right font-normal text-graph-muted">
                    Qty
                  </th>
                ) : null}
                {showRate ? (
                  <th className="px-3 pb-3 text-right font-normal text-graph-muted">
                    Rate
                  </th>
                ) : null}
                <th className="px-0 pb-3 text-right font-normal text-graph-muted">
                  Amount
                </th>
              </tr>
              <tr>
                <th colSpan={columns} className="p-0">
                  <GraphRule />
                </th>
              </tr>
            </thead>
            <motion.tbody
              initial={reduce ? false : "hidden"}
              variants={list}
              viewport={{ once: true, amount: 0.4 }}
              whileInView="show"
            >
              {items.map((row) => (
                <motion.tr key={row.description} variants={item}>
                  <td className="px-0 py-2.5 text-left">{row.description}</td>
                  {showQty ? (
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      {row.qty ?? ""}
                    </td>
                  ) : null}
                  {showRate ? (
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      {row.rate ?? ""}
                    </td>
                  ) : null}
                  <td className="px-0 py-2.5 text-right tabular-nums">
                    {row.amount}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {totals && totals.length > 0 ? (
          <div className="flex flex-col gap-3">
            <GraphRule />
            <motion.dl
              className="ml-auto flex w-full max-w-[22rem] flex-col gap-2"
              initial={reduce ? false : "hidden"}
              variants={list}
              viewport={{ once: true }}
              whileInView="show"
            >
              {totals.map((entry) => (
                <motion.div
                  className="grid grid-cols-[minmax(0,1fr)_8rem] items-baseline gap-x-4"
                  key={entry.label}
                  variants={item}
                >
                  <dt
                    className={cn(
                      entry.accent ? "text-foreground" : "text-graph-muted"
                    )}
                  >
                    {entry.label}
                  </dt>
                  <dd
                    className={cn(
                      "text-right tabular-nums",
                      entry.accent ? "text-graph-accent" : "text-foreground"
                    )}
                  >
                    {entry.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        ) : null}

        {note ? (
          <p className="max-w-[48ch] text-pretty text-graph-muted">{note}</p>
        ) : null}
      </GraphBody>
    </Graph>
  )
}

export { GraphInvoice }
export type {
  GraphInvoiceProps,
  InvoiceItem,
  InvoiceMeta,
  InvoiceParty,
  InvoiceTotal,
}
