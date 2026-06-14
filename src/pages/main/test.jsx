import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { AiFillDelete } from "react-icons/ai"
import { API } from "../../service/API.js"

export default function Register() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [users, setUsers] = useState([])

    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            // Cek apakah username sudah ada
            const { data: existing } = await API.findByUsername(dataForm.username)
            if (existing) {
                setError("Username sudah digunakan.")
                return
            }

            // Simpan ke database (password disimpan apa adanya, tanpa hash)
            await API.createUser({
                username: dataForm.username,
                password_hash: dataForm.password,
            })

            setSuccess("User berhasil ditambahkan!")
            setDataForm({ username: "", password: "" })
            setTimeout(() => setSuccess(""), 3000)

            loadUsers()

        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus user ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")

            await API.deleteUser(id)
            loadUsers()

        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const loadUsers = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await API.fetchUsers()
            setUsers(data)
        } catch (err) {
            setError("Gagal memuat data user")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Load data saat pertama di-render
    useState(() => {
        loadUsers()
    }, [])

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Manajemen User
                </h2>
            </div>

            {/* Alert Error */}
            {error && (
                <div className="bg-red-200 mb-5 p-4 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {/* Alert Success */}
            {success && (
                <div className="bg-green-200 mb-5 p-4 text-sm font-light text-gray-600 rounded flex items-center">
                    ✅ {success}
                </div>
            )}

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tambah User Baru
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        disabled={loading}
                        type="text"
                        name="username"
                        value={dataForm.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />

                    <input
                        disabled={loading}
                        type="password"
                        name="password"
                        value={dataForm.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                            rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <ImSpinner2 className="animate-spin" /> Mohon Tunggu...
                            </span>
                        ) : "Tambah User"}
                    </button>
                </form>
            </div>

            {/* Tabel User */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold">
                        Daftar User ({users.length})
                    </h3>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center p-6 text-gray-500 gap-2">
                        <ImSpinner2 className="animate-spin" /> Memuat data...
                    </div>
                )}

                {/* Kosong */}
                {!loading && users.length === 0 && (
                    <div className="text-center p-6 text-gray-400">
                        Belum ada user. Tambah user pertama!
                    </div>
                )}

                {/* Tabel */}
                {!loading && users.length > 0 && (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">No.</th>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Dibuat</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {index + 1}.
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-emerald-600">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={loading}
                                        >
                                            <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}