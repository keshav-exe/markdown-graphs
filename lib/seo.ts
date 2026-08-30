import type { Metadata } from "next"

import { components, type ComponentDoc } from "@/lib/docs/catalog"
import { GITHUB_URL } from "@/lib/github"
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_URL,
} from "@/lib/site"

export function pageMeta({
  title,
  description,
  path,
}: {
  title?: string
  description: string
  path: string
}): Metadata {
  const ogTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "website",
    },
  }
}

const author = {
  "@type": "Person" as const,
  name: SITE_AUTHOR.name,
  url: SITE_AUTHOR.url,
  sameAs: [SITE_AUTHOR.x, GITHUB_URL],
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME_SHORT,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: author,
      },
      {
        "@type": "SoftwareSourceCode",
        name: SITE_NAME_SHORT,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        codeRepository: GITHUB_URL,
        license: `${GITHUB_URL}/blob/main/LICENSE`,
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        author,
      },
    ],
  }
}

export function docsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "markdown graphs components",
    description:
      "ASCII graph components for MDX. Install with the shadcn CLI or copy the files.",
    url: `${SITE_URL}/docs`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: components.length,
      itemListElement: components.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}/docs/${item.slug}`,
      })),
    },
  }
}

export function componentJsonLd(item: ComponentDoc) {
  const url = `${SITE_URL}/docs/${item.slug}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: `${item.title} (${item.name})`,
        name: item.name,
        description: item.description,
        url,
        author,
        isPartOf: {
          "@type": "SoftwareSourceCode",
          name: SITE_NAME_SHORT,
          url: SITE_URL,
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: item.title, path: `/docs/${item.slug}` },
      ]),
    ],
  }
}

export function sponsorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Sponsor",
        description:
          "Four cells on the homepage, next to the title. $100 each per month. 100k+ impressions on X.",
        url: `${SITE_URL}/sponsor`,
        author,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Sponsor", path: "/sponsor" },
      ]),
    ],
  }
}

export function skillJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "Skill",
        description:
          "A SKILL.md that picks a markdown graph when a write-up would scan faster with a figure.",
        url: `${SITE_URL}/docs/skill`,
        author,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Skill", path: "/docs/skill" },
      ]),
    ],
  }
}

export function installationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "Installation",
        description:
          "Add markdown graphs with the shadcn CLI, or copy the files by hand.",
        url: `${SITE_URL}/docs/installation`,
        author,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Installation", path: "/docs/installation" },
      ]),
    ],
  }
}

function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  }
}
