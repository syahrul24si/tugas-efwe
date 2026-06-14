import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { useNavigate } from "react-router"
import { API } from "../../service/API.js"

export default function Register() {
    const navigate = useNavigate()

    const [dataForm, setDataForm] = useState({
        username: "",
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
            const { data: existing } = await API.findByUsername(dataForm.username)
            if (existing) {
                setError("Username sudah digunakan, coba yang lain.")
                return
            }

            await API.createUser({
                username: dataForm.username,
                password_hash: dataForm.password,
            })

            alert(`Akun berhasil dibuat! Silakan login. 🎉`)
            navigate("/login")

        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            {/* Error */}
            {error && (
                <div className="bg-red-200 mb-5 p-4 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="bg-gray-200 mb-5 p-4 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Mohon Tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={dataForm.username}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="Username"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed
                        text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    {loading ? "Memuat..." : "Register"}
                </button>
            </form>
        </div>
    )
}