import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { productType } from "../scripts/mock-data";

interface Props {
  headerGroups: HeaderGroup<productType>[];
}
export default function TableHead({ headerGroups }: Props) {
  return (
    <>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { meta } = header.column.columnDef;
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={meta ? (meta as { class: string }).class : "h-10"}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
    </>
  );
}
