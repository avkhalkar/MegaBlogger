import { useState, forwardRef } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = forwardRef(function Header(props, ref) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (slug) => slug === '/' ? location.pathname === '/' : location.pathname.startsWith(slug)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const handleNavClick = (slug) => {
    navigate(slug)
    setMenuOpen(false)
  }

  return (
    <header ref={ref} className='py-3 sm:py-4 shadow-sm fixed top-0 left-0 right-0 z-50 glass-panel border-b border-gray-200'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/' className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
              <Logo width='45px' />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:block">
                MegaBlog
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <ul className='hidden md:flex ml-auto items-center space-x-1 lg:space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-4 py-2 duration-300 rounded-full transition-all text-sm lg:text-base font-medium ${isActive(item.slug) ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-gray-100 hover:text-blue-600 hover:scale-105'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile hamburger button */}
          <button
            className='md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors'
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 rounded mt-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 rounded mt-1 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        <div className={`md:hidden mobile-menu-enter ${menuOpen ? 'mobile-menu-open' : ''}`}>
          <ul className='flex flex-col pt-4 pb-2 space-y-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-base font-medium ${isActive(item.slug) ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-gray-100 hover:text-blue-600'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="pt-2 border-t border-gray-200 mt-2">
                <LogoutBtn className="w-full text-left" onClick={() => setMenuOpen(false)} />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  )
})

export default Header