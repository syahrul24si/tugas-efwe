import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { MdOutlineEmail, MdLockOutline, MdLogin } from "react-icons/md"
import { PiBus, PiSteeringWheel } from "react-icons/pi"
import { useNavigate } from "react-router"
import { API } from "../../service/API.js"

export default function Login() {
    const navigate = useNavigate()

    const [dataForm, setDataForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({ ...dataForm, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const { user, profile, role, error: loginError } = await API.signInWithRole(
                dataForm.email,
                dataForm.password
            )

            if (loginError || !user) {
                setError("Email atau password salah.")
                return
            }

            localStorage.setItem("user", JSON.stringify({
                id: profile.id,
                email: profile.email,
                full_name: profile.full_name,
                role: profile.role,
            }))

            if (role === "admin") {
                navigate("/dashboard")
            } else {
                navigate("/guest")
            }

        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-4xl flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Masuk ke akun</h2>
                    <p className="text-sm text-gray-400 mb-8">Selamat datang kembali, silakan login.</p>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
                            <BsFillExclamationDiamondFill className="text-red-500 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Email
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                                <MdOutlineEmail className="text-gray-400 text-lg flex-shrink-0" />
                                <input
                                    type="email"
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    placeholder="nama@perusahaan.com"
                                    required
                                    disabled={loading}
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Password
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                                <MdLockOutline className="text-gray-400 text-lg flex-shrink-0" />
                                <input
                                    type="password"
                                    name="password"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 mt-2"
                        >
                            {loading ? (
                                <>
                                    <ImSpinner2 className="animate-spin" />
                                    Mohon tunggu...
                                </>
                            ) : (
                                <>
                                    <MdLogin className="text-lg" />
                                    Masuk
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-8">
                        Butuh akses? Hubungi administrator sistem.
                    </p>
                </div>
            </div>
        </div>
    )
}