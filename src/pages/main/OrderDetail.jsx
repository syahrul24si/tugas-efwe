import { useState } from "react";

export default function OrderDetailModal({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!order) return <span className="text-gray-500">No data</span>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (val) => {
    if (!val) return "-";
    return `Rp ${Number(val).toLocaleString("id-ID")}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-400 hover:text-blue-300 underline text-sm"
      >
        View Details
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Detail Order #{order.order_id || order.id}
            </h2>

            <div className="border-t pt-4 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Produk:</span> {order.product_name || "-"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Member:</span> {order.member_id || "-"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Tanggal:</span> {formatDate(order.created_at)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Jumlah:</span> {order.quantity ?? "-"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Harga:</span> {formatCurrency(order.price_at_purchase)}
              </p>
              <p className="text-gray-800 font-semibold text-lg mt-3">
                Subtotal: {formatCurrency(order.subtotal)}
              </p>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-6 w-full"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
