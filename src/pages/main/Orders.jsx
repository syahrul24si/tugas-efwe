import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../../components/PageHeader";
import DataTable, { TableRow, TableCell } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { API } from "../../service/API";
import BackG from "../../components/BackG";
import IconButton from "../../components/IconButton";
import EditIcon from "../../components/EditIcon";
import DeleteIcon from "../../components/DeleteIcon";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  { key: "order_id", label: "ORDER ID" },
  { key: "product_name", label: "PRODUCT" },
  { key: "member_id", label: "MEMBER" },
  { key: "quantity", label: "QTY" },
  { key: "price_at_purchase", label: "PRICE" },
  { key: "status", label: "STATUS" },
  { key: "points_earned", label: "POINTS" },
  { key: "subtotal", label: "SUBTOTAL" },
  { key: "created_at", label: "DATE" },
  { key: "action", label: "MODIFY" },
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processStatus, setProcessStatus] = useState("pending");
  const [processLoading, setProcessLoading] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await API.fetchOrderItems();
      let ordersData = [];
      try {
        ordersData = await API.fetchOrders();
      } catch {
        ordersData = [];
      }
      const ordersMap = {};
      (ordersData || []).forEach((o) => { ordersMap[o.id] = o; });
      const merged = (items || []).map((item) => ({
        ...item,
        status: ordersMap[item.order_id]?.status || "pending",
        points_earned: ordersMap[item.order_id]?.points_earned || 0,
      }));
      setOrders(merged);
    } catch (err) {
      setError("Gagal memuat orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus order ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      await API.deleteOrderItem(id);
      loadOrders();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProcess = (item) => {
    setSelectedOrder(item);
    setProcessStatus(item.status || "pending");
    setShowProcessModal(true);
  };

  const handleProcess = async () => {
    if (!selectedOrder) return;
    setProcessLoading(true);
    setError("");

    try {
      const isDiterima = processStatus === "diterima";
      const wasNotDiterima = selectedOrder.status !== "diterima";
      const points = isDiterima ? Math.floor(selectedOrder.subtotal / 10000) : 0;

      const { data: updateData, error: updateError } = await API.updateOrder(selectedOrder.order_id, {
        status: processStatus,
        points_earned: points,
      });
      console.log("Update result:", { updateData, updateError });
      if (updateError) {
        setError(`Gagal update status: ${updateError.message}`);
        return;
      }

      if (isDiterima && wasNotDiterima) {
        const profile = await API.getProfileById(selectedOrder.member_id);
        if (profile.data) {
          const currentPoints = profile.data.points || 0;
          await API.updateProfile(selectedOrder.member_id, {
            points: currentPoints + points,
          });
        }
      }

      setShowProcessModal(false);
      setSelectedOrder(null);
      loadOrders();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setProcessLoading(false);
    }
  };

  const tabs = [
    { key: "all", label: "All", count: orders.length },
    { key: "pending", label: "Pending", count: orders.filter((order) => order.status === "pending").length },
    { key: "diterima", label: "Diterima", count: orders.filter((order) => order.status === "diterima").length },
    { key: "ditolak", label: "Ditolak", count: orders.filter((order) => order.status === "ditolak").length },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (val) => {
    if (!val) return "-";
    return `Rp ${Number(val).toLocaleString("id-ID")}`;
  };

  const formatShortId = (uuid) => {
    if (!uuid) return "-";
    return uuid.slice(0, 8).toUpperCase();
  };

  const statusStyle = (status) => {
    switch (status) {
      case "diterima": return "bg-green-100 text-green-700";
      case "ditolak": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  const renderRow = (item, index, isLast) => (
    <TableRow key={item.id} isLast={isLast}>
      <TableCell style={{ color: "#fff", fontWeight: 500 }}>{formatShortId(item.order_id)}</TableCell>
      <TableCell>{item.product_name || "-"}</TableCell>
      <TableCell>{formatShortId(item.member_id)}</TableCell>
      <TableCell>{item.quantity ?? "-"}</TableCell>
      <TableCell>{formatCurrency(item.price_at_purchase)}</TableCell>
      <TableCell>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(item.status)}`}>
          {item.status || "pending"}
        </span>
      </TableCell>
      <TableCell>
        <span className={`font-bold ${item.points_earned > 0 ? "text-[#00BFA6]" : "text-gray-400"}`}>
          {item.points_earned > 0 ? `+${item.points_earned}` : "-"}
        </span>
      </TableCell>
      <TableCell>{formatCurrency(item.subtotal)}</TableCell>
      <TableCell>{formatDate(item.created_at)}</TableCell>
      <TableCell>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton icon={<EditIcon />} variant="secondary" title="Proses" onClick={() => handleOpenProcess(item)} />
          <IconButton icon={<DeleteIcon />} variant="danger" title="Delete" onClick={() => handleDelete(item.id)} />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <BackG>
      <PageHeader title="Orders Management" breadcrumb={["Orders Management"]} />

      {error && (
        <div className="mx-4 mt-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="p-4">
        {loading && orders.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-gray-400 gap-2">
            <ImSpinner2 className="animate-spin" /> Memuat data...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Belum Ada Order</EmptyTitle>
                <EmptyDescription>
                  Halaman order masih kosong.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <DataTable
            columns={COLUMNS}
            data={orders}
            tabs={tabs}
            searchable
            searchFields={["product_name"]}
            searchPlaceholder="Search orders..."
            itemsPerPage={7}
            renderRow={renderRow}
          />
        )}
      </div>

      <Footer />

      {showProcessModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowProcessModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h2 className="text-xl font-black text-[#0B1E3D] mb-1">Proses Order</h2>
              <p className="text-gray-400 text-sm mb-5">Order #{formatShortId(selectedOrder.order_id)}</p>

              <div className="bg-[#EEF2F7] rounded-xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Produk</span>
                  <span className="font-semibold text-[#0B1E3D]">{selectedOrder.product_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Member</span>
                  <span className="font-semibold text-[#0B1E3D]">{formatShortId(selectedOrder.member_id)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Jumlah</span>
                  <span className="font-semibold text-[#0B1E3D]">{selectedOrder.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Harga</span>
                  <span className="font-semibold text-[#0B1E3D]">{formatCurrency(selectedOrder.price_at_purchase)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                  <span className="text-gray-500 font-bold">Subtotal</span>
                  <span className="font-black text-[#0B1E3D]">{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
              </div>

              <label className="block text-sm font-bold text-[#0B1E3D] mb-2">Status Pemesanan</label>
              <select
                value={processStatus}
                onChange={(e) => setProcessStatus(e.target.value)}
                className="w-full border bg-white border-gray-200 text-black rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00BFA6] transition-colors mb-5"
              >
                <option value="pending">Pending</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
              </select>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowProcessModal(false)}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl text-sm font-bold transition-colors"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleProcess}
                  disabled={processLoading}
                  className="flex-1 bg-[#00BFA6] hover:bg-[#009f8a] text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                >
                  {processLoading ? "Memproses..." : "Simpan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BackG>
  );
}
