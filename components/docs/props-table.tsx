import { Fragment } from "react"

import type { PropRow } from "@/lib/docs/catalog"
import { cn } from "@/lib/utils"

const headers = ["Prop", "Type", "Default", "Description"] as const

function RuleY() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
    />
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Props</h2>
      <div className="-mx-4 graph-scroll-x sm:-mx-6 lg:-mx-8">
        <div className="min-w-full px-4 sm:px-6 lg:px-8">
          <table className="w-full min-w-lg border-separate border-spacing-0 font-mono text-sm">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "relative px-3 pb-3 text-left font-normal whitespace-nowrap text-foreground",
                      index === 3 && "min-w-[20ch]"
                    )}
                  >
                    {index > 0 ? <RuleY /> : null}
                    {header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={4} className="p-0">
                  <div aria-hidden="true" className="graph-rule w-full" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <Fragment key={row.name}>
                  <tr>
                    <td className="px-3 py-3 align-baseline whitespace-nowrap text-foreground">
                      {row.name}
                    </td>
                    <td className="relative px-3 py-3 align-baseline text-pretty whitespace-normal text-muted-foreground">
                      <RuleY />
                      {row.type}
                    </td>
                    <td className="relative px-3 py-3 align-baseline whitespace-nowrap text-muted-foreground tabular-nums">
                      <RuleY />
                      {row.default ?? "—"}
                    </td>
                    <td className="relative max-w-[36ch] px-3 py-3 align-baseline font-sans text-pretty whitespace-normal text-muted-foreground">
                      <RuleY />
                      {row.description}
                    </td>
                  </tr>
                  {rowIndex < rows.length - 1 ? (
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div aria-hidden="true" className="graph-rule w-full" />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export { PropsTable }
