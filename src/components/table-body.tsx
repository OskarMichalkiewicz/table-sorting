import { Row, flexRender } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";

interface Props<T> {
  rows: Row<T>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}
export default function TableBody<T>({ rows, virtualizer }: Props<T>) {
  return (
    <tbody
      className="relative top-8"
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <tr
            data-index={virtualRow.index}
            ref={(node) => virtualizer.measureElement(node)}
            key={row.id}
            className="absolute w-full grid grid-cols-5"
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
