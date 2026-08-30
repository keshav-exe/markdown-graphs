"use client"

import { SITE_EMAIL } from "@/lib/site"
import { showToast } from "@/lib/toast"

function CopyEmail() {
  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE_EMAIL)
      showToast("Copied", SITE_EMAIL)
    } catch {
      showToast("Copy failed", SITE_EMAIL)
    }
  }

  return (
    <button
      aria-label={`Copy ${SITE_EMAIL}`}
      className="underline-offset-4 hover:underline"
      onClick={() => {
        void copy()
      }}
      type="button"
    >
      {SITE_EMAIL}
    </button>
  )
}

export { CopyEmail }
