import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../../components/PageHeader";
import DataTable, { TableRow, TableCell } from "../../components/DataTable";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import IconButton from "../../components/IconButton";
import EditIcon from "../../components/EditIcon";
import DeleteIcon from "../../components/DeleteIcon";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import FormModal from "../../components/FormModal";
import { API, supabase } from "../../service/API";
import BackG from "../../components/BackG";

const FORM_FIELDS = [
  { name: "full_name", type: "text", placeholder: "Nama lengkap" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password", hideOnEdit: true },
  { name: "no_hp", type: "text", placeholder: "Nomor HP", required: false },
  {
    name: "role",
    type: "select",
    options: [
      { value: "member", label: "Member" },
      { value: "admin", label: "Admin" },
    ],
  },
];

const COLUMNS = [
  { key: "customer_id", label: "ID" },
  { key: "customer_name", label: "USERNAME" },
  { key: "avatar", label: "AVATAR" },
  { key: "email", label: "EMAIL" },
  { key: "no_hp", label: "NO HP" },
  { key: "status", label: "STATUS" },
  { key: "loyalty", label: "LOYALTY" },
  { key: "role", label: "ROLE" },
  { key: "actions", label: "MODIFY" },
];

const getInitials = (name) => {
  if (!name) return "?"
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function Customer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    full_name: "",
    no_hp: "",
    role: "member",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({ ...dataForm, [name]: value })
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

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (editingItem) {
        const { error: updateError } = await API.updateProfile(editingItem.id, {
          full_name: dataForm.full_name,
          no_hp: dataForm.no_hp,
          role: dataForm.role,
        })
        if (updateError) {
          setError(`Gagal mengupdate: ${updateError.message}`)
          return
        }
        setSuccess("User berhasil diupdate!")
      } else {
        const { data: existing } = await API.findByEmail(dataForm.email)
        if (existing) {
          setError("Email sudah digunakan.")
          return
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: dataForm.email,
          password: dataForm.password,
        })

        if (authError) {
          setError(`Gagal membuat akun: ${authError.message}`)
          return
        }

        const { error: profileError } = await API.createProfile({
          id: authData.user.id,
          email: dataForm.email,
          full_name: dataForm.full_name,
          no_hp: dataForm.no_hp,
          role: dataForm.role,
        })

        if (profileError) {
          setError(`Gagal menyimpan profil: ${profileError.message}`)
          return
        }
        setSuccess("User berhasil ditambahkan!")
      }

      setShowModal(false)
      setEditingItem(null)
      setDataForm({ email: "", password: "", full_name: "", no_hp: "", role: "member" })
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

  const handleEdit = (item) => {
    setEditingItem(item)
    setDataForm({
      full_name: item.full_name || "",
      email: item.email || "",
      no_hp: item.no_hp || "",
      role: item.role || "member",
    })
    setShowModal(true)
  }

  const tabs = [
    { key: "all", label: "All", count: users.length },
    { key: "admin", label: "Admin", count: users.filter((d) => d.role === "admin").length },
    { key: "member", label: "Member", count: users.filter((d) => d.role === "member").length },
  ];

  const renderRow = (item, index, isLast) => (
    <TableRow key={item.id} isLast={isLast}>
      <TableCell>{index + 1}</TableCell>
      <TableCell style={{ color: "#fff", fontWeight: 500 }}>{item.full_name || "-"}</TableCell>
      <TableCell><Avatar initials={getInitials(item.full_name)} /></TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.no_hp}</TableCell>
      <TableCell><Badge status={item.role === "admin" ? "Active" : "Inactive"} /></TableCell>
      <TableCell>{item.tier || "-"}</TableCell>
      <TableCell>{item.role}</TableCell>
      <TableCell>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={<EditIcon />} variant="secondary" title="Edit" onClick={() => handleEdit(item)} />
          <IconButton icon={<DeleteIcon />} variant="danger" title="Delete" onClick={() => handleDelete(item.id)} />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <BackG>
      <PageHeader title="Customer Management" breadcrumb={["Customer Management"]}/>

      {error && (
        <div className="mx-4 mt-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-4 mt-2 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="p-4">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-gray-400 gap-2">
            <ImSpinner2 className="animate-spin" /> Memuat data...
          </div>
        ) : (
          <DataTable
            columns={COLUMNS}
            data={users}
            tabs={tabs}
            searchable
            searchFields={["full_name", "email"]}
            searchPlaceholder="Search user..."
            itemsPerPage={5}
            renderRow={renderRow}
            action={
              <Button
                onClick={() => { setEditingItem(null); setDataForm({ email: "", password: "", full_name: "", no_hp: "", role: "member" }); setShowModal(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Users
              </Button>
            }
          />
        )}
      </div>

      <FormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingItem(null); setError(""); }}
        title={editingItem ? "Edit Customer" : "Add Customer"}
        fields={FORM_FIELDS}
        formData={dataForm}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel={editingItem ? "Update User" : "Tambah User"}
        editMode={!!editingItem}
      />

      <Footer />
    </BackG>
  );
}
