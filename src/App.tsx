import { expandData, expandType } from "./scripts/mock-data";
import Table from "./components/table";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function App() {
  const data = expandData;
  const columns = useMemo<ColumnDef<expandType>[]>(
    () => [
      {
        accessorKey: "category",
        id: "category",
        header: () => " ",
        cell: ({ row, getValue }) => (
          <div>
            {row.getCanExpand() ? (
              <button
                className="flex cursor-pointer gap-x-2 w-full"
                onClick={row.getToggleExpandedHandler()}
              >
                <div>{row.getIsExpanded() ? "▼" : "►"}</div>
                <div>{getValue<boolean>()}</div>
              </button>
            ) : (
              getValue<boolean>()
            )}
          </div>
        ),
        filterFn: (row, _, filterValue) => {
          return row.original.name?.includes(filterValue);
        },
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.index,
        id: "index",
        cell: ({ getValue, row }) => {
          return row.depth >= 2 && getValue();
        },
        header: () => {
          return <span>Index</span>;
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.price,
        id: "price",
        cell: (info) => info.getValue(),
        header: () => <span>Price</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.quantity,
        id: "quantity",
        cell: (info) => info.getValue(),
        header: () => <span>Quantity</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    [],
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [expanded, setExpanded] = useState<ExpandedState>(true);

  const table = useReactTable<expandType>({
    data,
    columns,
    filterFns: {},
    state: {
      expanded,
      columnFilters,
      sorting,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRow,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    autoResetExpanded: false,
    filterFromLeafRows: true,
  });

  return <Table table={table} />;
}

export default App;
