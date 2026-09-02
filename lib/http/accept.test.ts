import { describe, expect, it } from "vitest"

import {
  PAGE_TYPES,
  appendVaryAccept,
  isShadcnAccept,
  preferredType,
} from "@/lib/http/accept"

describe("preferredType", () => {
  it("defaults to html when Accept is missing", () => {
    expect(preferredType(null, PAGE_TYPES)).toBe("text/html")
  })

  it("picks markdown when it is first", () => {
    expect(preferredType("text/markdown, text/html", PAGE_TYPES)).toBe(
      "text/markdown"
    )
  })

  it("picks html for a browser Accept", () => {
    expect(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        PAGE_TYPES
      )
    ).toBe("text/html")
  })

  it("honors q=0 rejection of html", () => {
    expect(preferredType("text/html;q=0, */*;q=1", PAGE_TYPES)).toBe(
      "text/markdown"
    )
  })

  it("returns null when nothing matches", () => {
    expect(preferredType("application/pdf", PAGE_TYPES)).toBeNull()
  })
})

describe("isShadcnAccept", () => {
  it("detects the registry vendor type", () => {
    expect(isShadcnAccept("application/vnd.shadcn.v1+json")).toBe(true)
    expect(isShadcnAccept("text/html")).toBe(false)
  })
})

describe("appendVaryAccept", () => {
  it("adds Accept when Vary is missing", () => {
    const headers = new Headers()
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept")
  })

  it("appends Accept to an existing Vary", () => {
    const headers = new Headers({ Vary: "RSC" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("RSC, Accept")
  })

  it("does not duplicate Accept", () => {
    const headers = new Headers({ Vary: "Accept, RSC" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept, RSC")
  })
})
