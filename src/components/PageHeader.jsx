export default function PageHeader({
  title,
  actionLabel,
  actionIcon,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <h1 style={{ fontSize: "22px", fontWeight: 600, margin: 0 }}>
        {title}
      </h1>
    </div>
  );
}