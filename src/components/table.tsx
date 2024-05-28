import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnFiltersState,
  SortingState,
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
  body: productType[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  renderSearch: boolean;
  expanded: boolean;
  subcategory: { name: string; id: string; show: boolean };
  category: { name: string; id: string; show: boolean };
}
export default function ReactTableVirtualized({
  body,
  columnFilters,
  setColumnFilters,
  renderSearch,
  expanded,
  setSorting,
  sorting,
  subcategory,
  category,
}: Props) {
  const columns = useMemo(
    () => [
      {
        header: category.show ? category.name : "",
        id: category.id,
        meta: category.show ? "h-[80px] text-xl" : "",
        enableSorting: false,
        columns: [
          {
            header: subcategory.show ? subcategory.name : "",
            id: subcategory.id,
            meta: subcategory.show ? "h-10" : "",
            enableSorting: false,
            columns: [
              {
                accessorKey: "index",
                header: () => <span>Id</span>,
                enableColumnFilter: false,
                enableSorting: false,
              },
              {
                accessorKey: "name",
                header: () => <span>Name</span>,
                enableColumnFilter: true,
                enableSorting: false,
              },
              {
                accessorKey: "price",
                header: () => <span>Price</span>,
                enableColumnFilter: false,
                enableSorting: true,
              },
              {
                accessorKey: "quantity",
                header: () => <span>Quantity</span>,
                enableColumnFilter: false,
                enableSorting: false,
              },
            ],
          },
        ],
      },
    ],
    [category, subcategory],
  );
  const table = useReactTable({
    data: body,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetExpanded: false,
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
    <div ref={parentRef} className="text-left">
      {renderSearch &&
        table.getHeaderGroups().map((groups) =>
          groups.headers.map(({ column }) =>
            column.getCanSort() ? (
              <button
                key={column.id}
                className="fixed top-8 h-12 w-40 border border-slate-900 bg-slate-800"
                onClick={column.getToggleSortingHandler()}
              >
                sort by price
              </button>
            ) : null,
          ),
        )}
      {renderSearch &&
        table
          .getHeaderGroups()
          .map((groups) =>
            groups.headers.map(({ column }) =>
              column.getCanFilter() ? (
                <DebouncedInput
                  key={column.id}
                  className="fixed top-0 w-40 border px-2 h-8 border-slate-900 bg-slate-800"
                  onChange={(value) => column.setFilterValue(value)}
                  placeholder={`Search...`}
                  type="text"
                  value={(column.getFilterValue() ?? "") as string}
                />
              ) : null,
            ),
          )}
      <table className="w-full">
        <TableHead headerGroups={table.getHeaderGroups()} expanded={expanded} />
        <TableBody rows={rows} virtualizer={virtualizer} expanded={expanded} />
      </table>
    </div>
  );
}
