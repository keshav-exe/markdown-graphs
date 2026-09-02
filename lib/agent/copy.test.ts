import { describe, expect, it } from "vitest"

import {
  ABOUT_PARAS,
  CONTACT_PARAS,
  HOME_READ,
  HOME_WHAT,
  HOME_WRITE,
  PRIVACY_PARAS,
  copyLength,
  homeMarkdown,
} from "@/lib/agent/copy"

describe("trust copy length", () => {
  it("keeps about, contact, and privacy over 500 characters", () => {
    expect(copyLength(ABOUT_PARAS)).toBeGreaterThanOrEqual(500)
    expect(copyLength(CONTACT_PARAS)).toBeGreaterThanOrEqual(500)
    expect(copyLength(PRIVACY_PARAS)).toBeGreaterThanOrEqual(500)
  })
})

describe("homepage copy", () => {
  it("has at least 500 characters of prose", () => {
    const text = [HOME_WHAT, HOME_WRITE, HOME_READ].join(" ")
    expect(text.length).toBeGreaterThanOrEqual(500)
  })

  it("includes when-to-use jobs in the markdown twin", () => {
    const md = homeMarkdown()
    expect(md).toContain("# Markdown Graphs")
    expect(md).toContain("## Write")
    expect(md).toContain("## Read")
    expect(md).toContain("/llms.txt")
    expect(md).toContain("/openapi.json")
  })
})
