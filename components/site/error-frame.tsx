"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import { SiteContainer } from "@/components/site/container"

function ErrorFrame({
  code,
  title,
  body,
  hint,
  action,
}: {
  code: string
  title: string
  body: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <main className="flex flex-1 items-center py-16 sm:py-24" id="main">
      <SiteContainer className="flex justify-center">
        <Graph className="w-full max-w-md" title={code}>
          <GraphBody className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-foreground">{title}</p>
              <p className="max-w-[40ch] text-pretty text-graph-muted">
                {body}
              </p>
              {hint ? (
                <p className="font-mono text-graph-frame tabular-nums">
                  {hint}
                </p>
              ) : null}
            </div>
            {action ? (
              <div className="flex flex-wrap items-center gap-3">{action}</div>
            ) : null}
          </GraphBody>
        </Graph>
      </SiteContainer>
    </main>
  )
}

function DocsLink() {
  return (
    <Button nativeButton={false} render={<Link href="/docs" />}>
      Docs
    </Button>
  )
}

function HomeLink() {
  return (
    <Button nativeButton={false} render={<Link href="/" />} variant="outline">
      Home
    </Button>
  )
}

export { DocsLink, ErrorFrame, HomeLink }
