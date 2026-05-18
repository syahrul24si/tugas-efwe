import TableCell from "./TableCell";

export default function TableHeader({ columns }) {
  return (
    <thead>
      <tr style={{ background: "#222", borderBottom: "1px solid #2a2a2a" }}>
        {columns.map((col) => (
          <TableCell key={col.key} isHeader align={col.align}>
            {col.label}
          </TableCell>
        ))}
      </tr>
    </thead>
  );
}