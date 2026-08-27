import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Examples, examplesBySlug } from "@/components/docs/examples"
import { InstallCommand } from "@/components/docs/install"
import { PropsTable } from "@/components/docs/props-table"
import { components, getComponent } from "@/lib/docs/catalog"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return components.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    return {}
  }

  return {
    title: item.title,
    description: item.description,
  }
}

export default async function ComponentDocPage({ params }: PageProps) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    notFound()
  }

  const examples = examplesBySlug[slug] ?? []

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {item.title}
        </h1>
        <p className="font-mono text-graph-muted">{item.name}</p>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          {item.description}
        </p>
      </div>

      <InstallCommand name={item.registry} />

      {examples.length > 0 ? <Examples items={examples} /> : null}

      <PropsTable rows={item.props} />
    </div>
  )
}
