import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo, Error } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { parseError } from '../utils/parseError'

const passwordRules = [
    { id: 'length',    label: 'At least 8 characters',                test: (v) => v.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter (A-Z)',            test: (v) => /[A-Z]/.test(v) },
    { id: 'lowercase', label: 'One lowercase letter (a-z)',            test: (v) => /[a-z]/.test(v) },
    { id: 'number',    label: 'One number (0-9)',                      test: (v) => /\d/.test(v) },
    { id: 'special',   label: 'One special character (!@#$%^&* etc.)', test: (v) => /[\W_]/.test(v) },
]

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
)

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
)

function PasswordToggle({ show, onToggle }) {
    return (
        <div className="absolute right-3 top-[38px] group flex flex-col items-center">
            <button
                type="button"
                onClick={onToggle}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={show ? "Hide password" : "Show password"}
            >
                {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            <span className="hidden group-hover:block absolute top-8 right-0 text-xs font-medium text-slate-600 bg-white border border-gray-200 rounded-md px-2 py-1 shadow-md whitespace-nowrap">
                {show ? "Hide password" : "Show password"}
            </span>
        </div>
    )
}

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const passwordValue = watch('password', '')
    const unmetRules = passwordRules.filter(rule => !rule.test(passwordValue))

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.register(data)
            if (session) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login({ userData: currentUser }))
                await authService.sendVerification()
                navigate('/check-email')
            }
        } catch (error) {
            setError(parseError(error))
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
                <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-slate-800 mb-3 sm:mb-4">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">
                        Sign In
                    </Link>
                </p>

                {error && <Error message={error} onRetry={() => setError("")} />}

                <div className="mt-2 space-y-3">
                    <button
                        type="button"
                        onClick={() => authService.loginWithGoogle()}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        onClick={() => authService.loginWithGitHub()}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                        Continue with GitHub
                    </button>
                </div>

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-slate-400 font-medium">or sign up with email</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-6">

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm"
                                {...register("name", {
                                    required: true,
                                    minLength: { value: 3, message: "Full Name must be at least 3 characters long" }
                                })}
                            />
                            {errors.name?.type === "required" && <p className="text-red-500 text-sm">Full Name is required</p>}
                            {errors.name?.message && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address",
                                    }
                                })}
                            />
                            {errors.email?.type === "required" && <p className="text-red-500 text-sm">Email is required</p>}
                            {errors.email?.type === "pattern" && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    label="Password: "
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm pr-12"
                                    {...register("password", {
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
                                            <span>✗</span>
                                            <span>{rule.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {passwordValue.length > 0 && unmetRules.length === 0 && (
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <span>✓</span> Password looks good
                                </p>
                            )}

                            {errors.password?.type === "required" && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
