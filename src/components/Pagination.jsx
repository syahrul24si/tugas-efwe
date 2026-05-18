export default function Pagination({currentPage,totalPages,onPageChange,}) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{display: "flex",alignItems: "center",justifyContent: "center",gap: "8px",marginTop: "24px",
      }}
    >
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </PaginationButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </PaginationButton>
    </div>
  );
}

function PaginationButton({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{width: "32px",height: "32px",borderRadius: "6px",border: active ? "none" : "1px solid #333",background: active ? "#2563eb" : "transparent",color: disabled ? "#555" : active ? "#fff" : "#aaa",cursor: disabled ? "not-allowed" : "pointer",fontSize: active ? "14px" : "16px",fontWeight: active ? 600 : 400,display: "flex",alignItems: "center",justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}