export type NavLink = {
  href: string
  label: string
}

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
}

export type ComponentDoc = {
  slug: string
  title: string
  name: string
  description: string
  registry: string
  dependencies: string[]
  props: PropRow[]
}

export const getStarted: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
]

export const components: ComponentDoc[] = [
  {
    slug: "graph-table",
    title: "Table",
    name: "GraphTable",
    description:
      "A framed data table with optional footer totals. Rows can be numbers or copy.",
    registry: "graph-table",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "headers",
        type: "string[]",
        description: "Column headings. Sentence case.",
      },
      {
        name: "rows",
        type: "ReactNode[][]",
        description: "Body cells, one array per row.",
      },
      {
        name: "footer",
        type: "ReactNode[]",
        description: "Optional totals row under a rule.",
      },
      {
        name: "align",
        type: '("left" | "right")[]',
        default: "left, then right",
        description:
          "Per-column alignment. Defaults to left on the first column.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-flow",
    title: "Flow",
    name: "GraphFlow",
    description:
      "A typed process diagram. Nodes sit on a dashed arrow. Accent a node to mark the optimistic path.",
    registry: "graph-flow",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "FlowRow[]",
        description: "Each row is a sequence of nodes.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-bars",
    title: "Bars",
    name: "GraphBars",
    description:
      "Before and after as two bar groups with a processor in the middle. The right group is the amplified version.",
    registry: "graph-bars",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "from",
        type: "BarSeries",
        description: "Left series. values is an array of relative heights.",
      },
      {
        name: "to",
        type: "BarSeries",
        description: "Right series. Set size to lg for the amplified group.",
      },
      {
        name: "processor",
        type: "string",
        default: '"AI"',
        description: "Label between the two groups.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-cells",
    title: "Cells",
    name: "GraphCells",
    description:
      "Filled and empty cells in a grid. Use it to compare density, coverage, or two ways of learning.",
    registry: "graph-cells",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "CellGrid[]",
        description: "Each item is a labeled 0/1 matrix.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-scale",
    title: "Scale",
    name: "GraphScale",
    description:
      "A labeled scale. Contrast ratios, type sizes, whatever needs a number and a sentence.",
    registry: "graph-scale",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "ScaleItem[]",
        description: "ratio, label, token, and optional accent.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-radii",
    title: "Radii",
    name: "GraphRadii",
    description:
      "Nested radii. Inner equals outer minus inset. The corners are the diagram.",
    registry: "graph-radii",
    dependencies: [],
    props: [
      {
        name: "title",
        type: "string",
        default: '"NESTED RADII"',
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "outer",
        type: "number",
        default: "16",
        description: "Outer corner radius in pixels.",
      },
      {
        name: "inset",
        type: "number",
        default: "4",
        description: "Padding between the two frames.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-meter",
    title: "Meter",
    name: "GraphMeter",
    description:
      "A percentage drawn with characters. Equals fill, dashes remain.",
    registry: "graph-meter",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "number",
        description: "0 to 1.",
      },
      {
        name: "ticks",
        type: "number",
        default: "14",
        description: "Number of character slots.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the meter.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-spark",
    title: "Spark",
    name: "GraphSpark",
    description:
      "A sparkline made of block glyphs. Animation is swapping a character.",
    registry: "graph-spark",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "data",
        type: "number[]",
        description: "Relative values. Scaled to the max.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the sparkline.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-frame",
    title: "Frame",
    name: "Graph",
    description:
      "The dashed ASCII frame every graph sits in. Compose with GraphTitle, GraphBody, GraphRule, and GraphArrow.",
    registry: "graph-frame",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Optional caption. Renders as [ TITLE ] on the top edge.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the figure.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Usually GraphBody.",
      },
    ],
  },
]

export function getComponent(slug: string) {
  return components.find((item) => item.slug === slug)
}
