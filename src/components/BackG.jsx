export default function BackG({ children }) {
  return (
    <div style={{
        background: "#141414",
        minHeight: "90vh",
        padding: "32px",
        fontFamily: "sans-serif",
        color: "#fff",
      }}
      >
        {children}
      </div>
    )}