import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../../utilities'
import { ToastContainer } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import SideNav from '../shared/SideNav'


function ProfessorDashboard() {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [professor, setProfessor] = useState(null)
  const [branch,setBranch]=useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [profilepic,setprofilepic]=useState([])


 
  

  const filteredStudent=
    users.filter((user)=>{
      if(user.role !=="Student")return false;

      const matchesBranch = branch === "All" ? true : user.branch === branch
      const normalizedSearch = searchTerm.trim().toLowerCase()
      const matchesSearch = normalizedSearch === ""
        ? true
        : [user.name, user.email, user.branch].some((value) =>
            value?.toLowerCase().includes(normalizedSearch)
          )

      return matchesBranch && matchesSearch
    })
    
    


  

  useEffect(() => {
    const fetchusers = async (e) => {


      try {
        const response = await axios.get("/admin/user")

        setUsers(response.data)


      } catch (error) {
        console.log(error);
      }
    }
    fetchusers()

    

    const fetchprofilepic =async ()=>{
            try {
                const response= await axios.get("/upload/getallpic");

                setprofilepic(response.data)
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
                
            }
            
            
        }
        fetchprofilepic()

        const interval = setInterval(() => {
      fetchusers();
      
    }, 3000);
    return () => clearInterval(interval)

  }, [])


  const handleLogout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true })
    handleSuccess("Logout Successful")
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  const deleteUser = async (id) => {

    try {
      const response = await axios.delete(`/admin/deleteuser/${id}`)

      handleSuccess(response.data.message);

      setUsers(prev => prev.filter(user =>
        user._id !== id
      ))

    } catch (error) {
      console.log(error);

    }
  }

  const present = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`/professor/present/${id}`)
      const result = response.data
      console.log(result);
      console.log(result.message);
      return handleSuccess(result.message)



    } catch (error) {
      handleError(error.response?.data?.message)

    }
  }
  const absent = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`/professor/absent/${id}`)
      const result = response.data
      console.log(result);
      console.log(result.message);
      return handleSuccess(result.message)



    } catch (error) {
      handleError(error.response?.data?.message)

    }
  }




  return (
    <SideNav
      title="Professor Panel"
      userName={professor?.name || 'Professor'}
      onLogout={handleLogout}
      links={[
        { label: 'Students', path: '/professordashboard', icon: 'fa-solid fa-users' },
        { label: 'Assignments', path: '/Professorpdf', icon: 'fa-solid fa-file' },
        { label: 'Calendar', path: '/calendar', icon: 'fa-solid fa-calendar-alt' }
      ]}
    >
      <div className='space-y-6'>
        <div className='rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-xl'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <p className='text-sm uppercase tracking-[0.3em] text-blue-200'>Students</p>
              <h1 className='mt-2 text-3xl font-semibold'>Student attendance dashboard</h1>
              <p className='mt-2 text-sm text-slate-300'>Review students by branch and update attendance in a few clicks.</p>
            </div>
            <div className='flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur sm:flex-row sm:items-end'>
              <div>
                <label className='mb-2 block text-sm text-slate-300'>Search</label>
                <div className='flex h-11 items-center rounded-xl border border-white/20 bg-slate-950/40 px-3 min-w-[220px]'>
                  <i className='fa-solid fa-magnifying-glass text-slate-400'></i>
                  <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Name or email'
                    className='ml-2 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400'
                  />
                </div>
              </div>
              <div>
                <label className='mb-2 block text-sm text-slate-300'>Filter by branch</label>
                <select
                  onChange={(e) => setBranch(e.target.value)}
                  className='h-11 w-full min-w-[220px] rounded-xl border border-white/20 bg-slate-950/40 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-blue-400'
                  value={branch}
                >
                  <option value="All" className='text-slate-800'>All branches</option>
                  <option value="CSE" className='text-slate-800'>CSE</option>
                  <option value="ECE" className='text-slate-800'>ECE</option>
                  <option value="ELECTRICAL" className='text-slate-800'>ELECTRICAL</option>
                  <option value="MECH" className='text-slate-800'>MECH</option>
                  <option value="MME" className='text-slate-800'>MME</option>
                  <option value="CIVIL" className='text-slate-800'>CIVIL</option>
                  <option value="PIE" className='text-slate-800'>PIE</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
            <p className='text-sm text-slate-500'>Total students</p>
            <h2 className='mt-2 text-2xl font-semibold text-slate-800'>{users.filter(user => user.role === 'Student').length}</h2>
          </div>
          <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
            <p className='text-sm text-slate-500'>Visible now</p>
            <h2 className='mt-2 text-2xl font-semibold text-slate-800'>{filteredStudent.length}</h2>
          </div>
          <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
            <p className='text-sm text-slate-500'>Current branch</p>
            <h2 className='mt-2 text-2xl font-semibold text-slate-800'>{branch === 'All' ? 'All' : branch}</h2>
          </div>
        </div>

        {filteredStudent.length === 0 ? (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm'>
            <h3 className='text-xl font-semibold text-slate-700'>No students found</h3>
            <p className='mt-2 text-sm text-slate-500'>Try searching by name or email, or switch the branch filter to see more records.</p>
          </div>
        ) : (
          <div className='grid gap-5 xl:grid-cols-2'>
            {filteredStudent.map((user) => {
              const avatar = profilepic.find((pic) => pic.uploadedby === user.name)
              const attendance = user.totalclasses ? ((user.present / user.totalclasses) * 100).toFixed(1) : '0.0'

              return (
                <div key={user._id} className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg'>
                  <div className='flex flex-col gap-4 sm:flex-row'>
                    <div className='flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-100'>
                      {avatar ? (
                        <img src={avatar.filepath} alt={user.name} className='h-full w-full object-cover' />
                      ) : (
                        <i className='fa-solid fa-user text-2xl text-slate-400'></i>
                      )}
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <h3 className='text-xl font-semibold text-slate-800'>{user.name}</h3>
                          <p className='text-sm text-slate-500'>{user.branch}</p>
                        </div>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className='rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500'
                          title='Remove student'
                        >
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>

                      <p className='mt-2 text-sm text-slate-600'>{user.email}</p>

                      <div className='mt-4 flex flex-wrap gap-2'>
                        <span className='rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700'>Present {user.present}</span>
                        <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700'>Attendance {attendance}%</span>
                      </div>
                    </div>
                  </div>

                  <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
                    <div className='rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600'>
                      Total classes: {user.totalclasses || 0}
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      <button
                        onClick={() => present(user._id)}
                        className='rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-600 hover:text-white'
                      >
                        <i className='fa-solid fa-check mr-2'></i>
                        Present
                      </button>
                      <button
                        onClick={() => absent(user._id)}
                        className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-600 hover:text-white'
                      >
                        <i className='fa-solid fa-xmark mr-2'></i>
                        Absent
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <ToastContainer />
    </SideNav>
  )
}

export default ProfessorDashboard