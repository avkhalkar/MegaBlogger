import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { parseError } from '../../utils/parseError'

function LogoutBtn({ className = "", onClick }) {
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const logoutHandler = () => {
    setError('')
    authService.deleteSessions()
      .then(() => {
        dispatch(logout())
        if (onClick) onClick()
      })
      .catch((err) => {
        console.error(err)
        setError(parseError(err))
      })
  }

  return (
    <div>
      <button
        className={`inline-block px-5 py-2 duration-200 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-full font-medium text-sm transition-all ${className}`}
        onClick={logoutHandler}
      >Logout</button>
      {error && <p className="text-red-500 text-xs mt-1 text-center">{error}</p>}
    </div>
  )
}

export default LogoutBtn