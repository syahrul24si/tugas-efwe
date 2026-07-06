import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DataTable, { TableRow, TableCell } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { API } from "../../service/API";
import { Button } from "@/components/ui/button";
import BackG from "../../components/BackG";
import IconButton from "../../components/IconButton";
import EditIcon from "../../components/EditIcon";
import DeleteIcon from "../../components/DeleteIcon";
import FormModal from "../../components/FormModal";

const FORM_FIELDS = [
  { name: "name", type: "text", placeholder: "Nama produk" },
  {
    name: "category",
    type: "select",
    options: [
      { value: "minibus", label: "Minibus" },
      { value: "bus", label: "Bus" },
      { value: "luxury", label: "Luxury" },
      { value: "hiace", label: "Hiace" },
    ],
  },
  { name: "price", type: "number", placeholder: "Harga" },
  { name: "stock", type: "number", placeholder: "Stok" },
  { name: "seat", type: "number", placeholder: "Kursi" },
  { name: "description", type: "textarea", placeholder: "Deskripsi", required: false },
  { name: "image_url", type: "text", placeholder: "URL Gambar", required: false },
];

const COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "category", label: "CATEGORY" },
  { key: "price", label: "PRICE" },
  { key: "stock", label: "STOCK" },
  { key: "seat", label: "SEAT" },
  { key: "description", label: "DESCRIPTION" },
  { key: "action", label: "MODIFY" },
];

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({});

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await API.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingItem) {
        const { error: updateError } = await API.updateProduct(editingItem.id, dataForm);
        if (updateError) {
          setError(`Gagal mengupdate: ${updateError.message}`);
          return;
        }
      } else {
        const { error: insertError } = await API.createProduct(dataForm);
        if (insertError) {
          setError(`Gagal menambahkan produk: ${insertError.message}`);
          return;
        }
      }

      setShowModal(false);
      setEditingItem(null);
      setDataForm({});
      loadProducts();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus produk ini?")
    if (!konfirmasi) return

    try {
      setLoading(true)
      setError("")
      await API.deleteProduct(id)
      loadProducts()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item);
    setDataForm({
      name: item.name || "",
      category: item.category || "",
      price: item.price || "",
      stock: item.stock || "",
      seat: item.seat || "",
      description: item.description || "",
      image_url: item.image_url || "",
    });
    setShowModal(true);
  };

  const tabs = [
    { key: "all", label: "All", count: products.length },
    { key: "minibus", label: "Minibus", count: products.filter((d) => d.category?.toLowerCase() === "minibus").length },
    { key: "bus", label: "Bus", count: products.filter((d) => d.category?.toLowerCase() === "bus").length },
    { key: "luxury", label: "Luxury", count: products.filter((d) => d.category?.toLowerCase() === "luxury").length },
    { key: "hiace", label: "Hiace", count: products.filter((d) => d.category?.toLowerCase() === "hiace").length },
  ];

  const renderRow = (item, index, isLast) => (
    <TableRow key={item.id} isLast={isLast}>
      <TableCell style={{ color: "#fff", fontWeight: 500 }}>
        <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
          {item.name}
        </Link>
      </TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>Rp {item.price?.toLocaleString()}</TableCell>
      <TableCell>{item.stock}</TableCell>
      <TableCell>{item.seat}</TableCell>
      <TableCell>
        <span title={item.description} className="text-gray-400 truncate block max-w-[150px]">
          {item.description || "-"}
        </span>
      </TableCell>
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
      <PageHeader title="Produk" breadcrumb={["Dashboard", "Produk"]} />

      {error && (
        <div className="mx-4 mt-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="p-4">
        {loading && products.length === 0 ? (
          <p className="text-gray-400">Loading products...</p>
        ) : (
          <DataTable
            columns={COLUMNS}
            data={products}
            tabs={tabs}
            searchable
            searchFields={["name", "category"]}
            searchPlaceholder="Search product by name or category..."
            itemsPerPage={7}
            renderRow={renderRow}
            action={
              <Button
                onClick={() => { setEditingItem(null); setDataForm({}); setShowModal(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Product
              </Button>
            }
          />
        )}
      </div>

      <FormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingItem(null); setError(""); }}
        title={editingItem ? "Edit Product" : "Add Product"}
        fields={FORM_FIELDS}
        formData={dataForm}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel={editingItem ? "Update Produk" : "Tambah Produk"}
        editMode={!!editingItem}
      />

      <Footer />
    </BackG>
  );
}
