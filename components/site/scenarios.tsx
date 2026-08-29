import Link from "next/link"

import { RecipeFigures } from "@/components/docs/recipe-card"
import { SiteContainer } from "@/components/site/container"
import { featuredRecipes } from "@/lib/docs/recipes"

function Scenarios() {
  return (
    <section>
      <SiteContainer className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
            Next to the writing
          </h2>
          <p className="max-w-[48ch] text-pretty text-muted-foreground">
            A short stack for a refactor or an incident. Two graphs, some prose.
            Same components as the rest of the library.
          </p>
        </div>
        <div className="grid gap-16 lg:grid-cols-2">
          {featuredRecipes.map((recipe) => (
            <article className="flex flex-col gap-6" key={recipe.slug}>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">{recipe.title}</h3>
                <p className="max-w-[40ch] text-pretty text-muted-foreground">
                  {recipe.story}
                </p>
              </div>
              <RecipeFigures recipe={recipe} />
            </article>
          ))}
        </div>
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/examples"
          >
            More examples
          </Link>
        </p>
      </SiteContainer>
    </section>
  )
}

export { Scenarios }
