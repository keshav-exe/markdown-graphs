import { describe, expect, it } from "vitest"

import {
  apiNotFound,
  jsonOk,
  methodNotAllowed,
  rateLimited,
} from "@/lib/http/api"

describe("jsonOk", () => {
  it("returns rate limit headers", async () => {
    const response = jsonOk({ ok: true })
    expect(response.headers.get("RateLimit-Limit")).toBe("1000")
    expect(response.headers.get("RateLimit-Remaining")).toBeTruthy()
    expect(response.headers.get("RateLimit-Policy")).toContain("1000")
    const json = (await response.json()) as { ok: boolean }
    expect(json.ok).toBe(true)
  })
})

describe("apiNotFound", () => {
  it("returns problem+json", async () => {
    const response = apiNotFound("/api/v1/components/nope")
    expect(response.status).toBe(404)
    expect(response.headers.get("Content-Type")).toMatch(
      "application/problem+json"
    )
    expect(response.headers.get("RateLimit-Limit")).toBe("1000")
    const json = (await response.json()) as { code: string }
    expect(json.code).toBe("not_found")
  })
})

describe("methodNotAllowed", () => {
  it("returns 405 problem+json", async () => {
    const response = methodNotAllowed("/api/v1/components")
    expect(response.status).toBe(405)
    expect(response.headers.get("Allow")).toBe("GET")
  })
})

describe("rateLimited", () => {
  it("returns 429 with Retry-After", async () => {
    const response = rateLimited("/api/v1/components")
    expect(response.status).toBe(429)
    expect(response.headers.get("Retry-After")).toBe("60")
    expect(response.headers.get("RateLimit-Remaining")).toBe("0")
  })
})
