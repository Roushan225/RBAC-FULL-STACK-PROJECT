import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../../utilities'
import { ToastContainer } from 'react-toastify'
import SideNav from '../shared/SideNav'

function UserAssignments() {
  const [user, setUser] = useState(null)
  const [viewpdf, setViewpdf] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/auth/me', { withCredentials: true })
        setUser(response.data.user)
      } catch (error) {
        navigate('/login')
      }
    }

    const fetchpdf = async () => {
      try {
        const response = await axios.get('/upload/pdf/getallpdf')
        setViewpdf(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
    fetchpdf()
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

  const professorAssignments = viewpdf.filter((pdf) => pdf.role === 'Professor')
  const mySubmissions = viewpdf.filter((pdf) => pdf.uploadedby === user?.name)

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
        <div className='rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-6 text-white shadow-xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-indigo-200'>Assignments</p>
          <h1 className='mt-2 text-3xl font-semibold'>Your assignment workspace</h1>
          <p className='mt-2 text-sm text-slate-300'>Review professor assignments and track your own submissions in one place.</p>
        </div>

        <div className='grid gap-6 xl:grid-cols-2'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5 flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Professor assignments</h2>
                <p className='text-sm text-slate-500'>Available tasks shared by your instructors.</p>
              </div>
              <div className='rounded-full bg-amber-50 p-3 text-amber-600'>
                <i className='fa-solid fa-book-open'></i>
              </div>
            </div>

            <div className='space-y-3'>
              {professorAssignments.length === 0 ? (
                <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500'>No professor assignments yet.</div>
              ) : (
                professorAssignments.map((pdf) => (
                  <div key={pdf._id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <h3 className='font-semibold text-slate-800'>{pdf.pdfname}</h3>
                        <p className='mt-1 text-sm text-slate-500'>Uploaded by {pdf.uploadedby}</p>
                      </div>
                      <a
                        href={`http://localhost:3001/${pdf.filepath}`}
                        target='_blank'
                        rel='noreferrer'
                        className='rounded-full bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-600 hover:text-white'
                      >
                        <i className='fa-solid fa-arrow-up-right-from-square mr-2'></i>
                        View
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5 flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Your submissions</h2>
                <p className='text-sm text-slate-500'>Files you have uploaded for review.</p>
              </div>
              <div className='rounded-full bg-emerald-50 p-3 text-emerald-600'>
                <i className='fa-solid fa-paper-plane'></i>
              </div>
            </div>

            <div className='space-y-3'>
              {mySubmissions.length === 0 ? (
                <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500'>You have not uploaded any assignment yet.</div>
              ) : (
                mySubmissions.map((pdf) => (
                  <div key={pdf._id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <h3 className='font-semibold text-slate-800'>{pdf.pdfname}</h3>
                        <p className='mt-1 text-sm text-slate-500'>Submitted successfully</p>
                      </div>
                      <a
                        href={`http://localhost:3001/${pdf.filepath}`}
                        target='_blank'
                        rel='noreferrer'
                        className='rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-600 hover:text-white'
                      >
                        <i className='fa-solid fa-arrow-up-right-from-square mr-2'></i>
                        View
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SideNav>
  )
}

export default UserAssignments
