import { Gallery } from "@/components/site/gallery"
import { Hero } from "@/components/site/hero"
import { Principles } from "@/components/site/principles"
import { Usage } from "@/components/site/usage"

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Gallery />
      <Principles />
      <Usage />
    </main>
  )
}
