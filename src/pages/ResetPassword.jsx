import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import { parseError } from '../utils/parseError'
import { useToast } from '../utils/ToastContext'

const passwordRules = [
    { id: 'length',    label: 'At least 8 characters',                test: (v) => v.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter (A-Z)',            test: (v) => /[A-Z]/.test(v) },
    { id: 'lowercase', label: 'One lowercase letter (a-z)',            test: (v) => /[a-z]/.test(v) },
    { id: 'number',    label: 'One number (0-9)',                      test: (v) => /\d/.test(v) },
    { id: 'special',   label: 'One special character (!@#$%^&* etc.)', test: (v) => /[\W_]/.test(v) },
]

function EyeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    )
}

function EyeOffIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    )
}

function PasswordToggle({ show, onToggle }) {
    return (
        <div className="absolute right-3 top-[38px] group flex flex-col items-center">
            <button type="button" onClick={onToggle} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label={show ? 'Hide password' : 'Show password'}>
                {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            <span className="hidden group-hover:block absolute top-8 right-0 text-xs font-medium text-slate-600 bg-white border border-gray-200 rounded-md px-2 py-1 shadow-md whitespace-nowrap">
                {show ? 'Hide password' : 'Show password'}
            </span>
        </div>
    )
}

function ResetPassword() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { addToast } = useToast()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const passwordValue = watch('password', '')
    const unmetRules = passwordRules.filter(rule => !rule.test(passwordValue))

    const onSubmit = async (data) => {
        setError('')
        setLoading(true)
        const userId = searchParams.get('userId')
        const secret = searchParams.get('secret')

        if (!userId || !secret) {
            setError('Invalid or expired reset link. Please request a new one.')
            setLoading(false)
            return
        }

        try {
            await authService.confirmPasswordRecovery(userId, secret, data.password)
            const session = await authService.createSession({ email: data.email, password: data.password })
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({ userData }))
            }
            addToast({ message: 'Password reset successfully! Welcome back.', type: 'success', duration: 4000 })
            navigate('/')
        } catch (err) {
            setError(parseError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] sm:min-h-[80vh] px-4">
            <div className="mx-auto w-full max-w-lg glass-panel bg-white rounded-xl p-5 sm:p-10 border border-gray-100 shadow-xl">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-slate-800 mb-2">
                    Set new password
                </h2>
                <p className="text-center text-sm text-slate-500 mb-6">
                    Choose a strong password for your account.
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
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                label="New Password: "
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm pr-12"
                                {...register('password', {
                                    required: true,
                                    validate: () => unmetRules.length === 0 || 'Please meet all password requirements'
                                })}
                            />
                            <PasswordToggle show={showPassword} onToggle={() => setShowPassword(p => !p)} />
                        </div>

                        {passwordValue.length > 0 && unmetRules.length > 0 && (
                            <ul className="mt-2 space-y-1">
                                {unmetRules.map(rule => (
                                    <li key={rule.id} className="flex items-center gap-2 text-xs text-red-500">
                                        <span>✗</span><span>{rule.label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {passwordValue.length > 0 && unmetRules.length === 0 && (
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <span>✓</span> Password looks good
                            </p>
                        )}
                        {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Password is required</p>}
                        {errors.password?.message && unmetRules.length > 0 && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
