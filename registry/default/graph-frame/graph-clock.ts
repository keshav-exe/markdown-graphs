"use client"

import { useEffect, useState } from "react"

export function parseInstant(value: Date | number | string) {
  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : Number.NaN
  }

  return Date.parse(value)
}

export function pad2(value: number) {
  return String(Math.trunc(value)).padStart(2, "0")
}

export function formatHms(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const clock = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`

  if (days > 0) {
    return `${days}d ${clock}`
  }

  return clock
}

export function formatAgo(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000))

  if (seconds < 60) {
    return `${seconds}s ago`
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 48) {
    return `${hours}h ago`
  }

  return `${Math.floor(hours / 24)}d ago`
}

export function formatClock(ms: number) {
  const date = new Date(ms)

  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`
}

export function useGraphNow(interval = 1000) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), interval)
    return () => window.clearInterval(id)
  }, [interval])

  return now
}
