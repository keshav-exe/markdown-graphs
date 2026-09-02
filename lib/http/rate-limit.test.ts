import { describe, expect, it } from "vitest"

import { RATE_LIMIT, rateLimitHeaders } from "@/lib/http/rate-limit"

describe("rateLimitHeaders", () => {
  it("returns RFC rate limit headers", () => {
    const headers = rateLimitHeaders(42)
    expect(headers["RateLimit-Limit"]).toBe(String(RATE_LIMIT.limit))
    expect(headers["RateLimit-Remaining"]).toBe("42")
    expect(headers["RateLimit-Reset"]).toBe(String(RATE_LIMIT.windowSeconds))
    expect(headers["RateLimit-Policy"]).toBe(
      `${RATE_LIMIT.limit};w=${RATE_LIMIT.windowSeconds}`
    )
  })
})
