const ALIGN_MAP = {
  left: "left",
  center: "center",
  right: "right",
};

export default function TableCell({
  children,
  isHeader = false,
  align = "left",
  style: customStyle,
}) {
  const Tag = isHeader ? "th" : "td";

  const baseStyle = isHeader
    ? {
        padding: "14px 16px",
        textAlign: ALIGN_MAP[align],
        fontSize: "12px",
        fontWeight: 600,
        color: "#888",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }
    : {
        padding: "14px 16px",
        fontSize: "14px",
        color: "#bbb",
        textAlign: ALIGN_MAP[align],
      };

  return <Tag style={{ ...baseStyle, ...customStyle }}>{children}</Tag>;
}