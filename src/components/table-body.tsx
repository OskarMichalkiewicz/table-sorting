export default function TableBody({ rows }: { rows: (string | number)[][] }) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr>
          {row.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
