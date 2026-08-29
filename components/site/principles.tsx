import { SiteContainer } from "@/components/site/container"

const principles = [
  {
    title: "Characters, not SVG",
    body: "Borders are dashes and plus signs. Bars and cells are glyphs. To animate, change a color or swap a character.",
  },
  {
    title: "One accent color",
    body: 'Default is one highlight. Everything else stays muted. Pass palette="duo" or "multi" when a second or third hue earns its keep.',
  },
  {
    title: "Quick entrance animations",
    body: "Bars grow in, cells fill, rows appear when the component mounts. Nothing loops. Animations stay under 220ms.",
  },
]

function Principles() {
  return (
    <section>
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
