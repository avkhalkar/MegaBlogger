import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center">
                <div className="loader mb-4"></div>
                <p className="text-slate-500 animate-pulse">Loading...</p>
            </div>
        </div>
    ) : <>{children}</>
}