import { useMemo, useState } from "react";
import testData, { productType } from "./scripts/mock-data";
import Table from "./components/table";
import { ColumnDef } from "@tanstack/react-table";

function App() {
  const [data, setData] = useState(testData);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Record<string, boolean>>(
    testData
      .map((category) => category.name)
      .reduce((prev, curr) => {
        return { ...prev, [curr]: true };
      }, {}),
  );
  const columns = useMemo<ColumnDef<productType>[]>(
    () => [
      {
        accessorKey: "index",
        header: () => <span>Id</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        header: () => <span>Price</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "quantity",
        header: () => <span>Quantity</span>,
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
                        columns={columns}
                        body={subcategory.products.filter((product) =>
                          product.name.includes(search),
                        )}
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
