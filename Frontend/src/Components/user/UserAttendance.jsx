import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../../utilities'
import { ToastContainer } from 'react-toastify'
import SideNav from '../shared/SideNav'

function UserAttendance() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('/auth/me', { withCredentials: true })
        setUser(response.data.user)
      } catch (error) {
        navigate('/login')
      }
    }

    checkUser()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true })
      handleSuccess('Logout Successful')
      setTimeout(() => navigate('/login'), 1000)
    } catch (error) {
      handleError('Logout failed')
    }
  }

  const present = user?.present || 0
  const totalClasses = user?.totalclasses || 0
  const absent = totalClasses - present
  const percentage = totalClasses ? ((present / totalClasses) * 100).toFixed(1) : '0.0'

  return (
    <SideNav
      title="Student Panel"
      userName={user?.name || 'Student'}
      onLogout={handleLogout}
      links={[
        { label: 'Overview', path: '/userdashboard', icon: 'fa-solid fa-home' },
        { label: 'Assignments', path: '/userassignments', icon: 'fa-solid fa-file-lines' },
        { label: 'Attendance', path: '/userattendance', icon: 'fa-solid fa-chart-line' },
        { label: 'Calendar', path: '/calendar', icon: 'fa-solid fa-calendar-alt' }
      ]}
    >
      <div className='space-y-6'>
        <div className='rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 p-6 text-white shadow-xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-blue-200'>Attendance</p>
          <h1 className='mt-2 text-3xl font-semibold'>Your class attendance summary</h1>
          <p className='mt-2 text-sm text-slate-300'>Stay updated on your present and absent sessions.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5'>
              <h2 className='text-xl font-semibold text-slate-800'>Attendance overview</h2>
              <p className='text-sm text-slate-500'>Current performance across all attended classes.</p>
            </div>

            <div className='space-y-4'>
              <div className='rounded-2xl bg-emerald-50 p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-emerald-700'>Present</span>
                  <span className='text-xl font-semibold text-emerald-700'>{present}</span>
                </div>
              </div>
              <div className='rounded-2xl bg-rose-50 p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-rose-700'>Absent</span>
                  <span className='text-xl font-semibold text-rose-700'>{absent}</span>
                </div>
              </div>
              <div className='rounded-2xl bg-slate-50 p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-slate-700'>Total classes</span>
                  <span className='text-xl font-semibold text-slate-800'>{totalClasses}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5'>
              <h2 className='text-xl font-semibold text-slate-800'>Attendance percentage</h2>
              <p className='text-sm text-slate-500'>A simple view of your current attendance ratio.</p>
            </div>

            <div className='rounded-3xl bg-slate-50 p-6'>
              <div className='text-center'>
                <p className='text-sm text-slate-500'>Current score</p>
                <h3 className='mt-2 text-5xl font-semibold text-blue-600'>{percentage}%</h3>
              </div>
              <div className='mt-6 h-3 overflow-hidden rounded-full bg-slate-200'>
                <div className='h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500' style={{ width: `${Math.min(100, Number(percentage))}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SideNav>
  )
}

export default UserAttendance
