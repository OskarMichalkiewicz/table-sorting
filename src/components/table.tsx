import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { productType } from "../scripts/mock-data";
import TableHead from "./table-head";
import TableBody from "./table-body";

interface Props {
  columns: ColumnDef<productType>[];
  body: productType[];
}
export default function ReactTableVirtualized({ columns, body }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, _setData] = useState(body);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
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
    <div ref={parentRef}>
      <div className={`h-[${virtualizer.getTotalSize()}px]`}>
        <table>
          <TableHead headerGroups={table.getHeaderGroups()} />
          <TableBody rows={rows} virtualizer={virtualizer} />
        </table>
      </div>
    </div>
  );
}
