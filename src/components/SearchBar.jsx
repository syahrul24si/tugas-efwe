import { useRef, useEffect } from "react";

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  autoFocus = false,
  className = "",
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={{
        width: "300px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #444",
        background: "#1e1e1e",
        color: "#fff",
        outline: "none",
      }}
    />
  );
}
