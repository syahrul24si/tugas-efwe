import { ImSpinner2 } from "react-icons/im"

export default function AuthButton({
    children,
    loading = false,
    loadingText = "Mohon tunggu...",
    disabled = false,
    type = "submit",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`w-full h-12 bg-[#FF6B4A] hover:bg-[#e85c3c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 mt-2 text-sm ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <ImSpinner2 className="animate-spin" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    )
}
