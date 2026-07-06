export default function AuthInput({
    icon,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
}) {
    return (
        <div className="relative">
            {icon && (
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    {icon}
                </span>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all disabled:opacity-60"
            />
        </div>
    )
}
