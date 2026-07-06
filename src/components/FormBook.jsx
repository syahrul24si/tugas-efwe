import { useState } from "react"
import { API } from "../service/API"

export default function FormBook({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen) return null

  const price = product?.price || 0
  const subtotal = price * quantity

  const handleBook = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const userData = localStorage.getItem("user")
      if (!userData) {
        setError("Silakan login terlebih dahulu untuk melakukan booking.")
        setLoading(false)
        return
      }
      const parsed = JSON.parse(userData)

      const { data: orderData, error: orderError } = await API.createOrder({
        member_id: parsed.id,
        total_original: subtotal,
        total_final: subtotal,
        status: "pending",
      })
      if (orderError) {
        setError(`Gagal membuat order: ${orderError.message}`)
        return
      }

      const { error: itemError } = await API.createOrderItem({
        order_id: orderData[0].id,
        product_id: product.id,
        member_id: parsed.id,
        product_name: product.name,
        quantity: quantity,
        price_at_purchase: price,
        subtotal: subtotal,
      })
      if (itemError) {
        setError(`Gagal menyimpan item: ${itemError.message}`)
        return
      }

      setSuccess("Booking berhasil!")
      setTimeout(() => {
        onClose()
        setQuantity(1)
        setSuccess("")
      }, 1500)
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#F5E6C8] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { onClose(); setQuantity(1); setError(""); setSuccess(""); }}
          className="absolute right-5 top-5 w-10 h-10 rounded-full bg-white hover:bg-gray-100 z-10"
        >
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-black text-center text-[#0B1E3D] mb-2">
            Booking
          </h2>

          {product && (
            <div className="bg-white rounded-2xl p-5 mb-6">
              <h3 className="font-black text-[#0B1E3D] text-lg mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{product.description || "Tidak ada deskripsi"}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#00BFA6] font-black text-xl">Rp {Number(price).toLocaleString("id-ID")}</span>
                {product.seat && <span className="text-gray-400 text-xs">{product.seat} Kursi</span>}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">
              {success}
            </div>
          )}

          <label className="block mb-2 text-sm font-bold text-[#0B1E3D]">
            Jumlah
          </label>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 font-bold text-lg hover:bg-gray-50"
            >
          
            </button>
            <span className="text-xl font-black text-[#0B1E3D] w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 font-bold text-lg hover:bg-gray-50"
            >
              +
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between">
            <span className="text-gray-500 text-sm font-semibold">Subtotal</span>
            <span className="text-[#0B1E3D] font-black text-lg">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>

          <button
            onClick={handleBook}
            disabled={loading}
            className="w-full bg-[#FF6B4A] hover:bg-[#e85c3c] text-white rounded-2xl py-4 font-bold disabled:opacity-50 transition-all"
          >
            {loading ? "Memproses..." : "Konfirmasi Booking"}
          </button>
        </div>
      </div>
    </div>
  )
}
