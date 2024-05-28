import { Row, flexRender } from "@tanstack/react-table";
import { productType } from "../scripts/mock-data";
import { Virtualizer } from "@tanstack/react-virtual";

interface Props {
  rows: Row<productType>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  expanded: boolean;
}
export default function TableBody({ rows, virtualizer, expanded }: Props) {
  return (
    <tbody>
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        return expanded ? (
          <tr key={row.id} className="h-[40px]">
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ) : null;
      })}
    </tbody>
  );
}
