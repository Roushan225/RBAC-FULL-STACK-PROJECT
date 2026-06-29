import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function SideNav({ title = 'Navigation', links = [], userName, onLogout, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = links.length > 0 ? links : [
    { label: 'Login', path: '/login', icon: 'fa-solid fa-right-to-bracket' },
    { label: 'Register', path: '/register', icon: 'fa-solid fa-graduation-cap' }
  ]

  return (
    <div className='min-h-screen bg-slate-100'>
      <aside className='fixed left-0 top-0 h-full w-72 bg-slate-900 text-white shadow-2xl'>
        <div className='p-6 border-b border-slate-700'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {userName ? (
            <p className='text-sm text-slate-400 mt-2'>{userName}</p>
          ) : (
            <p className='text-sm text-slate-400 mt-2'>Role based panel</p>
          )}
        </div>

        <div className='p-4 space-y-2'>
          {navItems.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${location.pathname === link.path ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </button>
          ))}

          {onLogout && (
            <button
              onClick={onLogout}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:bg-red-600 hover:text-white transition mt-4'
            >
              <i className='fa-solid fa-arrow-right-from-bracket'></i>
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      <div className='ml-72 min-h-screen p-6'>
        {children}
      </div>
      <ToastContainer />
    </div>
  )
}

export default SideNav