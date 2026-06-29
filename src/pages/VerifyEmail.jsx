import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useToast } from '../utils/ToastContext'

function VerifyEmail() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { addToast } = useToast()
    const [status, setStatus] = useState('verifying')

    useEffect(() => {
        const userId = searchParams.get('userId')
        const secret = searchParams.get('secret')

        if (!userId || !secret) {
            setStatus('error')
            return
        }

        authService.confirmVerification(userId, secret)
            .then(() => authService.getCurrentUser())
            .then((userData) => {
                if (userData) dispatch(login({ userData }))
                setStatus('success')
                addToast({ message: 'Email verified successfully!', type: 'success', duration: 4000 })
                setTimeout(() => navigate('/'), 1500)
            })
            .catch(() => {
                setStatus('error')
            })
    }, [])

    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] px-4">
            <div className="mx-auto w-full max-w-md glass-panel bg-white rounded-xl p-8 border border-gray-100 shadow-xl text-center">
                {status === 'verifying' && (
                    <>
                        <div className="loader mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-slate-800">Verifying your email...</h2>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Email verified!</h2>
                        <p className="text-slate-500 text-sm">Redirecting you to home...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Verification failed</h2>
                        <p className="text-slate-500 text-sm mb-6">
                            The link may have expired or already been used.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="text-blue-600 hover:underline text-sm font-medium"
                        >
                            Go to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
