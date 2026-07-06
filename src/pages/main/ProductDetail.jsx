import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API } from "../../service/API"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        API.getProductById(id)
            .then(({ data, error }) => {
                if (error) {
                    setError(error.message)
                    return
                }
                setProduct(data)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-gray-500 rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                />
            )}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-300 mb-1">Kategori: {product.category}</p>
            <p className="text-gray-300 mb-1">{product.description}</p>
            <p className="text-gray-100 font-semibold text-lg">
                Harga: Rp {product.price?.toLocaleString()}
            </p>
            <p className="text-gray-300 mb-1">Stok: {product.stock}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => window.history.back()}>
                Back to Products
            </button>
        </div>
    )
}