/** Strip leading ESM imports so the example is pasteable in MDX. */
export function reactToMdx(source: string) {
  return source
    .replace(/^(?:import[\s\S]*?from\s+["'][^"']+["']\s*\n+)+/, "")
    .trim()
}
