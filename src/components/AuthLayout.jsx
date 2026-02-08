import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // useEffect depends on authStatus, navigate and authentication
    // navigate rarely changes

    useEffect(() => {

        // If the user is not authenticated and the route requires authentication, redirect to login
        if (authentication && authStatus !== authentication) {
            navigate("/login")

            // If route requires authentocation and the user is logged in, redirect to home page
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}