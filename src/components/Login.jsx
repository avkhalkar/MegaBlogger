import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.createSession(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-[80vh]'>
            <div className={`mx-auto w-full max-w-lg glass-panel bg-white/80 rounded-xl p-10 border border-gray-100 shadow-xl`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-800 mb-4">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-slate-500 mb-8">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-6'>
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
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login