import Link from "next/link"

import { GraphCompare, GraphInvoice, GraphStat } from "@/components/graphs"
import { SiteContainer } from "@/components/site/container"
import { Hero } from "@/components/site/hero"
import { Principles } from "@/components/site/principles"

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <section className="py-12 sm:py-16">
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
              Every graph uses the same frame
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Invoices, comparisons, and large figures included. Install one
              component or pull in the whole set.
            </p>
          </div>
          <GraphInvoice
            from={{
              name: "markdown graphs",
              lines: ["kshv.me"],
            }}
            items={[
              {
                description: "Design system",
                qty: "1",
                rate: "4,200",
                amount: "4,200",
              },
              {
                description: "Motion pass",
                qty: "1",
                rate: "1,800",
                amount: "1,800",
              },
              {
                description: "Docs rewrite",
                qty: "8h",
                rate: "180",
                amount: "1,440",
              },
            ]}
            meta={[
              { label: "No.", value: "0041" },
              { label: "Issued", value: "Mar 12" },
              { label: "Due", value: "Apr 11" },
            ]}
            note="Net 30. Wire to the account on file."
            title="INVOICE 0041"
            to={{
              name: "Acme Studio",
              lines: ["14 Market Street"],
            }}
            totals={[
              { label: "Subtotal", value: "7,440" },
              { label: "Amount due", value: "7,440", accent: true },
            ]}
          />
          <p>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs/graph-invoice"
            >
              Open invoice docs
            </Link>
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <GraphStat
              items={[
                { value: "12,400", label: "docs" },
                { value: "860", label: "shipped", accent: true },
              ]}
              title="THIS WEEK"
            />
            <GraphCompare
              accent="This"
              columns={["Mermaid", "This"]}
              rows={[
                { label: "Source", values: [".md", ".tsx"] },
                { label: "In git", values: [true, true] },
                { label: "Themable", values: [false, true] },
              ]}
              title="RENDER"
            />
          </div>
          <p>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs"
            >
              All components
            </Link>
          </p>
        </SiteContainer>
      </section>
      <Principles />
    </main>
  )
}
