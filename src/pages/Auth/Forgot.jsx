import { useState } from "react"
import { MdOutlineEmail } from "react-icons/md"
import { Link } from "react-router-dom"
import { AuthInput, AuthAlert, AuthButton } from "../../components/auth"

export default function Forgot() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        setTimeout(() => {
            setSent(true)
            setLoading(false)
        }, 1000)
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-[#0B1E3D] mb-1 text-center">
                Forgot Your Password?
            </h2>

            <AuthAlert type="info">
                Enter your email and we'll send you a link to reset your password.
            </AuthAlert>

            {error && (
                <AuthAlert type="error">
                    {error}
                </AuthAlert>
            )}

            {sent && (
                <AuthAlert type="success">
                    Link reset password telah dikirim ke email Anda.
                </AuthAlert>
            )}

            {!sent && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AuthInput
                        icon={<MdOutlineEmail />}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                        disabled={loading}
                    />

                    <AuthButton loading={loading} loadingText="Mengirim...">
                        Send Reset Link
                    </AuthButton>
                </form>
            )}

            <div className="text-center mt-5 text-xs">
                <Link to="/" className="text-gray-400 hover:text-[#FF6B4A] transition-colors">
                    Kembali ke halaman Login
                </Link>
            </div>
        </div>
    )
}
