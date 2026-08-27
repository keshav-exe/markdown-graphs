export const GITHUB_REPO = "keshav-exe/markdown-graphs"

export const registryFiles: Record<string, string[]> = {
  "graph-frame": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-frame/graph-arrow.tsx",
  ],
  "graph-table": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-table/graph-table.tsx",
  ],
  "graph-flow": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-frame/graph-arrow.tsx",
    "registry/default/graph-flow/graph-flow.tsx",
  ],
  "graph-bars": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-frame/graph-arrow.tsx",
    "registry/default/graph-bars/graph-bars.tsx",
  ],
  "graph-cells": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-cells/graph-cells.tsx",
  ],
  "graph-meter": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-meter/graph-meter.tsx",
  ],
  "graph-spark": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-spark/graph-spark.tsx",
  ],
  "graph-tree": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-tree/graph-tree.tsx",
  ],
  "graph-timeline": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-timeline/graph-timeline.tsx",
  ],
  "graph-stack": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-stack/graph-stack.tsx",
  ],
  "graph-funnel": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-funnel/graph-funnel.tsx",
  ],
  "graph-gantt": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-gantt/graph-gantt.tsx",
  ],
  "graph-diff": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-diff/graph-diff.tsx",
  ],
  "graph-plot": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-plot/graph-plot.tsx",
  ],
  "graph-waffle": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-waffle/graph-waffle.tsx",
  ],
  "graph-invoice": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-invoice/graph-invoice.tsx",
  ],
  "graph-compare": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-compare/graph-compare.tsx",
  ],
  "graph-stat": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-stat/graph-stat.tsx",
  ],
  "graph-spec": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-spec/graph-spec.tsx",
  ],
  "graph-activity": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-activity/graph-activity.tsx",
  ],
  "graph-heatmap": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-heatmap/graph-heatmap.tsx",
  ],
  "graph-calendar": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-calendar/graph-calendar.tsx",
  ],
  "graph-waterfall": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-waterfall/graph-waterfall.tsx",
  ],
  "graph-uptime": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-uptime/graph-uptime.tsx",
  ],
  "graph-slope": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-slope/graph-slope.tsx",
  ],
  "graph-bullet": [
    "registry/default/graph-frame/graph-frame.tsx",
    "registry/default/graph-frame/graph-motion.ts",
    "registry/default/graph-bullet/graph-bullet.tsx",
  ],
  all: ["registry/default"],
}

export const graphUtilitiesCss = `@theme inline {
  --color-graph-accent: var(--graph-accent);
  --color-graph-frame: var(--graph-frame);
  --color-graph-muted: var(--graph-muted);
  --color-graph-faint: var(--graph-faint);
  --color-contrast-14: var(--contrast-14);
  --color-contrast-23: var(--contrast-23);
  --color-contrast-45: var(--contrast-45);
  --color-contrast-70: var(--contrast-70);
}

@utility graph-frame {
  background-image:
    repeating-linear-gradient(
      to right,
      var(--graph-frame) 0 2px,
      transparent 2px 7px
    ),
    repeating-linear-gradient(
      to bottom,
      var(--graph-frame) 0 2px,
      transparent 2px 7px
    ),
    repeating-linear-gradient(
      to right,
      var(--graph-frame) 0 2px,
      transparent 2px 7px
    ),
    repeating-linear-gradient(
      to bottom,
      var(--graph-frame) 0 2px,
      transparent 2px 7px
    );
  background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
  background-position: 0 0, 100% 0, 0 100%, 0 0;
  background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%;
}

@utility graph-rule {
  height: 1px;
  background-image: repeating-linear-gradient(
    to right,
    var(--graph-frame) 0 2px,
    transparent 2px 7px
  );
}`
