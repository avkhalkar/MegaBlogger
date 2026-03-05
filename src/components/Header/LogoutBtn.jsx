import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn({ className = "", onClick }) {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.deleteSessions().then(() => {
      dispatch(logout())
    })
    if (onClick) onClick()
  }
  return (
    <button
      className={`inline-block px-5 py-2 duration-200 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-full font-medium text-sm transition-all ${className}`}
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn