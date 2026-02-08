import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.register(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({ userData }));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[80vh]">
            <div className={`mx-auto w-full max-w-lg glass-panel bg-white/80 rounded-xl p-10 border border-gray-100 shadow-xl`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-800 mb-4">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-slate-500 mb-8">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-6'>
                        <div className="space-y-2">
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm"
                                {...register("name", {
                                    required: true,
                                    minLength: {
                                        value: 3,
                                        message: "Full Name must be at least 3 characters long",
                                    }
                                })}
                            />
                            {errors.name?.type === "required" && <p className="text-red-500 text-sm">Full Name is required</p>}
                            {errors.name?.message && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
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
                        <div className="space-y-2">
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                className="bg-white border-gray-200 text-black focus:border-blue-500 shadow-sm"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/,
                                        message: "Password must contain at least one letter, one number, and one special character",
                                    }
                                })}
                            />
                            {errors.password?.type === "required" && <p className="text-red-500 text-sm">Password is required</p>}
                            {errors.password?.message && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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

// In validate: sequential execution takes place