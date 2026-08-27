import type { ReactNode } from "react"

import {
  GraphBars,
  GraphCells,
  GraphFlow,
  GraphMeter,
  GraphRadii,
  GraphScale,
  GraphSpark,
  GraphTable,
} from "@/components/graphs"
import { SiteContainer } from "@/components/site/container"

function Exhibit({
  name,
  component,
  children,
}: {
  name: string
  component: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 text-muted-foreground">
        <p className="min-w-0 truncate">{name}</p>
        <p className="shrink-0">{component}</p>
      </div>
      {children}
    </div>
  )
}

function Gallery() {
  return (
    <section className="py-12 sm:py-16" id="library">
      <SiteContainer className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
            The library
          </h2>
          <p className="max-w-[48ch] text-pretty text-muted-foreground">
            Drop these into MDX. Same frame, same accent, same rules.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <Exhibit component="GraphTable" name="What the research cost">
            <GraphTable
              align={["left", "right", "right", "right"]}
              footer={["Total", "437,141", "396", "~50m"]}
              headers={["Agent", "Tokens", "Tool calls", "Time"]}
              rows={[
                ["Inks and paper", "115,207", "120", "16m"],
                ["Overprint and drift", "135,218", "164", "16m"],
                ["Naming the patterns", "186,716", "112", "18m"],
              ]}
              title="WHAT THE RESEARCH COST"
            />
          </Exhibit>

          <Exhibit component="GraphTable" name="Taste, explained">
            <GraphTable
              align={["left", "left"]}
              headers={["Decision", "Reason"]}
              rows={[
                ["ease-out on enter", "feels snappier"],
                ["180ms, not 400ms", "feels faster, more responsive"],
                ["springs for gestures", "they carry your momentum"],
                ["scale 0.97 on press", "it makes the UI feel alive"],
                ["no animation at all", "you open it hundreds of times"],
              ]}
              title="TASTE, EXPLAINED"
            />
          </Exhibit>

          <Exhibit component="GraphFlow" name="Optimistic UI">
            <GraphFlow
              rows={[
                {
                  nodes: [
                    { label: "tap" },
                    { label: "server" },
                    { label: "update" },
                  ],
                },
                {
                  nodes: [
                    { label: "tap" },
                    { label: "update", tone: "accent" },
                    { label: "server syncs", stretch: true, tone: "muted" },
                  ],
                },
              ]}
              title="OPTIMISTIC UI"
            />
          </Exhibit>

          <Exhibit component="GraphBars" name="AI is an amplifier">
            <GraphBars
              from={{ label: "your taste", values: [2, 4, 3, 5, 2] }}
              title="AI IS AN AMPLIFIER"
              to={{ label: "amplified", size: "lg", values: [2, 4, 3, 5, 2] }}
            />
          </Exhibit>

          <div className="grid gap-8 lg:grid-cols-2">
            <Exhibit component="GraphCells" name="Two ways to learn">
              <GraphCells
                items={[
                  {
                    label: "fragments",
                    cells: [
                      [1, 0, 1, 0, 0],
                      [0, 1, 0, 1, 0],
                      [1, 0, 0, 0, 1],
                    ],
                  },
                  {
                    label: "animations.dev",
                    cells: [
                      [1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1],
                    ],
                  },
                ]}
                title="TWO WAYS TO LEARN"
              />
            </Exhibit>

            <Exhibit component="GraphScale" name="Contrast">
              <GraphScale
                items={[
                  {
                    ratio: "1.4:1",
                    label: "you can't read this",
                    token: "14",
                  },
                  {
                    ratio: "2.3:1",
                    label: "you strain to read this",
                    token: "23",
                  },
                  {
                    ratio: "4.5:1",
                    label: "you can read this",
                    token: "45",
                    accent: true,
                  },
                  {
                    ratio: "7:1",
                    label: "you can read this too",
                    token: "70",
                    accent: true,
                  },
                ]}
                title="CONTRAST"
              />
            </Exhibit>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Exhibit component="GraphRadii" name="Nested radii">
              <GraphRadii />
            </Exhibit>

            <div className="flex flex-col gap-8">
              <Exhibit component="GraphMeter" name="Shipped">
                <GraphMeter
                  caption="characters, not a progress bar"
                  title="SHIPPED"
                  value={0.67}
                />
              </Exhibit>
              <Exhibit component="GraphSpark" name="Latency">
                <GraphSpark
                  caption="swap a glyph, that's the animation"
                  data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
                  title="LATENCY"
                />
              </Exhibit>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}

export { Gallery }
