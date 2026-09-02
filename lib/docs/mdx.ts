export function reactToMdx(source: string) {
  return source
    .replace(/^(?:import[\s\S]*?from\s+["'][^"']+["']\s*\n+)+/, "")
    .trim()
}
