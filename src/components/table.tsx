import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Table } from "@tanstack/react-table";
import TableHead from "./table-head";
import TableBody from "./table-body";

interface Props<T> {
  table: Table<T>;
}
export default function ReactTableVirtualized<T>({ table }: Props<T>) {
  const { rows } = table.getRowModel();
  const headerGroups = table.getHeaderGroups();

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="bg-slate-950 overflow-auto h-full">
      <table className="w-full text-left">
        <TableHead headerGroups={headerGroups} />
        <TableBody virtualizer={virtualizer} rows={rows} />
      </table>
    </div>
  );
}
