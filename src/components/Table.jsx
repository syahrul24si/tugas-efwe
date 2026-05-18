import TableHeader from "./TableHeader";

export default function Table({ columns, children }) {
  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #2a2a2a",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1a1a1a",
        }}
      >
        <TableHeader columns={columns} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}