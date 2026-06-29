import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import { parseError } from '../utils/parseError'
import { useToast } from '../utils/ToastContext'

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { addToast } = useToast()

    const onSubmit = async (data) => {
        setError('')
        setLoading(true)
        try {
            await authService.sendPasswordRecovery(data.email)
            setSubmitted(true)
        } catch (err) {
            setError(parseError(err))
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="flex items-center justify-center w-full min-h-[70vh] sm:min-h-[80vh] px-4">
                <div className="mx-auto w-full max-w-lg glass-panel bg-white/80 rounded-xl p-5 sm:p-10 border border-gray-100 shadow-xl text-center">
                    <div className="text-6xl mb-4">📩</div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Check your email</h2>
                    <p className="text-slate-500 text-sm sm:text-base mb-6">
                        We sent a password reset link to your email. Click it to set a new password.
                    </p>
                    <Link to="/login" className="text-sm text-blue-600 hover:underline font-medium">
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] sm:min-h-[80vh] px-4">
            <div className="mx-auto w-full max-w-lg glass-panel bg-white/80 rounded-xl p-5 sm:p-10 border border-gray-100 shadow-xl">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-slate-800 mb-2">
                    Forgot your password?
                </h2>
                <p className="text-center text-sm text-slate-500 mb-6">
                    Enter your email and we'll send you a reset link.
                </p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Enter a valid email address',
                                }
                            })}
                        />
                        {errors.email?.type === 'required' && <p className="text-red-500 text-sm">Email is required</p>}
                        {errors.email?.type === 'pattern' && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                    <p className="text-center text-sm text-slate-500">
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Back to Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
