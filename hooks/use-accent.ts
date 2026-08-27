"use client"

import { useSyncExternalStore } from "react"

import {
  ACCENT_EVENT,
  DEFAULT_ACCENT_ID,
  getAccent,
  isAccentId,
} from "@/lib/accent"

function subscribe(onStoreChange: () => void) {
  window.addEventListener(ACCENT_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)

  return () => {
    window.removeEventListener(ACCENT_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getSnapshot() {
  const id = document.documentElement.getAttribute("data-accent")
  return isAccentId(id) ? id : DEFAULT_ACCENT_ID
}

function getServerSnapshot() {
  return DEFAULT_ACCENT_ID
}

function useAccent() {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return getAccent(id)
}

export { useAccent }
