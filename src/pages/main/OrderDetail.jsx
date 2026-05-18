import { useState } from "react";

export default function OrderDetailModal({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!order) return <span className="text-gray-500">No data</span>;

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
              Detail Order #{order.order_id}
            </h2>

            <div className="border-t pt-4 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Customer:</span> {order.customer_name}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Tanggal:</span> {order.order_date}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-800 font-semibold text-lg mt-3">
                Total: Rp {order.total_price?.toLocaleString("id-ID")}
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