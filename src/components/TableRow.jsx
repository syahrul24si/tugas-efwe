export default function TableRow({
  children,
  isLast = false,
}) {
  return (
    <tr
      style={{
        borderBottom: isLast ? "none" : "1px solid #232323",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#202020")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </tr>
  );
}