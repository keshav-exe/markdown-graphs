import type { Transition, Variants } from "motion/react"

export const easeOutCubic = [0.215, 0.61, 0.355, 1] as const

export function graphTransition(
  reduce: boolean | null,
  extras?: Transition
): Transition {
  if (reduce) {
    return { duration: 0 }
  }

  return {
    duration: 0.22,
    ease: easeOutCubic,
    ...extras,
  }
}

export function fadeUp(reduce: boolean | null): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 1, transform: "translateY(0px)" },
      show: { opacity: 1, transform: "translateY(0px)" },
    }
  }

  return {
    hidden: { opacity: 0, transform: "translateY(8px)" },
    show: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: graphTransition(false),
    },
  }
}

export function staggerList(reduce: boolean | null, stagger = 0.04): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce ? { duration: 0 } : { staggerChildren: stagger },
    },
  }
}
