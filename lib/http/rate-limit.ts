export const RATE_LIMIT = {
  limit: 1000,
  windowSeconds: 3600,
} as const

export function rateLimitHeaders(remaining = RATE_LIMIT.limit - 1) {
  const reset = RATE_LIMIT.windowSeconds

  return {
    "RateLimit-Policy": `${RATE_LIMIT.limit};w=${RATE_LIMIT.windowSeconds}`,
    "RateLimit-Limit": String(RATE_LIMIT.limit),
    "RateLimit-Remaining": String(Math.max(0, remaining)),
    "RateLimit-Reset": String(reset),
  }
}

export function rateLimitExceeded(retryAfter = 60) {
  return {
    ...rateLimitHeaders(0),
    "Retry-After": String(retryAfter),
  }
}
