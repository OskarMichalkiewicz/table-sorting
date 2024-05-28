import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { productType } from "../scripts/mock-data";
import TableHead from "./table-head";
import TableBody from "./table-body";
import DebouncedInput from "./debounced-input";

interface Props {
  columns: ColumnDef<productType>[];
  body: productType[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  renderSearch: boolean;
}
export default function ReactTableVirtualized({
  columns,
  body,
  columnFilters,
  setColumnFilters,
  renderSearch,
}: Props) {
  const [data, _setData] = useState(body);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
    debugHeaders: true,
    debugColumns: false,
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 20,
  });

  return (
    <div
      ref={parentRef}
      className={`text-left h-[${virtualizer.getTotalSize()}px]`}
    >
      {renderSearch &&
        table
          .getHeaderGroups()
          .map((groups) =>
            groups.headers.map((header) =>
              header.column.getCanFilter() ? (
                <DebouncedInput
                  className="fixed h-6 top-0 w-full border bg-slate-600 text-slate-100"
                  onChange={(value) => header.column.setFilterValue(value)}
                  placeholder={`Search...`}
                  type="text"
                  value={(header.column.getFilterValue() ?? "") as string}
                />
              ) : null,
            ),
          )}
      <table
        className={`w-full bg-slate-950 text-slate-100 ${renderSearch ? "mt-6" : ""}`}
      >
        <TableHead headerGroups={table.getHeaderGroups()} />
        <TableBody rows={rows} virtualizer={virtualizer} />
      </table>
    </div>
  );
}
