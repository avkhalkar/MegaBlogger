import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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


  return (
    <header className='py-4 shadow-sm sticky top-0 z-50 glass-panel border-b border-gray-200'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/' className="flex items-center gap-2 group">
              <Logo width='45px' />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:block">
                MegaBlog
              </span>
            </Link>
          </div>
          <ul className='flex ml-auto items-center space-x-1 sm:space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-4 py-2 duration-300 rounded-full text-slate-700 hover:bg-gray-100 hover:text-blue-600 hover:scale-105 transition-all text-sm sm:text-base font-medium'
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
        </nav>
      </Container>
    </header>
  )
}

export default Header