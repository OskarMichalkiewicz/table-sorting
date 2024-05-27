import { dataType } from "../scripts/mock-data";
import TableBody from "./table-body";
import TableHead from "./table-head";

export default function Table({
  data,
  search,
  categories,
}: {
  data: dataType;
  search: string;
  categories: Record<string, boolean>;
}) {
  return (
    <table className="text-left border">
      {data
        .filter((category) => categories[category.name])
        .map((category) => {
          return (
            <>
              <TableHead rows={[[category.name]]} />
              {category.subcategories.map((subcategory) => {
                return (
                  <>
                    <TableHead
                      rows={[
                        [subcategory.name],
                        Object.keys(subcategory.products[0]),
                      ]}
                    />
                    <TableBody
                      rows={subcategory.products
                        .filter(
                          (product) => !search || product.name.includes(search),
                        )
                        .map((product) => Object.values(product))}
                    />
                  </>
                );
              })}
            </>
          );
        })}
    </table>
  );
}
