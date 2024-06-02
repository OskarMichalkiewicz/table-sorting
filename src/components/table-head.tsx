import { flexRender, HeaderGroup } from "@tanstack/react-table";
import DebouncedInput from "./debounced-input";

interface Props<T> {
  headerGroups: HeaderGroup<T>[];
}
export default function TableHead<T>({ headerGroups }: Props<T>) {
  return (
    <thead className="fixed top-0 w-full bg-slate-950 z-10 h-8">
      {headerGroups.map((headerGroup) => (
        <tr className="grid grid-cols-5 h-full" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                className="flex h-full bg-slate-900"
                key={header.id}
                colSpan={header.colSpan}
              >
                {header.column.getCanFilter() ? (
                  <DebouncedInput
                    key={header.column.id}
                    className="border px-2 h-full w-full outline-none border-slate-900 bg-slate-800"
                    onChange={(value) => header.column.setFilterValue(value)}
                    placeholder="Search..."
                    type="text"
                    value={(header.column.getFilterValue() ?? "") as string}
                  />
                ) : null}
                {header.isPlaceholder ? null : (
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className="h-full flex items-center gap-x-4"
                    style={
                      header.column.getCanSort()
                        ? { cursor: "pointer" }
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort()
                      ? { asc: "▲", desc: "▼", none: "-" }[
                          header.column.getIsSorted() || "none"
                        ]
                      : null}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
