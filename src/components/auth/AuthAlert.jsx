import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { MdCheckCircle } from "react-icons/md"

const STYLES = {
    info: "bg-[#FF6B4A] text-white",
    error: "bg-red-50 border border-red-200 text-red-600",
    success: "bg-green-50 border border-green-200 text-green-700",
    loading: "bg-gray-100 text-gray-600",
}

export default function AuthAlert({ type = "info", children }) {
    const style = STYLES[type] || STYLES.info

    return (
        <div className={`flex items-center gap-2 text-xs rounded-lg px-4 py-3 mb-5 ${style} ${type === "info" ? "text-center justify-center font-medium" : ""}`}>
            {type === "error" && <BsFillExclamationDiamondFill className="text-red-500 flex-shrink-0" />}
            {type === "loading" && <ImSpinner2 className="animate-spin flex-shrink-0" />}
            {type === "success" && <MdCheckCircle className="text-green-600 flex-shrink-0" />}
            {children}
        </div>
    )
}
