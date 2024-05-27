import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Column,
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
}
export default function ReactTableVirtualized({
  columns,
  body,
  columnFilters,
  setColumnFilters,
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
    estimateSize: () => 34,
    overscan: 20,
  });

  return (
    <div ref={parentRef} className={`h-[${virtualizer.getTotalSize()}px]`}>
      {table.getHeaderGroups().map((groups) =>
        groups.headers.map((header) =>
          header.column.getCanFilter() ? (
            <div>
              <DebouncedInput
                className="w-36 border shadow rounded"
                onChange={(value) => header.column.setFilterValue(value)}
                placeholder={`Search...`}
                type="text"
                value={(header.column.getFilterValue() ?? "") as string}
              />
            </div>
          ) : null,
        ),
      )}
      <table>
        <TableHead headerGroups={table.getHeaderGroups()} />
        <TableBody rows={rows} virtualizer={virtualizer} />
      </table>
    </div>
  );
}
