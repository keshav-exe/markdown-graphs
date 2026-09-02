import { components } from "@/lib/docs/catalog"
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site"
import { GITHUB_URL } from "@/lib/github"

const slugs = components.map((item) => item.slug)

const problemSchema = {
  type: "object",
  required: ["type", "title", "status", "detail", "code"],
  properties: {
    type: { type: "string", format: "uri" },
    title: { type: "string" },
    status: { type: "integer" },
    detail: { type: "string" },
    instance: { type: "string" },
    code: { type: "string" },
    hrefs: {
      type: "object",
      additionalProperties: { type: "string", format: "uri" },
    },
  },
} as const

const componentSchema = {
  type: "object",
  required: ["slug", "name", "title", "description", "registry", "docs"],
  properties: {
    slug: { type: "string", example: "graph-table" },
    name: { type: "string", example: "GraphTable" },
    title: { type: "string", example: "Table" },
    description: { type: "string" },
    registry: { type: "string" },
    docs: { type: "string", format: "uri" },
    when: { type: "string" },
    not: { type: "string" },
  },
} as const

function problemResponse(description: string) {
  return {
    description,
    content: {
      "application/problem+json": {
        schema: { $ref: "#/components/schemas/Problem" },
      },
    },
  }
}

export function openApiSpec(origin = SITE_URL) {
  const host = origin || SITE_URL

  return {
    openapi: "3.1.0",
    info: {
      title: "Markdown Graphs",
      summary: SITE_DESCRIPTION,
      description:
        "Public read API for the Markdown Graphs catalog, shadcn registry, skill files, and llms.txt. No authentication. Source files are copied with the shadcn CLI; this API does not install them for you.",
      version: "1.0.0",
      license: {
        name: "MIT",
        url: `${GITHUB_URL}/blob/main/LICENSE`,
      },
      contact: {
        name: "Keshav Bagaade",
        email: "hi@kshv.me",
        url: host,
      },
    },
    servers: [{ url: host, description: "Production" }],
    tags: [
      { name: "catalog", description: "Graph list and one graph." },
      { name: "machine", description: "Skill, chooser, registry, OpenAPI." },
    ],
    paths: {
      "/api/v1/components": {
        get: {
          operationId: "listComponents",
          tags: ["catalog"],
          summary: "List every graph",
          description:
            "Returns the catalog: slug, export name, docs URL, and when/not hints for agents picking a figure.",
          responses: {
            "200": {
              description: "Catalog.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["components"],
                    properties: {
                      components: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Component" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/components/{slug}": {
        get: {
          operationId: "getComponent",
          tags: ["catalog"],
          summary: "Get one graph",
          description:
            "One catalog row plus props. 404 if the slug is not a graph.",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "Registry slug, like graph-table.",
              schema: {
                type: "string",
                enum: slugs,
              },
            },
          ],
          responses: {
            "200": {
              description: "One graph.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ComponentDetail" },
                },
              },
            },
            "404": problemResponse("Unknown slug."),
          },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsTxt",
          tags: ["machine"],
          summary: "Chooser and ASCII twins",
          description:
            "When-to-use, host rules, chooser table, official fenced twins, and recipes. Fetch this if the skill is not installed.",
          responses: {
            "200": {
              description: "Markdown.",
              content: {
                "text/markdown": { schema: { type: "string" } },
                "text/plain": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/skill.md": {
        get: {
          operationId: "getSkill",
          tags: ["machine"],
          summary: "SKILL.md",
          description:
            "The Agent Skill file. Copy it into .cursor/skills, .claude/skills, .agents/skills, or .opencode/skills.",
          responses: {
            "200": {
              description: "The skill.",
              content: {
                "text/markdown": { schema: { type: "string" } },
                "text/plain": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/skill/recipes.md": {
        get: {
          operationId: "getSkillRecipes",
          tags: ["machine"],
          summary: "Skill recipes",
          description: "Worked JSX for the skill to copy.",
          responses: {
            "200": {
              description: "Recipes.",
              content: {
                "text/markdown": { schema: { type: "string" } },
                "text/plain": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/r/{name}.json": {
        get: {
          operationId: "getRegistryItem",
          tags: ["machine"],
          summary: "shadcn registry item",
          description:
            "JSON the shadcn CLI copies into the project. name is a graph slug or all.",
          parameters: [
            {
              name: "name",
              in: "path",
              required: true,
              description: "graph-table, all, or another registry name.",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Registry item.",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
            "404": problemResponse("Unknown registry name."),
          },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          tags: ["machine"],
          summary: "This OpenAPI document",
          description: "OpenAPI 3.1 for the public read surface.",
          responses: {
            "200": {
              description: "OpenAPI 3.1.",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Problem: problemSchema,
        Component: componentSchema,
        ComponentDetail: {
          allOf: [
            { $ref: "#/components/schemas/Component" },
            {
              type: "object",
              properties: {
                dependencies: {
                  type: "array",
                  items: { type: "string" },
                },
                props: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["name", "type", "description"],
                    properties: {
                      name: { type: "string" },
                      type: { type: "string" },
                      default: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  }
}

export function apiCatalog(origin = SITE_URL) {
  const host = origin || SITE_URL

  return {
    linkset: [
      {
        anchor: `${host}/`,
        "service-desc": [
          {
            href: `${host}/openapi.json`,
            type: "application/json",
          },
        ],
        item: [
          { href: `${host}/api/v1/components` },
          { href: `${host}/llms.txt` },
          { href: `${host}/skill.md` },
        ],
      },
    ],
  }
}

export function toComponentJson(item: (typeof components)[number]) {
  return {
    slug: item.slug,
    name: item.name,
    title: item.title,
    description: item.description,
    registry: item.registry,
    docs: `${SITE_URL}/docs/${item.slug}`,
    ...(item.when ? { when: item.when } : {}),
    ...(item.not ? { not: item.not } : {}),
  }
}

export function toComponentDetail(item: (typeof components)[number]) {
  return {
    ...toComponentJson(item),
    dependencies: item.dependencies,
    props: item.props,
  }
}
