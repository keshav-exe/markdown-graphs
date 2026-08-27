import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CopyPage } from "@/components/docs/copy-page"
import { Examples, examplesBySlug } from "@/components/docs/examples"
import { InstallCommand } from "@/components/docs/install"
import { PropsTable } from "@/components/docs/props-table"
import { JsonLd } from "@/components/seo/json-ld"
import { components, getComponent } from "@/lib/docs/catalog"
import { componentJsonLd, pageMeta } from "@/lib/seo"

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

  return pageMeta({
    title: item.title,
    description: item.description,
    path: `/docs/${slug}`,
  })
}

export default async function ComponentDocPage({ params }: PageProps) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    notFound()
  }

  const examples = examplesBySlug[slug] ?? []
  const exampleNotes = examples.map(({ title, description, code }) => ({
    title,
    description,
    code,
  }))

  return (
    <div className="flex flex-col gap-12">
      <JsonLd data={componentJsonLd(item)} />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {item.title}
          </h1>
          <CopyPage
            description={item.description}
            doc={item}
            examples={exampleNotes}
            kicker={item.name}
            title={item.title}
          />
        </div>
        <p className="font-mono text-graph-muted">{item.name}</p>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          {item.description}
        </p>
      </div>

      <InstallCommand
        doc={item}
        example={examples[0]?.code}
        name={item.registry}
      />

      {examples.length > 0 ? <Examples items={examples} /> : null}

      <PropsTable rows={item.props} />
    </div>
  )
}
