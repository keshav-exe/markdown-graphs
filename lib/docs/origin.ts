import { useSyncExternalStore } from "react"

function subscribe() {
  return () => {}
}

function getOrigin() {
  return window.location.origin
}

function getServerOrigin() {
  return ""
}

function useOrigin() {
  return useSyncExternalStore(subscribe, getOrigin, getServerOrigin)
}

export { useOrigin }
