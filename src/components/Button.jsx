const VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-500 text-red-100 border border-red-700",
  ghost: "bg-transparent text-white border border-gray-300",
  secondary: "bg-slate-500 text-slate-300 border border-slate-600",
};

const SIZES = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClass}
        ${sizeClass}
        rounded-md
        flex items-left gap-2
        mb-2 px-4
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}