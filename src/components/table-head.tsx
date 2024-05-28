import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { productType } from "../scripts/mock-data";

interface Props {
  headerGroups: HeaderGroup<productType>[];
  expanded: boolean;
}
export default function TableHead({ headerGroups, expanded }: Props) {
  return (
    <>
      <thead>
        {headerGroups.map((headerGroup) => {
          const element = (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.columnDef.meta as string}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          );
          return expanded ? element : headerGroup.depth < 2 ? element : null;
        })}
      </thead>
    </>
  );
}
