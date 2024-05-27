import { useMemo, useState } from "react";
import testData, { productType } from "./scripts/mock-data";
import Table from "./components/table";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

function App() {
  const [data, _setData] = useState(testData);
  const [categories, setCategories] = useState<Record<string, boolean>>(
    testData
      .map((category) => category.name)
      .reduce((prev, curr) => {
        return { ...prev, [curr]: true };
      }, {}),
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns = useMemo<ColumnDef<productType>[]>(
    () => [
      {
        accessorKey: "index",
        header: () => <span>Id</span>,
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
      },
      {
        accessorKey: "price",
        header: () => <span>Price</span>,
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorKey: "quantity",
        header: () => <span>Quantity</span>,
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
    ],
    [],
  );
  return (
    <div>
      <select
        multiple
        onChange={(e) =>
          setCategories({
            ...categories,
            [e.target.value]: !categories[e.target.value],
          })
        }
      >
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <table className="text-left">
        {data.map((category) => {
          return (
            <thead>
              <tr>
                <th>{category.name}</th>
              </tr>
              {category.subcategories.map((subcategory) => {
                return (
                  <>
                    <tr>
                      <th>{subcategory.name}</th>
                    </tr>
                    <tbody>
                      <Table
                        setColumnFilters={setColumnFilters}
                        columnFilters={columnFilters}
                        columns={columns}
                        body={subcategory.products}
                      />
                    </tbody>
                  </>
                );
              })}
            </thead>
          );
        })}
      </table>
    </div>
  );
}

export default App;
