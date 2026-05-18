export default function Filter({
  tabs = [],
  activeTab,
  onTabChange,
}) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      {tabs.map((tab) => (
        <span
          key={tab.key}
          onClick={() => onTabChange?.(tab.key)}
          style={{
            background: activeTab === tab.key ? "#2563eb" : "#2a2a2a",
            color: activeTab === tab.key ? "#fff" : "#aaa",
            borderRadius: "6px",
            padding: "5px 14px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          {tab.label} ({tab.count})
        </span>
      ))}
    </div>
  );
}