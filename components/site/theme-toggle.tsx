"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { HeaderButton } from "@/components/site/header-button"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dark = !mounted || resolvedTheme === "dark"

  return (
    <HeaderButton
      label={dark ? "Switch to light" : "Switch to dark"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <HugeiconsIcon
        className="size-5 shrink-0 sm:size-4"
        icon={dark ? Sun03Icon : Moon02Icon}
        size={20}
        strokeWidth={1.5}
      />
    </HeaderButton>
  )
}

export { ThemeToggle }
