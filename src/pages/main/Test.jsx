import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { AiFillDelete } from "react-icons/ai"
import { API, supabase } from "../../service/API"
import Avatar from "../../components/Avatar";

export default function ManajemenUser() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [users, setUsers] = useState([])

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        full_name: "",
        role: "member",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({ ...dataForm, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            // Cek apakah email sudah terdaftar
            const { data: existing } = await API.findByEmail(dataForm.email)
            if (existing) {
                setError("Email sudah digunakan.")
                return
            }

            // Daftarkan ke Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: dataForm.email,
                password: dataForm.password,
            })

            if (authError) {
                setError(`Gagal membuat akun: ${authError.message}`)
                return
            }

            // Simpan profile ke tabel profiles
            const { error: profileError } = await API.createProfile({
                id: authData.user.id,
                email: dataForm.email,
                full_name: dataForm.full_name,
                role: dataForm.role,
            })

            if (profileError) {
                setError(`Gagal menyimpan profil: ${profileError.message}`)
                return
            }

            setSuccess("User berhasil ditambahkan!")
            setDataForm({ email: "", password: "", full_name: "", role: "member" })
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
            await API.deleteProfile(id)
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
            const data = await API.fetchProfiles()
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

    const roleBadge = (role) => {
        const isAdmin = role === "admin"
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                isAdmin
                    ? "bg-purple-100 text-purple-700"
                    : "bg-emerald-100 text-emerald-700"
            }`}>
                {isAdmin ? "Admin" : "Member"}
            </span>
        )
    }

    const getInitials = (name) => {
    if (!name) return "?"
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    return (
        <div className="max-w-5xl mx-auto">
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
                        name="full_name"
                        value={dataForm.full_name}
                        placeholder="Nama lengkap"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />

                    <input
                        disabled={loading}
                        type="email"
                        name="email"
                        value={dataForm.email}
                        placeholder="Email"
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

                    <select
                        disabled={loading}
                        name="role"
                        value={dataForm.role}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>

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

                {loading && (
                    <div className="flex items-center justify-center p-6 text-gray-500 gap-2">
                        <ImSpinner2 className="animate-spin" /> Memuat data...
                    </div>
                )}

                {!loading && users.length === 0 && (
                    <div className="text-center p-6 text-gray-400">
                        Belum ada user. Tambah user pertama!
                    </div>
                )}

                {!loading && users.length > 0 && (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">No.</th>
                                <th className="px-6 py-3">Nama</th>
                                <th className="px-6 py-3">Avatar</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Tier</th>
                                <th className="px-6 py-3">Points</th>
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
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {user.full_name || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Avatar initials={getInitials(user.full_name)} size={24} />
                                    </td>
                                    <td className="px-6 py-4 text-emerald-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {roleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 capitalize">
                                        {user.tier || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {user.points ?? 0}
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