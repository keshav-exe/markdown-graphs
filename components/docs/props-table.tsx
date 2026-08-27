import type { PropRow } from "@/lib/docs/catalog"

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Props</h2>
      <div className="-mx-4 -my-2 overflow-x-auto whitespace-nowrap sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full px-4 py-2 align-middle sm:px-6 lg:px-8">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                {["Prop", "Type", "Default", "Description"].map((header) => (
                  <th
                    key={header}
                    className="border-b border-border px-3 py-3 text-left font-medium whitespace-nowrap text-foreground dark:border-border"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="border-b border-border px-3 py-3 font-mono whitespace-nowrap dark:border-border">
                    {row.name}
                  </td>
                  <td className="border-b border-border px-3 py-3 font-mono whitespace-nowrap text-muted-foreground dark:border-border">
                    {row.type}
                  </td>
                  <td className="border-b border-border px-3 py-3 font-mono whitespace-nowrap text-muted-foreground dark:border-border">
                    {row.default ?? "—"}
                  </td>
                  <td className="border-b border-border px-3 py-3 text-pretty whitespace-normal text-muted-foreground dark:border-border">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export { PropsTable }
