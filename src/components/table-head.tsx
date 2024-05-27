export default function TableHead({ rows }: { rows: string[][] }) {
  return (
    <thead>
      {rows.map((row) => (
        <tr>
          {row.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
