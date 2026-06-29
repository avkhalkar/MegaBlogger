import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useToast } from '../utils/ToastContext'

function CheckEmail() {
    const navigate = useNavigate()
    const { addToast } = useToast()
    const [resending, setResending] = useState(false)

    const handleResend = async () => {
        setResending(true)
        try {
            await authService.sendVerification()
            addToast({ message: 'Verification email resent!', type: 'success' })
        } catch {
            addToast({ message: 'Failed to resend. Please try again.', type: 'error' })
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] sm:min-h-[80vh] px-4">
            <div className="mx-auto w-full max-w-lg glass-panel bg-white/80 rounded-xl p-5 sm:p-10 border border-gray-100 shadow-xl text-center">
                <div className="text-6xl mb-4">📬</div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Check your email</h2>
                <p className="text-slate-500 text-sm sm:text-base mb-6">
                    We sent a verification link to your email address. Click it to activate your account.
                </p>
                <button
                    onClick={handleResend}
                    disabled={resending}
                    className="w-full mb-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-60 transition-all"
                >
                    {resending ? 'Resending...' : 'Resend email'}
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                    Skip for now →
                </button>
            </div>
        </div>
    )
}

export default CheckEmail
