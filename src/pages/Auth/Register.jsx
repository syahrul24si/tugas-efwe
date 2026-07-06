import { useState } from "react"
import { MdOutlineEmail, MdLockOutline, MdPerson } from "react-icons/md"
import { useNavigate, Link } from "react-router-dom"
import { API } from "../../service/API.js"
import { AuthInput, AuthAlert, AuthButton } from "../../components/auth"

export default function Register() {
    const navigate = useNavigate()

    const [dataForm, setDataForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan Confirm Password tidak cocok.")
            setLoading(false)
            return
        }

        try {
            const { data: existing } = await API.findByEmail(dataForm.email)
            if (existing) {
                setError("Email sudah terdaftar, coba yang lain.")
                return
            }

            await API.createProfile({
                email: dataForm.email,
                full_name: dataForm.full_name,
                password_hash: dataForm.password,
            })

            alert(`Akun berhasil dibuat! Silakan login.`)
            navigate("/")

        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-[#0B1E3D] mb-1 text-center">
                Create Your Account
            </h2>

            <AuthAlert type="info">
                Please fill in the form below to register.
            </AuthAlert>

            {error && (
                <AuthAlert type="error">
                    {error}
                </AuthAlert>
            )}

            {loading && (
                <AuthAlert type="loading">
                    Mohon Tunggu...
                </AuthAlert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    icon={<MdPerson />}
                    type="text"
                    name="full_name"
                    value={dataForm.full_name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                    disabled={loading}
                />

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

                <AuthInput
                    icon={<MdLockOutline />}
                    type="password"
                    name="confirmPassword"
                    value={dataForm.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    disabled={loading}
                />

                <AuthButton loading={loading} loadingText="Memuat...">
                    Register
                </AuthButton>
            </form>

            <div className="text-center mt-5 text-xs">
                <Link to="/" className="text-gray-400 hover:text-[#FF6B4A] transition-colors">
                    Sudah punya akun? <span className="text-[#FF6B4A] font-semibold">Masuk</span>
                </Link>
            </div>
        </div>
    )
}
