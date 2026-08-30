"use client"

import { Graph, GraphBody } from "@/components/graphs"
import { sponsorPlans, usd } from "@/lib/sponsors"

function SponsorSlots() {
  return (
    <Graph title="SLOTS">
      <GraphBody className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3" role="list">
          {sponsorPlans.map((plan) => (
            <li
              className="flex min-w-0 items-baseline justify-between gap-4"
              key={plan.cells}
            >
              <p className="min-w-0">
                {plan.cells === 1 ? "1 cell" : `${plan.cells} cells`}
              </p>
              <div className="flex shrink-0 items-baseline gap-3 tabular-nums">
                <p className="text-graph-accent">{usd(plan.month)}</p>
                <p className="text-graph-muted">{usd(plan.year)} / yr</p>
              </div>
            </li>
          ))}
        </ul>
      </GraphBody>
    </Graph>
  )
}

export { SponsorSlots }
