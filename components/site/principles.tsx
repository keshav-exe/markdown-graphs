import { SiteContainer } from "@/components/site/container"

const principles = [
  {
    title: "Typed, not drawn",
    body: "Borders are dashes and pluses. Content is characters. You animate by changing a color or swapping a glyph.",
  },
  {
    title: "One accent",
    body: "Pick a color. Everything else recedes. Hierarchy is subtraction, not decoration.",
  },
  {
    title: "Motion as information",
    body: "Bars grow. Cells fill. Rows arrive. Nothing loops. Nothing takes longer than 220ms.",
  },
]

function Principles() {
  return (
    <section className="py-12 sm:py-16">
      <SiteContainer className="flex flex-col gap-10">
        <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
          How they work
        </h2>
        <dl className="grid gap-8 lg:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <dt className="font-medium text-foreground">{item.title}</dt>
              <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </SiteContainer>
    </section>
  )
}

export { Principles }
