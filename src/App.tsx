import { useMemo, useState } from "react";
import testData, { productType } from "./scripts/mock-data";
import Table from "./components/table";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

function App() {
  const [data, _setData] = useState(testData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const dynamicColumns = (
    category: { name: string; id: string },
    subcategory: { name: string; id: string },
  ) =>
    useMemo<ColumnDef<productType>[]>(
      () => [
        {
          header: category.name,
          id: category.id,
          meta: {
            class: category.name && "h-[80px] text-xl",
          },
          columns: [
            {
              header: subcategory.name,
              id: subcategory.id,
              meta: {
                class: "h-[60px] text-lg",
              },
              columns: [
                {
                  accessorKey: "index",
                  header: () => <span>Id</span>,
                  enableColumnFilter: false,
                },
                {
                  accessorKey: "name",
                  header: () => <span>Name</span>,
                  enableColumnFilter: true,
                },
                {
                  accessorKey: "price",
                  header: () => <span>Price</span>,
                  enableColumnFilter: false,
                },
                {
                  accessorKey: "quantity",
                  header: () => <span>Quantity</span>,
                  enableColumnFilter: false,
                },
              ],
            },
          ],
        },
      ],
      [],
    );
  return data.map((category, catIdx) =>
    category.subcategories.map(({ name, subCatId, products }, subCatIdx) => (
      <Table
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        columns={dynamicColumns(
          {
            name: subCatIdx !== 0 ? "" : category.name,
            id: category.catId.toString(),
          },
          { name, id: subCatId },
        )}
        renderSearch={catIdx === 0 && subCatIdx === 0}
        body={products}
      />
    )),
  );
}

export default App;
