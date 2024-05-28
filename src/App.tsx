import { useMemo, useState } from "react";
import testData, { categoriesMap } from "./scripts/mock-data";
import Table from "./components/table";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import CategorySelectGroup from "./components/category-select-group";
import ErrorBoundary from "./components/error-boundary";

function App() {
  const data = useMemo(() => testData, []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [categoriesShown, setCategoriesShown] =
    useState<Record<string, Record<string, boolean>>>(categoriesMap);
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <ErrorBoundary>
      <CategorySelectGroup
        categoriesShown={categoriesShown}
        setCategoriesShown={setCategoriesShown}
      />
      <div className="pt-20">
        {data.map((category) =>
          category.subcategories.map(
            ({ name, subCatId, products }, subCatIdx) => (
              <Table
                key={`table-${category.catId}-${subCatIdx}`}
                sorting={sorting}
                setSorting={setSorting}
                expanded={categoriesShown[category.name][name]}
                setColumnFilters={setColumnFilters}
                columnFilters={columnFilters}
                category={{
                  name: category.name,
                  id: category.catId.toString(),
                  show: subCatIdx === 0,
                }}
                subcategory={{
                  name,
                  id: subCatId,
                  show: Object.values(categoriesShown[category.name]).some(
                    (subcategory) => subcategory,
                  ),
                }}
                renderSearch={category.catId === 0 && subCatIdx === 0}
                body={products}
              />
            ),
          ),
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
