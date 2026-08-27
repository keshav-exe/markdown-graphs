import Image from "next/image"

import { cn } from "@/lib/utils"

function LogoMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        alt=""
        className={cn("size-6 shrink-0 dark:hidden", className)}
        height={24}
        src="https://assets.ui.sh/marks/1.svg?color=000000"
        unoptimized
        width={24}
      />
      <Image
        alt=""
        className={cn("hidden size-6 shrink-0 dark:block", className)}
        height={24}
        src="https://assets.ui.sh/marks/1.svg?color=000000"
        unoptimized
        width={24}
      />
    </>
  )
}

export { LogoMark }
