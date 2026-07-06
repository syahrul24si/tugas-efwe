import { useState } from "react"
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"
import { useNavigate, Link } from "react-router-dom"
import { API } from "../../service/API.js"
import { AuthInput, AuthAlert, AuthButton } from "../../components/auth"

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
        <div>
            <h2 className="text-xl font-bold text-[#0B1E3D] mb-1 text-center">
                Welcome to TravellingGO
            </h2>

            <AuthAlert type="info">
                Please login with your Email and Password.
            </AuthAlert>

            {error && (
                <AuthAlert type="error">
                    {error}
                </AuthAlert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    icon={<MdOutlineEmail />}
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    disabled={loading}
                />

                <AuthInput
                    icon={<MdLockOutline />}
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                    disabled={loading}
                />

                <AuthButton loading={loading}>
                    Login
                </AuthButton>
            </form>

            <div className="flex items-center justify-between mt-5 text-xs">
                <Link to="/forgot" className="text-gray-400 hover:text-[#FF6B4A] transition-colors">
                    Forgot Password?
                </Link>
                <Link to="/register" className="text-gray-400 hover:text-[#FF6B4A] transition-colors">
                    Belum punya akun? <span className="text-[#FF6B4A] font-semibold">Daftar</span>
                </Link>
            </div>
        </div>
    )
}
