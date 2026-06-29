import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(64)
  const headerRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!headerRef.current) return
    const observer = new ResizeObserver(() => {
      setHeaderHeight(headerRef.current.offsetHeight)
    })
    observer.observe(headerRef.current)
    setHeaderHeight(headerRef.current.offsetHeight)
    return () => observer.disconnect()
  }, [loading])

  return !loading ? (
    <div className='min-h-screen flex flex-col'>
      <Header ref={headerRef} />
      <main className='flex-grow' style={{ paddingTop: headerHeight }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
